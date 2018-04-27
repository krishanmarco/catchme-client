/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import CacheActionCreator from "./CacheActionCreator";
import CacheDefUserLocationStatus, {CACHE_ID_USER_LOCATION_STATUS} from "./def/CacheDefUserLocationStatus";
import CacheDefUserProfile, {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from "./def/CacheDefUserProfile";
import {
	CacheState,
	mutatorCacheModelInitializeData,
	mutatorCacheModelInvalidateData,
	mutatorCacheModelSetData
} from "./CacheModel";
import type {TDispatch} from "../../types/Types";
import type {TPool} from "../Pool";


// Define result of poolConnect for this pool
export type TCachePool = CacheActionCreator & CacheState;


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
		getDefaultActionCreator: (poolDefId: string, dispatch: TDispatch) => new CacheActionCreator(poolDefId, dispatch),
		[CACHE_ID_USER_PROFILE]: (cacheActionCreator) => new CacheDefUserProfileActionCreator(cacheActionCreator)
	},

	
	defs: {
		[CACHE_ID_USER_PROFILE]: CacheDefUserProfile,
		[CACHE_ID_USER_LOCATION_STATUS]: CacheDefUserLocationStatus,
	}
	
};
export default CachePool;
