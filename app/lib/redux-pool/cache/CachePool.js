/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import CacheDefUserLocationStatus, {CACHE_ID_USER_LOCATION_STATUS} from "./def/CacheDefUserLocationStatus";
import CacheDefUserProfile, {CACHE_ID_USER_PROFILE} from "./def/CacheDefUserProfile";
import CachePoolActionCreator from "./CacheActionCreator";
import {mutatorCacheModelInitializeData, mutatorCacheModelInvalidateData, mutatorCacheModelSetData} from "./CacheModel";
import type {TDispatch} from "../../types/Types";
import type {TPool} from "../Pool";


// Define all Actions (There should for each ACTION)
export const POOL_ACTION_CACHE_INIT_DATA = 'POOL_ACTION_CACHE_INIT_DATA';
export const POOL_ACTION_CACHE_SET_DATA = 'POOL_ACTION_CACHE_SET_DATA';
export const POOL_ACTION_CACHE_INVALIDATE_DATA = 'POOL_ACTION_CACHE_INVALIDATE_DATA';


const CachePool: TPool = {
	
	mutators: {
		[POOL_ACTION_CACHE_INIT_DATA]: mutatorCacheModelInitializeData,
		[POOL_ACTION_CACHE_SET_DATA]: mutatorCacheModelSetData,
		[POOL_ACTION_CACHE_INVALIDATE_DATA]: mutatorCacheModelInvalidateData
	},
	
	
	connectParams: {
		getActionCreator: (poolDefId: string, dispatch: TDispatch) => new CachePoolActionCreator(poolDefId, dispatch)
	},

	
	defs: {
		[CACHE_ID_USER_PROFILE]: CacheDefUserProfile,
		[CACHE_ID_USER_LOCATION_STATUS]: CacheDefUserLocationStatus,
	}
	
};
export default CachePool;
