/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import Logger from "../../Logger";
import PoolActionCreator from "../PoolActionCreator";
import {
	POOL_ACTION_CACHE_MAP_INIT_DATA,
	POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA,
	POOL_ACTION_CACHE_MAP_INVALIDATE_DATA,
	POOL_ACTION_CACHE_MAP_SET_DATA
} from "./CacheMapPool";
import {POOL_TYPE_CACHE_MAP} from "../../../redux/ReduxPool";
import type {TDispatch} from "../../types/Types";


export default class CacheMapActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_CACHE_MAP, poolDefId, dispatch);
		this.invalidateItem = this.invalidateItem.bind(this);
		this.invalidateAll = this.invalidateAll.bind(this);
		this.initializeItem = this.initializeItem.bind(this);
	}
	
	
	invalidateItem(itemId) {
		const {dispatchAction} = this;
		
		return dispatchAction({
			type: POOL_ACTION_CACHE_MAP_INVALIDATE_DATA,
			itemId
		});
	}
	
	invalidateAll() {
		const {dispatchAction} = this;
		
		return dispatchAction({
			type: POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA
		});
	}

	initializeItem(itemId, extraParams) {
		const {dispatchAction, dispatch, poolId} = this;
		const pool = this.getPoolDef();
		
		return dispatch((dispatch, getState) => {
			
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
					dispatchAction({
						type: POOL_ACTION_CACHE_MAP_SET_DATA,
						itemId,
						data: buildResultData
					});
					
					// Continue the promise chain
					return buildResultData;
				}).catch(apiExceptionResponse => {
					Logger.v("ReduxPool POOL_ACTION_CACHE_MAP initializeItem: ", apiExceptionResponse);
					
					dispatchAction({
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
			return dispatchAction({
				type: POOL_ACTION_CACHE_MAP_INIT_DATA,
				itemId,
				payload: loadingPromise,
				loadingPromise
			}).then(({value}) => value);
			
		});
	}


}