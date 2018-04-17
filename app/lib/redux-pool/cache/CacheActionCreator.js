/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import Logger from "../../Logger";
import PoolActionCreator from "../PoolActionCreator";
import {CacheState} from "./CacheModel";
import {
	POOL_ACTION_CACHE_INIT_DATA,
	POOL_ACTION_CACHE_INVALIDATE_DATA,
	POOL_ACTION_CACHE_SET_DATA
} from "./CachePool";
import {POOL_TYPE_CACHE} from "../../../redux/ReduxPool";
import type {TDispatch} from "../../types/Types";


export default class CacheActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_CACHE, poolDefId, dispatch);
		this.invalidate = this.invalidate.bind(this);
		this.initialize = this.initialize.bind(this);
	}


	reinitialize(extraParams) {
		this.invalidate();
		return this.initialize(extraParams);
	}


	// Action to invalidate a cache
	invalidate() {
		const {dispatchAction} = this;
		return dispatchAction({type: POOL_ACTION_CACHE_INVALIDATE_DATA});
	}


	initialize(extraParams) {
		const {poolId, dispatch, dispatchAction, dispatchPromiseAction} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			// If the data is already set (or is about to be set [loadingPromise != null]) there is
			// no need to run the request again.

			// If the data has been updated and needs to be requested again, you must
			// use invalidate() and then initialize()

			// Check if the data is set, if it is return
			const {loadingPromise, data}: CacheState = this.getPoolState(getState);

			// If already loading return the promise
			if (loadingPromise != null) {
				Logger.v(`CacheActionCreator initialize: Requested ${poolId} initialization but already loading.`);
				return loadingPromise;
			}

			// If already loaded return the data
			if (data !== null) {
				return Promise.resolve(data);
			}

			// Run request or data builder
			const nextPromise = pool.buildDataSet(dispatch, extraParams).then(buildResultData => {

				// Save the result data into the pool
				dispatchAction({
					type: POOL_ACTION_CACHE_SET_DATA,
					data: buildResultData
				});

				// Continue the promise chain
				return buildResultData;

			}).catch(apiExceptionResponse => {
				Logger.v("CacheActionCreator POOL_ACTION_CACHE_SET_DATA initialize: ", apiExceptionResponse);

				/* todo: remove comment after development
				dispatch({
					poolType: POOL_TYPE_CACHE,
					poolId: poolId,
					type: POOL_ACTION_CACHE_SET_DATA,
					data: null
				});*/

				// Continue the promise chain
				return apiExceptionResponse;
			});


			// If the promise hasn't resolved immediately then
			// Save nextPromise to the state, this way, even if [data] is
			// null the next request will not be processed because we know
			// that one has already been sent out
			return dispatchPromiseAction({
				type: POOL_ACTION_CACHE_INIT_DATA,
				loadingPromise: nextPromise
			}, nextPromise);

		});
	}


}