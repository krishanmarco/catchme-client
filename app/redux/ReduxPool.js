/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/

import _ from 'lodash';
import Logger from "../lib/Logger";
import {connect} from 'react-redux';
import {Const} from "../Config";
import {mergeWithoutExtend} from '../lib/HelperFunctions';

import ApiFormDefLocationProfile from '../lib/redux-pool/api-form/ApiFormDefLocationProfile';
import ApiFormDefUserLocationStatus from '../lib/redux-pool/api-form/ApiFormDefUserLocationStatus';
import ApiFormDefUserProfile from '../lib/redux-pool/api-form/ApiFormDefUserProfile';
import ApiFormDefChangePassword from '../lib/redux-pool/api-form/ApiFormDefChangePassword';
import ApiFormDefRegister from '../lib/redux-pool/api-form/ApiFormDefRegister';
import ApiFormDefLogin from '../lib/redux-pool/api-form/ApiFormDefLogin';
import ApiFormDef from "../lib/redux-pool/api-form/ApiFormDef";
import CacheMapDefLocationProfiles from "../lib/redux-pool/cache-map/CacheMapDefLocationProfiles";
import CacheMapDefUserProfiles from "../lib/redux-pool/cache-map/CacheMapDefUserProfiles";
import FirebaseDataDefFeed from "../lib/redux-pool/firebase-data/FirebaseDataDefFeed";
import FirebaseDataDefFeaturedAds from "../lib/redux-pool/firebase-data/FirebaseDataDefFeaturedAds";
import {screenDisablePointerEvents, screenEnablePointerEvents} from "../comp/misc/Screen";
import {CacheState} from "../lib/redux-pool/cache/CacheModel";
import CachePool from "../lib/redux-pool/cache/CachePool";

// Top Level Ids ******************************************************************************************************
// Top Level Ids ******************************************************************************************************

// ReduxPool Top Level Type Ids
export const POOL_TYPE_CACHE = 'POOL_TYPE_CACHE';
export const POOL_TYPE_CACHE_MAP = 'POOL_TYPE_CACHE_MAP';
export const POOL_TYPE_API_FORMS = 'POOL_TYPE_API_FORMS';
export const POOL_TYPE_LOCAL_FORMS = 'POOL_TYPE_LOCAL_FORMS';
export const POOL_TYPE_FIREBASE_DATA = 'POOL_TYPE_LOCAL_FORMS';


export const POOL_ACTION_CACHE_MAP_INIT_DATA = 'POOL_ACTION_CACHE_MAP_INIT_DATA';
export const POOL_ACTION_CACHE_MAP_SET_DATA = 'POOL_ACTION_CACHE_MAP_SET_DATA';
export const POOL_ACTION_CACHE_MAP_INVALIDATE_DATA = 'POOL_ACTION_CACHE_MAP_INVALIDATE_DATA';
export const POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA = 'POOL_ACTION_CACHE_MAP_INVALIDATE_DATA';


export const POOL_ACTION_API_FORMS_ON_CHANGE = 'POOL_ACTION_API_FORMS_ON_CHANGE';
export const POOL_ACTION_API_FORMS_ON_RESET = 'POOL_ACTION_API_FORMS_ON_RESET';
export const POOL_ACTION_API_FORMS_ON_POST = 'POOL_ACTION_API_FORMS_ON_POST';
export const POOL_ACTION_API_FORMS_ON_SUCCESS = 'POOL_ACTION_API_FORMS_ON_SUCCESS';
export const POOL_ACTION_API_FORMS_ON_FINISH = 'POOL_ACTION_API_FORMS_ON_FINISH';
export const POOL_ACTION_API_FORMS_ON_API_EXCEPTION = 'POOL_ACTION_API_FORMS_ON_API_EXCEPTION';
export const POOL_ACTION_API_FORMS_ON_ERROR_DISMISS = 'POOL_ACTION_API_FORMS_ON_ERROR_DISMISS';


export const POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH = 'POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH';
export const POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA = 'POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA';
export const POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS = 'POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS';


// Bottom Level Pool Ids **********************************************************************************************
// Bottom Level Pool Ids **********************************************************************************************

// ReduxPoolCacheMap Ids
export const CACHE_MAP_ID_LOCATION_PROFILES = 'CACHE_MAP_ID_LOCATION_PROFILES';
export const CACHE_MAP_ID_USER_PROFILES = 'CACHE_MAP_ID_USER_PROFILES';

