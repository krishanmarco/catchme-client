import {
	POOL_ACTION_CACHE_INIT_DATA, POOL_ACTION_CACHE_INVALIDATE_DATA,
	POOL_ACTION_CACHE_SET_DATA, POOL_TYPE_CACHE
} from "../../../redux/ReduxPool";
import Logger from "../../Logger";
import PoolActions from "../PoolActions";

/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/


export default class CachePoolActions extends PoolActions {

	constructor(poolId, pool, dispatch) {
		super(poolId, pool, dispatch);
	}


	// Action to invalidate a cache
	invalidate() {
		const {poolId, pool, dispatch} = this;

		dispatch({
			poolType: POOL_TYPE_CACHE,
			poolId,
			type: POOL_ACTION_CACHE_INVALIDATE_DATA
		});

	}


	initialize(extraParams) {
		const {poolId, pool, dispatch} = this;

		dispatch((dispatch, getState) => {
			// If the data is already set (or is about to be set [loadingPromise != null]) there is
			// no need to run the request again.

			// If the data has been updated and needs to be requested again, you must
			// use invalidate() and then initialize()


			// Check if the data is set, if it is return
			let reduxPoolCache = getState().reduxPoolReducer[POOL_TYPE_CACHE][poolId];

			if (reduxPoolCache.loadingPromise != null) {
				Logger.v(`ReduxPool initialize: Requested ${poolId} initialization but already loading.`);
				return reduxPoolCache.loadingPromise;
			}

			if (reduxPoolCache.data !== null) {
				return Promise.resolve(reduxPoolCache.data);
			}


			// Run request or data builder
			const loadingPromise = pool.buildDataSet(dispatch, extraParams).then(buildResultData => {

				// Save the result data into the pool
				dispatch({
					poolType: POOL_TYPE_CACHE,
					poolId,
					type: POOL_ACTION_CACHE_SET_DATA,
					data: buildResultData
				});

				// Continue the promise chain
				return buildResultData;

			}).catch(apiExceptionResponse => {
				Logger.v("ReduxPool POOL_ACTION_CACHE_SET_DATA initialize: ", apiExceptionResponse);

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
			// Save loadingPromise to the state, this way, even if [data] is
			// null the next request will not be processed because we know
			// that one has already been sent out
			return dispatch({
				poolType: POOL_TYPE_CACHE,
				poolId,
				type: POOL_ACTION_CACHE_INIT_DATA,
				payload: loadingPromise,
				loadingPromise
			}).then(({value}) => value);

		});
	}


}