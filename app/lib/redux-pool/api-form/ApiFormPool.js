/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import CacheDefUserLocationStatus from "./def/CacheDefUserLocationStatus";
import CacheDefUserProfile from "./def/CacheDefUserProfile";
import CachePoolActionCreators from "./CacheActionCreators";
import {mutatorCacheModelInitializeData, mutatorCacheModelInvalidateData, mutatorCacheModelSetData} from "./CacheModel";
import type {TCacheDef} from "./CacheDef";
import type {TDispatch} from "../../types/Types";
import type {TPool} from "../Pool";


// Define all Actions (There should for each ACTION)
export const POOL_ACTION_CACHE_INIT_DATA = 'POOL_ACTION_CACHE_INIT_DATA';
export const POOL_ACTION_CACHE_SET_DATA = 'POOL_ACTION_CACHE_SET_DATA';
export const POOL_ACTION_CACHE_INVALIDATE_DATA = 'POOL_ACTION_CACHE_INVALIDATE_DATA';

// Define all {defs} pools
export const CACHE_ID_USER_PROFILE = 'CACHE_ID_USER_PROFILE';
export const CACHE_ID_USER_LOCATION_STATUS = 'CACHE_ID_USER_LOCATION_STATUS';


const CachePool: TPool = {
	
	mutators: {
		[POOL_ACTION_CACHE_INIT_DATA]: mutatorCacheModelInitializeData,
		[POOL_ACTION_CACHE_SET_DATA]: mutatorCacheModelSetData,
		[POOL_ACTION_CACHE_INVALIDATE_DATA]: mutatorCacheModelInvalidateData
	},
	
	
	connectParams: {
		// todo the pool parameter can be removed once all definitions have been migrated
		getActionCreators: (poolDefId: string, pool: TCacheDef, dispatch: TDispatch) => new CachePoolActionCreators(poolDefId, dispatch)
	},

	
	defs: {
		[CACHE_ID_USER_PROFILE]: CacheDefUserProfile,
		[CACHE_ID_USER_LOCATION_STATUS]: CacheDefUserLocationStatus,
	}
	
};
export default CachePool;
