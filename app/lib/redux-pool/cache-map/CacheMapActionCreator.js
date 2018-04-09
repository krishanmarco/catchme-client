/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import Logger from "../../Logger";
import PoolActionCreator from "../PoolActionCreator";
import {CacheState} from "../cache/CacheModel";
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
		const {dispatchAction, dispatch, dispatchPromiseAction, poolId} = this;
		const pool = this.getPoolDef();
		
		return dispatch((dispatch, getState) => {
			
			// If the data is already set (or is about to be set [nextPromise != null]) there is
			// no need to run the request again.
			
			// If the data has been updated and needs to be requested again, you must
			// use invalidateItem() and then initializeItem()
			
			
			// Check if the data is set, if it is return
			const {data}: CacheState = this.getPoolState(getState);
			
			if (itemId in data) {
				const {loadingPromise, data} = data[itemId];

				// If already loading return the promise
				if (loadingPromise != null) {
					Logger.v(`ReduxPoolCacheMap initializeItem: Requested ${poolId} ${itemId} initialization but already loading.`);
					return loadingPromise;
				}

				// If already loaded return the data
				if (data !== null) {
					return Promise.resolve(data);
				}
				
			}
			
			
			// Run request or data builder
			const nextPromise = pool.buildDataSet(itemId, extraParams)
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