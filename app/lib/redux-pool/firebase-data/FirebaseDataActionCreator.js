/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import _ from 'lodash';
import ActionHandler, {TActionHandlerParams} from '../../helpers/ActionHandler';
import CacheActionCreator from '../cache/CacheActionCreator';
import CacheDefUserProfile, {
	CACHE_ID_USER_PROFILE,
	CacheDefUserProfileActionCreator
} from '../cache/def/CacheDefUserProfile';
import DaoAction from '../../daos/DaoAction';
import DaoUser from '../../daos/DaoUser';
import PoolActionCreator from '../PoolActionCreator';
import {
	POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH,
	POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA,
	POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS
} from './FirebaseDataPool';
import {POOL_TYPE_FIREBASE_DATA} from '../../../redux/ReduxPool';
import type {TDispatch} from '../../types/Types';
import type {TUser} from '../../daos/DaoUser';

// todo after a while the loader starts again?
export default class FirebaseDataActionCreator extends PoolActionCreator {

	static handleClickAction(actionHandlerParams: TActionHandlerParams, poolDefId: string): Promise {
		const {action, thunk, neverConsume} = actionHandlerParams;

		return ActionHandler.handleAction(actionHandlerParams)
			.then(res => {

				// The item has been interacted
				if (!neverConsume && DaoAction.gConsumeOnView(action)) {
					// Delete this item using the FirebaseDataActionCreator
					new FirebaseDataActionCreator(poolDefId, thunk.dispatch)
						.deleteItem(DaoAction.gId(action));
				}

				return res;
			});
	}



	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_FIREBASE_DATA, poolDefId, dispatch);
		this._saveReceivedData = this._saveReceivedData.bind(this);
		this._getUserObjectIds = this._getUserObjectIds.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.initialize = this.initialize.bind(this);
		this.userProfileActionCreator = new CacheActionCreator(CACHE_ID_USER_PROFILE, dispatch); // todo ?? PoolHelper
	}


	_saveReceivedData(receivedObjIdArr) {
		const {poolId, dispatch, dispatchAction} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			// Get the current state
			const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

			// Merge with state and make sure the array doesn't have duplicate objects
			let stateObjIdsArr = reduxFirebasePool.data.map(pool.keyExtractor);
			stateObjIdsArr = _.difference(receivedObjIdArr, stateObjIdsArr);
			stateObjIdsArr = _.chunk(stateObjIdsArr, 7);

			const _getObjectByFirebaseId = (firebaseObjId) => {
				return pool.getObjectByFirebaseId(firebaseObjId).once('value').then(f => f.val());
			};


			stateObjIdsArr.forEach(chunkOfObjects => {

				Promise.all(chunkOfObjects.map(_getObjectByFirebaseId)).then(objArr => {
					// Get the current state
					const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

					// Apply post receive specific pool functions to each item
					const mappedData = objArr.map(pool.mapFirebaseItemToLocalItem);

					dispatchAction({
						type: POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA,
						data: mappedData.reverse().concat(reduxFirebasePool.data)
					});

					// Run all post receive specific pool side-effect functions to each item
					objArr.forEach(pool.onReceiveLocalItem);
				});
			});

		});
	}



	_getUserObjectIds(userId: number) {
		const {poolId, dispatch, dispatchAction} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {

			// Notify of start fetch
			dispatchAction({type: POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH});

			// Get the current state
			const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

			pool.getUserObjectIds(userId).limitToLast(reduxFirebasePool.itemsToLoad).once('value')
				.then(snapshot => {

					if (!snapshot.exists()) {
						// There are no items in this firebase list, initialization is complete
						dispatchAction({type: POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS});
						return;
					}

					const firebaseId = snapshot.val();
					if (firebaseId == null) {
						// There are no items in this firebase list, initialization is complete
						dispatchAction({type: POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS});
						return;
					}

					// Get the current state
					const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

					const receivedIds = Object.values(firebaseId);
					const stateReceivedObjs = reduxFirebasePool.data;

					if (receivedIds.length === stateReceivedObjs.length) {
						// All items have been fetched
						// the initialization is complete
						dispatchAction({type: POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS});
						return;
					}


					// New items have come in, reverse and save the list
					this._saveReceivedData(receivedIds);
				});

		});
	}



	deleteItem(firebaseItemId: string) {
		const {dispatch, dispatchAction} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			const {data} = this.getPoolState(getState);

			_.remove(data, item => DaoAction.gId(item) == firebaseItemId);

			// Delete the item from the data list
			dispatchAction({
				type: POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA,
				data
			});

			// Get and delete the item from the firebase database
			const {executeIfDataNotNull} = this.userProfileActionCreator;
			executeIfDataNotNull((user: TUser) => {
				pool.removeObjectByFirebaseId(DaoUser.gId(user), firebaseItemId);
			});
		});
	}



	loadMore(userId: number) {
		const {poolId, dispatch} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {

			// Get state and check if fetchedAllItems is true
			const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];
			if (reduxFirebasePool.fetchedAllItems)
				return;

			// Initialization, run the bulk request
			this._getUserObjectIds(userId);
		});
	}



	initialize(userId: number) {
		const {poolId, dispatch} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {

			pool.getUserObjectIds(userId).on('child_added', (snapshot) => {
				// Get the current state
				const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

				if (reduxFirebasePool.runningBulkFetch) {
					// This value will come back in the .once('value')
					// ignoring...
					return;
				}

				// The initial data has already been loaded, this is new data
				if (snapshot.key == null)
					return;

				this._saveReceivedData([snapshot.key]);
			});

			// Initialization, run the bulk request
			this._getUserObjectIds(userId);
		});
	}


}