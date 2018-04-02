/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import CacheMapDef from "../CacheMapDef";
import DataProvider from "../../../data/DataProvider";
import {CACHE_MAP_ID_USER_PROFILES} from "../CacheMapPool";
import type {TCacheMapDef} from "../CacheMapDef";
import type {TUser} from "../../../daos/DaoUser";

// Declare cache-map definition
class CacheMapDefUserProfiles extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_USER_PROFILES);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	buildDataSet(userId: number): Promise<TUser> {
		return DataProvider.usersGetUidProfile(userId);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefUserProfiles = TCacheMapDef<TUser>;

const cacheMapDefUserProfiles: TCacheMapDefUserProfiles = new CacheMapDefUserProfiles();
export default cacheMapDefUserProfiles;