// ReduxPoolApiForms Ids
export const FORM_API_ID_LOGIN = 'FORM_API_ID_LOGIN';
export const FORM_API_ID_REGISTER = 'FORM_API_ID_REGISTER';
export const FORM_API_ID_CHANGE_PASSWORD = 'FORM_API_ID_CHANGE_PASSWORD';
export const FORM_API_ID_EDIT_USER_PROFILE = 'FORM_API_ID_EDIT_USER_PROFILE';
export const FORM_API_ID_EDIT_USER_LOCATION_STATUS = 'FORM_API_ID_EDIT_USER_LOCATION_STATUS';
export const FORM_API_ID_EDIT_LOCATION_PROFILE = 'FORM_API_ID_EDIT_LOCATION_PROFILE';

// ReduxPoolModals Ids
// export const MODAL_ID_SELECT_USERS = 'modalSelectUsers';

// ReduxPoolFirebaseData Ids
export const FIREBASE_DATA_ID_FEED = 'firebaseDataIdFeed';
export const FIREBASE_DATA_ID_FEATURED_ADS = 'firebaseDataIdFeaturedAds';


// ObjectWrappers *****************************************************************************************************
// ObjectWrappers *****************************************************************************************************


export class ReduxPoolCacheMap {

	constructor(cacheId) {

		// Unique pId that identifies this cache out of all the
		// possible objects in objectPoolReducerInitState.cache
		this.cacheId = cacheId;

		this.data = {};
	}

}


export class ReduxPoolApiForms {

	constructor(formId, apiInput, errors = {}) {

		// Unique pId that identifies this form out of all the
		// possible objects in objectPoolReducerInitState.forms
		this.formId = formId;

		// An object of default value for
		// each field of this form object
		this.apiInput = apiInput;

		this.errors = errors;
		this.apiResponse = null;

		this.loading = false;
	}

}


export class ReduxFirebaseData {

	constructor(cacheId) {

		// Unique pId that identifies this pool out of all the
		// possible objects in objectPoolReducerInitState.firebaseData
		this.cacheId = cacheId;

		// If all items have been fetched (recieved.length === saved.length)
		// then this flag is set to true to stop future requests
		this.fetchedAllItems = false;

		// When the first data request is being run
		// (limitToLast(...).once('value')) this flag is true
		// Once this flag has been set to false the only way to recieve
		// new data will be though the on('child_added') subscriber
		this.runningBulkFetch = true;

		// Defines how many items to fetch on each loadMore() call
		this.itemsToLoad = Const.FirebaseDataPool.loadMoreItems;

		// The received data
		this.data = [];

	}

}


function build(poolDeclaration) {

	const result = {};

	// for each pool type, add it and its sub pools to the result
	for (let typeId in poolDeclaration) {
		if (poolDeclaration.hasOwnProperty(typeId)) {

			const poolTypeDeclaration = poolDeclaration[typeId];


			// Add the pool type to the result
			result[typeId] = {};


			for (let poolId in poolTypeDeclaration.defs) {
				if (poolTypeDeclaration.defs.hasOwnProperty(poolId)) {

					const poolDeclaration = poolTypeDeclaration.defs[poolId];

					// Add the pool to the result
					result[typeId][poolId] = poolDeclaration.initState();

				}
			}

		}
	}

	return result;
}

function poolIterator(poolDeclaration, poolIds, apply) {

	for (let poolType in poolDeclaration) {
		if (poolDeclaration.hasOwnProperty(poolType)) {

			// Get the whole pool declaration object
			const poolTypeObj = poolDeclaration[poolType];

			for (let poolId in poolTypeObj.defs) {
				if (poolTypeObj.defs.hasOwnProperty(poolId)) {

					if (poolIds.includes(poolId))
						apply(poolType, poolId, poolDeclaration[poolType].defs[poolId]);

				}
			}

		}
	}

}


// ReduxPool Top Level Builders ***************************************************************************************
// ReduxPool Top Level Builders ***************************************************************************************

