/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import _ from 'lodash';
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
import type {TDispatch, TId} from '../../types/Types';


export default class CacheMapActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_CACHE_MAP, poolDefId, dispatch);
		this.itemExists = this.itemExists.bind(this);
		this.setData = this.setData.bind(this);
		this.executeIfDataNotNull = this.executeIfDataNotNull.bind(this);
		this.invalidateItem = this.invalidateItem.bind(this);
		this.invalidateAll = this.invalidateAll.bind(this);
		this.initializeItem = this.initializeItem.bind(this);
	}

	itemExists(itemId: TId, needsToBeValid: boolean = true): Promise<boolean> {
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


	async executeIfDataNotNull<T>(itemId: TId, functionToExecute: Object => T): Promise<T> {
		return await this.itemExists(itemId, false)
			? this.initializeItem(itemId).then(functionToExecute)
			: Promise.resolve(null);
	}

	// Directly sets the {data} of this cache
	setData<T>(itemId: TId, data: T): T {
		this.dispatchAction({type: POOL_ACTION_CACHE_MAP_SET_DATA, itemId, data});
		return data;
	}
	
	invalidateItem(itemId) {
		return this.dispatchAction({type: POOL_ACTION_CACHE_MAP_INVALIDATE_DATA, itemId});
	}
	
	invalidateAll() {
		const {dispatchAction, poolId} = this;
		
		return dispatchAction({
			type: POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA,
			cacheId: poolId
		});
	}

	initializeItem(itemId, extraParams) {
		const {dispatch, dispatchPromiseAction, poolId} = this;
		const pool = this.getPoolDef();
		return dispatch(async (dispatch, getState) => {
			
			// If the data is already set (or is about to be set [nextPromise != null]) there is
			// no need to run the request again.
			
			// If the data has been updated and needs to be requested again, you must
			// use invalidateItem() and then initializeItem()

			// Check if the data is set, and is valid if it is return
			const cacheMapData: CacheMapState = this.getPoolState(getState).data;
			const loadingPromise = _.get(cacheMapData, '[itemId].loadingPromise', false);

			if (await this.itemExists(itemId, true)) {
				Logger.v(`CacheMapActionCreator initializeItem: Cache valid, ${poolId} ${itemId}`);
				return Promise.resolve(cacheMapData[itemId].data);

			} else if (loadingPromise) {
				Logger.v(`CacheMapActionCreator initializeItem: Requested ${poolId} ${itemId} initialization but already loading.`);
				return loadingPromise;
			} 

			Logger.v(`CacheMapActionCreator initializeItem: Cache invalid, ${poolId} ${itemId}`);

			// Run the pool data-builder
			const nextPromise = pool.buildDataSet({dispatch, getState}, itemId, extraParams)
				.then(buildResultData => this.setData(itemId, buildResultData))
				.catch(apiException => {
					Logger.v('CacheMapActionCreator initializeItem:', apiException);
					this.setData(itemId, null);
					return apiException;
				});
			
			// If the promise hasn't resolved immediately then
			// Save nextPromise to the state, this way, even if [data] is
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