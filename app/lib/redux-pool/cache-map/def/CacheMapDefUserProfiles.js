import ApiClient from '../../../data/ApiClient';
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import CacheMapDef from '../CacheMapDef';
import type {TCacheMapDef} from '../CacheMapDef';
import type {TUser} from '../../../daos/DaoUser';
import type {TThunk} from "../../../types/Types";

export const CACHE_MAP_ID_USER_PROFILES = 'CACHE_MAP_ID_USER_PROFILES';

// Declare cache-map definition
class CacheMapDefUserProfiles extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_USER_PROFILES);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	buildDataSet(thunk: TThunk, uid: number, extraParams: Object): Promise<TUser> {
		// todo: if uid is same as logged user then return the userProfile without the API request.
		return ApiClient.usersGetUidProfile(uid);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefUserProfiles = TCacheMapDef<TUser>;

const cacheMapDefUserProfiles: TCacheMapDefUserProfiles = new CacheMapDefUserProfiles();
export default cacheMapDefUserProfiles;
