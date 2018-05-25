import CacheMapDef from "../CacheMapDef";
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import type {TCacheMapDef} from "../CacheMapDef";
import type {TUser} from "../../../daos/DaoUser";
import ApiClient from "../../../data/ApiClient";

export const CACHE_MAP_ID_USER_PROFILES = 'CACHE_MAP_ID_USER_PROFILES';

// Declare cache-map definition
class CacheMapDefUserProfiles extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_USER_PROFILES);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	buildDataSet(uid: number): Promise<TUser> {
		return ApiClient.usersGetUidProfile(uid);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefUserProfiles = TCacheMapDef<TUser>;

const cacheMapDefUserProfiles: TCacheMapDefUserProfiles = new CacheMapDefUserProfiles();
export default cacheMapDefUserProfiles;