// The object below declares how the reduxPoolInitState state is built
export const ReduxPoolBuilder = {

	// Declare all Top Level Pools (each of the POOL_TYPES)
	[POOL_TYPE_CACHE]: CachePool,


	[POOL_TYPE_CACHE_MAP]: {

		mutators: {
			[POOL_ACTION_CACHE_MAP_INIT_DATA]: (action, state) =>
				Object.assign(state.data, {
					[action.itemId]: Object.assign(new CacheState(action.itemId), {
						data: null,
						loading: true,
						loadingPromise: action.loadingPromise
					})
				}),
			[POOL_ACTION_CACHE_MAP_SET_DATA]: (action, state) =>
				Object.assign(state.data, {
					[action.itemId]: Object.assign(new CacheState(action.itemId), {
						data: action.data,
						loading: false,
						loadingPromise: null
					})
				}),
			[POOL_ACTION_CACHE_MAP_INVALIDATE_DATA]: (action, state) => {
				delete state.data[action.itemId];
				return state;
			},

			[POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA]: (action) => ({
				data: {},
			})
		},

		connectParams: {

			getExtraProps: (poolId, pool, stateProps, dispatchProps) => ({

				get: (itemId, extraParams) => {

					if (!(itemId in stateProps.data)) {
						dispatchProps.initializeItem(itemId, extraParams);
						return null;
					}
					return stateProps.data[itemId].data;
				},


			}),


			getActionCreators: (poolId, pool, dispatch) => ({

				invalidateItem: (itemId) => dispatch({
					poolType: POOL_TYPE_CACHE_MAP,
					poolId,
					type: POOL_ACTION_CACHE_MAP_INVALIDATE_DATA,
					itemId
				}),

				invalidateAll: () => dispatch({
					poolType: POOL_TYPE_CACHE_MAP,
					poolId,
					type: POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA
				}),

				initializeItem: (itemId, extraParams) => dispatch((dispatch, getState) => {

					// If the data is already set (or is about to be set [loadingPromise != null]) there is
					// no need to run the request again.

					// If the data has been updated and needs to be requested again, you must
					// use invalidateItem() and then initializeItem()


					// Check if the data is set, if it is return
					const cacheMapData = getState().reduxPoolReducer[POOL_TYPE_CACHE_MAP][poolId].data;

					if (itemId in cacheMapData) {
						const cacheMapItem = cacheMapData[itemId];

						if (cacheMapItem.loadingPromise != null) {
							Logger.v(`ReduxPoolCacheMap initializeItem: Requested ${poolId} ${itemId} initialization but already loading.`);
							return cacheMapItem.loadingPromise;
						}


						if (cacheMapItem.data !== null) {
							return Promise.resolve(cacheMapItem.data);
						}

					}


					// Run request or data builder
					const loadingPromise = pool.buildDataSet(itemId, extraParams)
						.then(buildResultData => {

							// Save the result data into the pool
							dispatch({
								poolType: POOL_TYPE_CACHE_MAP,
								poolId,
								type: POOL_ACTION_CACHE_MAP_SET_DATA,
								itemId,
								data: buildResultData
							});

							// Continue the promise chain
							return buildResultData;
						}).catch(apiExceptionResponse => {
							Logger.v("ReduxPool POOL_ACTION_CACHE_MAP initializeItem: ", apiExceptionResponse);

							dispatch({
								poolType: POOL_TYPE_CACHE_MAP,
								poolId,
								type: POOL_ACTION_CACHE_MAP_SET_DATA,
								itemId,
								data: null,
							});

							// Continue the promise chain
							return apiExceptionResponse;
						});


					// If the promise hasn't resolved immediately then
					// Save loadingPromise to th state, this way, even if [data] is
					// null the next request will not be processed because we know
					// that one has already been sent out
					return dispatch({
						poolType: POOL_TYPE_CACHE_MAP,
						poolId,
						type: POOL_ACTION_CACHE_MAP_INIT_DATA,
						itemId,
						payload: loadingPromise,
						loadingPromise
					}).then(({value}) => value);

				})

			})

		},

		defs: {
			[CACHE_MAP_ID_LOCATION_PROFILES]: CacheMapDefLocationProfiles,
			[CACHE_MAP_ID_USER_PROFILES]: CacheMapDefUserProfiles,

		}

	},


	[POOL_TYPE_API_FORMS]: {

		mutators: {
			[POOL_ACTION_API_FORMS_ON_CHANGE]: (action, subState) => ({
				apiInput: mergeWithoutExtend(subState.apiInput, action.apiInput),
				validationError: action.validationError,
				errors: action.errors
			}),
			[POOL_ACTION_API_FORMS_ON_RESET]: (action, subState) =>
				action.newState,
			[POOL_ACTION_API_FORMS_ON_POST]: (action, subState) => ({
				loading: true,
				apiResponse: null
			}),
			[POOL_ACTION_API_FORMS_ON_SUCCESS]: (action, subState) => ({
				apiResponse: action.apiResponse
			}),
			[POOL_ACTION_API_FORMS_ON_API_EXCEPTION]: (action, subState) => ({
				errors: action.errors
			}),
			[POOL_ACTION_API_FORMS_ON_FINISH]: (action, subState) => ({
				loading: false,
			}),
			[POOL_ACTION_API_FORMS_ON_ERROR_DISMISS]: (action, subState) => ({
				errors: {}
			})
		},

		connectParams: {

			getActionCreators: (poolId, pool, dispatch) => ({

				change: (apiInput) => dispatch((dispatch, getState) => {

					let errors = {};
					if (pool.validateOnChange) {
						const previousErrors = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId].errors;
						errors = pool.validate(apiInput, previousErrors);
					}

					dispatch({
						poolType: POOL_TYPE_API_FORMS,
						poolId,
						type: POOL_ACTION_API_FORMS_ON_CHANGE,
						apiInput,
						errors
					});

				}),

				reset: () => dispatch({
					poolType: POOL_TYPE_API_FORMS,
					poolId,
					type: POOL_ACTION_API_FORMS_ON_RESET,
					newState: pool.initState()
				}),

				setErrors: (errors) => dispatch({
					poolType: POOL_TYPE_API_FORMS,
					poolId,
					type: POOL_ACTION_API_FORMS_ON_API_EXCEPTION,
					errors
				}),

				dismissError: () => dispatch({
					poolType: POOL_TYPE_API_FORMS,
					poolId,
					type: POOL_ACTION_API_FORMS_ON_ERROR_DISMISS
				}),

				post: (extraParams) => dispatch((dispatch, getState) => {
					pool.bindAction(dispatch, getState);	// todo: unbind at the end

					const form = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId];
					const apiInput = form.apiInput;
					let errors = form.errors;

					// todo: this code is duplicate, see change function
					if (pool.validateOnChange) {
						const previousErrors = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId].errors;
						errors = pool.validate(apiInput, previousErrors, true);
					}

					if (ApiFormDef.hasErrors(errors)) {
						const setErrors = ReduxPoolBuilder[POOL_TYPE_API_FORMS]
							.connectParams.getActionCreators(poolId, pool, dispatch).setErrors;
						setErrors(errors);
						return Promise.reject(errors);
					}


					// Disable screen
					if (pool.disableScreenOnLoading)
						dispatch(screenDisablePointerEvents());

					dispatch({
						poolType: POOL_TYPE_API_FORMS,
						poolId,
						type: POOL_ACTION_API_FORMS_ON_POST
					});


					return pool.post(
						// data
						apiInput,

						// Some post methods like ApiClient.resetPassword
						// require extra parameters that are passed in through
						// this extra nullable object
						extraParams,

						// Redux Dispatch Function
						dispatch,

						// Redux state Function
						getState
					).then(apiResponse => {

						// Handle the state change
						dispatch({
							poolType: POOL_TYPE_API_FORMS,
							poolId,
							type: POOL_ACTION_API_FORMS_ON_SUCCESS,
							apiResponse
						});

						// Request has completed successfully
						return apiResponse;

					}).catch(api400 => {
						// Note: the api has already handled the exception
						// here you should only do form specific actions
						// for example set the button out of its loading state
						const errors = _.get(JSON.parse(api400), 'errors', {});
						const setErrors = ReduxPoolBuilder[POOL_TYPE_API_FORMS]
							.connectParams.getActionCreators(poolId, pool, dispatch).setErrors;
						setErrors(errors);
						return errors;
					}).finally(userProfile => {

						dispatch({
							poolType: POOL_TYPE_API_FORMS,
							poolId,
							type: POOL_ACTION_API_FORMS_ON_FINISH,
						});

						// Enable screen
						if (pool.disableScreenOnLoading)
							dispatch(screenEnablePointerEvents());

						return userProfile;
					});

				})

			})

		},

		defs: {
			[FORM_API_ID_LOGIN]: ApiFormDefLogin,
			[FORM_API_ID_REGISTER]: ApiFormDefRegister,
			[FORM_API_ID_CHANGE_PASSWORD]: ApiFormDefChangePassword,
			[FORM_API_ID_EDIT_USER_PROFILE]: ApiFormDefUserProfile,
			[FORM_API_ID_EDIT_USER_LOCATION_STATUS]: ApiFormDefUserLocationStatus,
			[FORM_API_ID_EDIT_LOCATION_PROFILE]: ApiFormDefLocationProfile,
		}

	},


	[POOL_TYPE_FIREBASE_DATA]: {

		mutators: {
			[POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH]: (action, state) => ({
				runningBulkFetch: true,
				itemsToLoad: state.itemsToLoad + Const.FirebaseDataPool.loadMoreItems
			}),
			[POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA]: (action) => ({
				runningBulkFetch: false,
				data: action.data
			}),
			[POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS]: (action) => ({
				fetchedAllItems: true,
				runningBulkFetch: false,
			})
		},

		connectParams: {

			getActionCreators: (poolId, pool, dispatch) => ({

				_saveReceivedData: (receivedObjIdArr) => dispatch((dispatch, getState) => {
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

							dispatch({
								poolType: POOL_TYPE_FIREBASE_DATA,
								poolId,
								type: POOL_ACTION_FIREBASE_DATA_SAVE_RECEIVED_DATA,
								data: mappedData.reverse().concat(reduxFirebasePool.data)
							});

							// Run all post receive specific pool side-effect functions to each item
							objArr.forEach(pool.onReceiveLocalItem);
						});
					});

				}),

				_getUserObjectIds: (userId) => dispatch((dispatch, getState) => {

					// Notify of start fetch
					dispatch({
						poolType: POOL_TYPE_FIREBASE_DATA,
						poolId,
						type: POOL_ACTION_FIREBASE_DATA_PRE_BULK_FETCH,
					});

					// Get the current state
					const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

					pool.getUserObjectIds(userId).limitToLast(reduxFirebasePool.itemsToLoad).once('value', (snapshot) => {
						const firebaseId = snapshot.val();

						if (firebaseId == null) {
							// There are no items in this firebase list
							// the initialization is complete
							dispatch({
								poolType: POOL_TYPE_FIREBASE_DATA,
								poolId,
								type: POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS,
							});
							return;
							
						}


						// Get the current state
						const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];

						const receivedIds = Object.values(firebaseId);
						const stateReceivedObjs = reduxFirebasePool.data;

						if (receivedIds.length === stateReceivedObjs.length) {
							// All items have been fetched
							// the initialization is complete
							dispatch({
								poolType: POOL_TYPE_FIREBASE_DATA,
								poolId,
								type: POOL_ACTION_FIREBASE_DATA_SET_FETCHED_ALL_ITEMS,
							});
							return;
						}

						// Get the _saveReceivedData method from the ReduxPoolBuilder
						const _saveReceivedData = ReduxPoolBuilder[POOL_TYPE_FIREBASE_DATA]
							.connectParams.getActionCreators(poolId, pool, dispatch)._saveReceivedData;

						// New items have come in, reverse and save the list
						_saveReceivedData(receivedIds);
					});

				}),


				loadMore: (userId) => dispatch((dispatch, getState) => {

					// Get state and check if fetchedAllItems is true
					const reduxFirebasePool = getState().reduxPoolReducer[POOL_TYPE_FIREBASE_DATA][poolId];
					if (reduxFirebasePool.fetchedAllItems)
						return;


					// Get the _saveReceivedData method from the ReduxPoolBuilder
					const _getUserObjectIds = ReduxPoolBuilder[POOL_TYPE_FIREBASE_DATA]
						.connectParams.getActionCreators(poolId, pool, dispatch)._getUserObjectIds;

					// Initialization, run the bulk request
					_getUserObjectIds(userId);

				}),


				initialize: (userId) => dispatch((dispatch, getState) => {

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

						// Get the _saveReceivedData method from the ReduxPoolBuilder
						const _saveReceivedData = ReduxPoolBuilder[POOL_TYPE_FIREBASE_DATA]
							.connectParams.getActionCreators(poolId, pool, dispatch)._saveReceivedData;

						_saveReceivedData([snapshot.key]);
					});

					// Get the _saveReceivedData method from the ReduxPoolBuilder
					const _getUserObjectIds = ReduxPoolBuilder[POOL_TYPE_FIREBASE_DATA]
						.connectParams.getActionCreators(poolId, pool, dispatch)._getUserObjectIds;

					// Initialization, run the bulk request
					_getUserObjectIds(userId);

				})

			})

		},

		defs: {
			[FIREBASE_DATA_ID_FEED]: FirebaseDataDefFeed,
			[FIREBASE_DATA_ID_FEATURED_ADS]: FirebaseDataDefFeaturedAds,

		}

	}

};


