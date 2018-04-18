/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import CacheActionCreator from "../CacheActionCreator";
import CacheDef from "../CacheDef";
import type {TCacheDef} from "../CacheDef";
import type {TUser} from "../../../daos/DaoUser";

export const CACHE_ID_USER_PROFILE = 'CACHE_ID_USER_PROFILE';

// Declare cache definition
class CacheDefUserProfile extends CacheDef<TUser> {

	constructor() {
		super(CACHE_ID_USER_PROFILE);
	}

	buildDataSet(): Promise<TUser> {
		return ApiClient.userProfile();
	}

	// getUser(thunk: TThunk): ?TUser {
	// 	const cacheActionCreator = new CacheActionCreator(CACHE_ID_USER_PROFILE, thunk.dispatch);
	// 	const cacheUserProfileState = cacheActionCreator.getPoolState(thunk.getState);
	// 	return cacheUserProfileState.data;
	// }

}

// Declare cache sub-type
export type TCacheDefUserProfile = TCacheDef<TUser>;

const cacheDefUserProfile: TCacheDefUserProfile = new CacheDefUserProfile();
export default cacheDefUserProfile;
