/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import CacheMapActionCreator from "./CacheMapActionCreator";
import CacheMapDefLocationProfiles, {CACHE_MAP_ID_LOCATION_PROFILES} from "./def/CacheMapDefLocationProfiles";
import CacheMapDefUserProfiles, {CACHE_MAP_ID_USER_PROFILES} from "./def/CacheMapDefUserProfiles";
import CacheMapExtraProps from "./CacheMapExtraProps";
import {
	mutatorCacheMapModelInitData,
	mutatorCacheMapModelInvalidateAllData,
	mutatorCacheMapModelInvalidateData,
	mutatorCacheMapModelSetData
} from "./CacheMapModel";
import type {TCacheMapDef} from "./CacheMapDef";
import type {TDispatch} from "../../types/Types";
import type {TPool} from "../Pool";


// Define all Actions (There should for each ACTION)
export const POOL_ACTION_CACHE_MAP_INIT_DATA = 'POOL_ACTION_CACHE_MAP_INIT_DATA';
export const POOL_ACTION_CACHE_MAP_SET_DATA = 'POOL_ACTION_CACHE_MAP_SET_DATA';
export const POOL_ACTION_CACHE_MAP_INVALIDATE_DATA = 'POOL_ACTION_CACHE_MAP_INVALIDATE_DATA';
export const POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA = 'POOL_ACTION_CACHE_MAP_INVALIDATE_DATA';


const CacheMapPool: TPool = {
	
	mutators: {
		[POOL_ACTION_CACHE_MAP_INIT_DATA]: mutatorCacheMapModelInitData,
		[POOL_ACTION_CACHE_MAP_SET_DATA]: mutatorCacheMapModelSetData,
		[POOL_ACTION_CACHE_MAP_INVALIDATE_DATA]: mutatorCacheMapModelInvalidateData,
		[POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA]: mutatorCacheMapModelInvalidateAllData
	},
	
	
	connectParams: {
		
		getExtraProps: (poolId, pool, stateProps, dispatchProps) => new CacheMapExtraProps(poolId, pool, stateProps, dispatchProps),
		
		// todo the pool parameter can be removed once all definitions have been migrated
		getActionCreators: (poolDefId: string, pool: TCacheMapDef, dispatch: TDispatch) => new CacheMapActionCreator(poolDefId, dispatch)
	},

	
	defs: {
		[CACHE_MAP_ID_LOCATION_PROFILES]: CacheMapDefLocationProfiles,
		[CACHE_MAP_ID_USER_PROFILES]: CacheMapDefUserProfiles,
	}
	
};
export default CacheMapPool;
