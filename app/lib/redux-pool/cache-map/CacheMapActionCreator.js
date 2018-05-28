/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import DataProvider from '../../data/DataProvider';
import Logger from '../../Logger';
import PoolActionCreator from '../PoolActionCreator';
import {CacheMapState} from './CacheMapModel';
import {
	POOL_ACTION_CACHE_MAP_INIT_DATA,
	POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA,
	POOL_ACTION_CACHE_MAP_INVALIDATE_DATA,
	POOL_ACTION_CACHE_MAP_SET_DATA
} from './CacheMapPool';
import {POOL_TYPE_CACHE_MAP} from '../../../redux/ReduxPool';
import type {TDispatch} from '../../types/Types';


export default class CacheMapActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_CACHE_MAP, poolDefId, dispatch);
		this.invalidateItem = this.invalidateItem.bind(this);
		this.invalidateAll = this.invalidateAll.bind(this);
		this.initializeItem = this.initializeItem.bind(this);
	}

	itemExists(itemId: number|string, needsToBeValid: boolean = true): Promise<boolean> {
		const {dispatch} = this;
		return dispatch((dispatch, getState) => {
			const cacheMapData: CacheMapState = this.getPoolState(getState).data;

			if (!(itemId in cacheMapData))
				return Promise.resolve(false);

			// item id is in data, check if valid
			const {data, expiryTs} = cacheMapData[itemId];
			return Promise.resolve(data !== null && (!needsToBeValid || DataProvider.cacheIsValid(expiryTs)));
		});
	}
	
	invalidateItem(itemId) {
		const {dispatchAction} = this;
		
		return dispatchAction({
			type: POOL_ACTION_CACHE_MAP_INVALIDATE_DATA,
			itemId
		});
	}
	
	invalidateAll() {
		const {dispatchAction, poolId} = this;
		
		return dispatchAction({
			type: POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA,
			cacheId: poolId
		});
	}

	initializeItem(itemId, extraParams) {
		const {dispatchAction, dispatch, dispatchPromiseAction, poolId} = this;
		const pool = this.getPoolDef();
		// todo duplicaed in itemExists
		return dispatch((dispatch, getState) => {
			
			// If the data is already set (or is about to be set [nextPromise != null]) there is
			// no need to run the request again.
			
			// If the data has been updated and needs to be requested again, you must
			// use invalidateItem() and then initializeItem()

			// Check if the data is set, and is valid if it is return
			const cacheMapData: CacheMapState = this.getPoolState(getState).data;
			
			if (itemId in cacheMapData) {
				const {loadingPromise, data, expiryTs} = cacheMapData[itemId];

				// If already loading return the promise
				if (loadingPromise != null) {
					Logger.v(`CacheMapActionCreator initializeItem: Requested ${poolId} ${itemId} initialization but already loading.`);
					return loadingPromise;
				}

				// If already loaded and valid return the data
				if (data !== null && DataProvider.cacheIsValid(expiryTs)) {
					Logger.v(`CacheMapActionCreator initializeItem: Cache valid, ${poolId} ${itemId}`);
					return Promise.resolve(data);
				}

				Logger.v(`CacheMapActionCreator initializeItem: Cache invalid, ${poolId} ${itemId}, data(null)=${data == null}`);
			}
			
			
			// Run request or data builder
			const nextPromise = pool.buildDataSet({dispatch, getState}, itemId, extraParams)
				.then(buildResultData => {
					
					// Save the result data into the pool
					dispatchAction({
						type: POOL_ACTION_CACHE_MAP_SET_DATA,
						itemId,
						data: buildResultData
					});
					
					// Continue the promise chain
					return buildResultData;
				}).catch(apiExceptionResponse => {
					Logger.v('CacheMapActionCreator initializeItem:', apiExceptionResponse);
					
					dispatchAction({
						type: POOL_ACTION_CACHE_MAP_SET_DATA,
						data: null,
						itemId,
					});
					
					// Continue the promise chain
					return apiExceptionResponse;
				});
			
			
			// If the promise hasn't resolved immediately then
			// Save nextPromise to th state, this way, even if [data] is
			// null the next request will not be processed because we know
			// that one has already been sent out
			return dispatchPromiseAction({
				type: POOL_ACTION_CACHE_MAP_INIT_DATA,
				loadingPromise: nextPromise,
				itemId,
			}, nextPromise);
			
		});
	}


}