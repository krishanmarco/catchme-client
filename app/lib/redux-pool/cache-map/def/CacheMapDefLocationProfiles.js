import type {TCacheMapDef} from "../CacheMapDef";
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import CacheMapDef from "../CacheMapDef";
import DataProvider from "../../../data/DataProvider";
import type {TLocation} from "../../../daos/DaoLocation";

export const CACHE_MAP_ID_LOCATION_PROFILES = 'CACHE_MAP_ID_LOCATION_PROFILES';

// Declare cache-map definition
class CacheMapDefLocationProfiles extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_LOCATION_PROFILES);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	buildDataSet(locationId: number): Promise<TLocation> {
		return DataProvider.locationsGetLidProfile(locationId);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefLocationProfiles = TCacheMapDef<TLocation>;

const cacheMapDefLocationProfiles: TCacheMapDefLocationProfiles = new CacheMapDefLocationProfiles();
export default cacheMapDefLocationProfiles;
