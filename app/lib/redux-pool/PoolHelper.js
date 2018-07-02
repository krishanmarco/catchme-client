/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 28-May-18 © **/
import ApiFormActionCreator from './api-form/ApiFormActionCreator';
import CacheActionCreator from './cache/CacheActionCreator';
import CacheMapActionCreator from './cache-map/CacheMapActionCreator';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from './cache/def/CacheDefUserProfile';
import {
	CACHE_MAP_ID_LOCATION_PROFILES,
	CacheMapDefLocationProfilesActionCreator
} from './cache-map/def/CacheMapDefLocationProfiles';
import {CACHE_MAP_ID_LOCATIONS} from './cache-map/def/CacheMapDefLocations';
import {CACHE_MAP_ID_USER_PROFILES} from './cache-map/def/CacheMapDefUserProfiles';
import {CACHE_MAP_ID_USERS} from './cache-map/def/CacheMapDefUsers';
import {FORM_API_ID_EDIT_USER_PROFILE} from './api-form/def/ApiFormDefUserProfile';
import type {TId, TThunk} from '../types/Types';

// Caches ***********************************************************************************************
// Caches ***********************************************************************************************

export function userProfileActions(thunk: TThunk): CacheDefUserProfileActionCreator {
	const cac = new CacheActionCreator(CACHE_ID_USER_PROFILE, thunk.dispatch);
	return new CacheDefUserProfileActionCreator(cac);
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
	const cmac = new CacheMapActionCreator(CACHE_MAP_ID_LOCATION_PROFILES, thunk.dispatch);
	return new CacheMapDefLocationProfilesActionCreator(cmac);
}

// ApiForms *********************************************************************************************
// ApiForms *********************************************************************************************

export function formEditUserProfileActions(thunk: TThunk): ApiFormActionCreator {
	return new ApiFormActionCreator(FORM_API_ID_EDIT_USER_PROFILE, thunk.dispatch);
}