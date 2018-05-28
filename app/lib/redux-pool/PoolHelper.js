/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 28-May-18 © **/
import CacheActionCreator from './cache/CacheActionCreator';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from './cache/def/CacheDefUserProfile';
import type {TThunk} from '../types/Types';
import CacheMapActionCreator from "./cache-map/CacheMapActionCreator";
import {CACHE_MAP_ID_USERS} from "./cache-map/def/CacheMapDefUsers";
import {CACHE_MAP_ID_LOCATIONS} from "./cache-map/def/CacheMapDefLocations";
import {FORM_API_ID_EDIT_USER_PROFILE} from "./api-form/def/ApiFormDefUserProfile";
import ApiFormActionCreator from "./api-form/ApiFormActionCreator";
import {CACHE_MAP_ID_LOCATION_PROFILES} from "./cache-map/def/CacheMapDefLocationProfiles";
import {CACHE_MAP_ID_USER_PROFILES} from "./cache-map/def/CacheMapDefUserProfiles";

// Caches ***********************************************************************************************
// Caches ***********************************************************************************************

export function userProfileActions(thunk: TThunk): CacheDefUserProfileActionCreator {
	const cacheActionCreator = new CacheActionCreator(CACHE_ID_USER_PROFILE, thunk.dispatch);
	return new CacheDefUserProfileActionCreator(cacheActionCreator);
}

// CacheMaps ********************************************************************************************
// CacheMaps ********************************************************************************************

export function usersActions(thunk: TThunk): CacheMapActionCreator {
	return new CacheMapActionCreator(CACHE_MAP_ID_USERS, thunk.dispatch);
}

export function usersProfileActions(thunk: TThunk): CacheMapActionCreator {
	return new CacheMapActionCreator(CACHE_MAP_ID_USER_PROFILES, thunk.dispatch);
}

export function locationsActions(thunk: TThunk): CacheMapActionCreator {
	return new CacheMapActionCreator(CACHE_MAP_ID_LOCATIONS, thunk.dispatch);
}

export function locationsProfilesActions(thunk: TThunk): CacheMapActionCreator {
	return new CacheMapActionCreator(CACHE_MAP_ID_LOCATION_PROFILES, thunk.dispatch);
}

// ApiForms *********************************************************************************************
// ApiForms *********************************************************************************************

export function formEditUserProfileActions(thunk: TThunk): ApiFormActionCreator {
	return new ApiFormActionCreator(FORM_API_ID_EDIT_USER_PROFILE, thunk.dispatch);
}