// Redux **************************************************************************************************************
// Redux **************************************************************************************************************

// ReduxPool initial state, all ids should be unique in this object
// Foreach pool that needs to exist initialize it using
// its pId as key and the associated Object-Wrapper as its value
const reduxPoolInitState = build(ReduxPoolBuilder);


export function reduxPoolReducer(state = reduxPoolInitState, action) {


	if ('poolType' in action && 'poolId' in action) {

		return Object.assign({}, state, {
			[action.poolType]: Object.assign({}, state[action.poolType], {
				[action.poolId]: Object.assign({}, state[action.poolType][action.poolId],
					ReduxPoolBuilder[action.poolType].mutators[action.type](action, state[action.poolType][action.poolId])
				)
			})
		});

	}


	return state;

}


// ReduxPoolSubscribers ***********************************************************************************************
// ReduxPoolSubscribers ***********************************************************************************************

export function poolConnect(presentationalComponent, mapStateToProps, mapDispatchToProps, poolIds, extraOptions = {}) {
	return connect(
		// mapStateToProps
		subscribeStateToPools(mapStateToProps, poolIds),

		// mapDispatchToProps
		subscribeDispatchToPools(mapDispatchToProps, poolIds),

		// mergeProps
		(stateProps, dispatchProps, ownProps) => {

			// Initialize the merge result with the props
			// that were passed in from the component
			const mergeResult = Object.assign({}, stateProps, dispatchProps, ownProps);

			poolIterator(
				// Pool declaration to iterate over
				ReduxPoolBuilder,

				// Pool ids to call the 3rd param function on
				poolIds,

				// Callback function to apply to each pool Id
				(poolType, poolId, pool) => {
					
					let extraProps = {};
					const getExtraProps = ReduxPoolBuilder[poolType].connectParams.getExtraProps;
					
					if (getExtraProps != null)
						extraProps = getExtraProps(poolId, pool, stateProps[poolId], dispatchProps[poolId]);

					
					mergeResult[poolId] = Object.assign(
						// Merge the sub-pool state props
						stateProps[poolId],

						// Merge the sub-pool dispatch props
						dispatchProps[poolId],

						// Merge the sub-pool extra props (If set)
						extraProps
					);

				}
			);

			return mergeResult;
		},

		// Extra options
		extraOptions
	)(presentationalComponent);
}


