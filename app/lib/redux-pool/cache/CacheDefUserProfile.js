/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../data/ApiClient";
import CacheDef from "./CacheDef";
import {CACHE_ID_USER_PROFILE} from "../../../redux/ReduxPool";
import type {TCacheDef} from "./CacheDef";
import type {TUser} from "../../daos/DaoUser";

// Declare cache definition
class CacheDefUserProfile extends CacheDef<TUser> {

	constructor() {
		super(CACHE_ID_USER_PROFILE);
	}

	buildDataSet(): Promise<TUser> {
		return ApiClient.userProfile();
	}

}

// Declare cache sub-type
export type TCacheDefUserProfile = TCacheDef<TUser>;

const cacheDefUserProfile: TCacheDefUserProfile = new CacheDefUserProfile();
export default cacheDefUserProfile;