function subscribeStateToPools(mapStateToProps, poolIds) {
	return (state) => {

		// initialize the result with the default input mapDispatchToProps
		let mapStateToPropsResult = mapStateToProps(state);


		poolIterator(
			// Pool Builder
			ReduxPoolBuilder,

			// Pool ids to call the 3rd param function on
			poolIds,

			// Function to apply to each pool
			(poolType, poolId) => {

				const poolState = state.reduxPoolReducer[poolType][poolId];

				// Merge the current result with the found pool
				mapStateToPropsResult = Object.assign({}, mapStateToPropsResult, {[poolId]: poolState});

			}
		);


		return mapStateToPropsResult;

	};
}


function subscribeDispatchToPools(mapDispatchToProps, poolIds) {
	return (dispatch) => {

		// initialize the result with the default input mapDispatchToProps
		let mapDispatchToPropsResult = mapDispatchToProps(dispatch);


		poolIterator(
			// Pool Builder
			ReduxPoolBuilder,

			// Pool ids to call the 3rd param function on
			poolIds,

			// Function to apply to each pool
			(poolType, poolId) => {

				const poolDispatch = ReduxPoolBuilder[poolType].connectParams.getActionCreators(
					// Pass the pool pId (needed dispatch pool specific actions)
					poolId,

					// Pass the pool object, (needed so the function can access)
					// properties in its child pools
					ReduxPoolBuilder[poolType].defs[poolId],


					// Pass in a the dispatch function
					dispatch
				);


				// Merge the current result with all the indicated pools
				mapDispatchToPropsResult = Object.assign({}, mapDispatchToPropsResult, {[poolId]: poolDispatch});

			}
		);


		return mapDispatchToPropsResult;
	};
}