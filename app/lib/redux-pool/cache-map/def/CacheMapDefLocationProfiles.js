/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import CacheMapDef from "./CacheMapDef";
import DataProvider from "../../data/DataProvider";
import {CACHE_MAP_ID_LOCATION_PROFILES} from "../../../redux/ReduxPool";
import type {TCacheMapDef} from "./CacheMapDef";
import type {TLocation} from "../../daos/DaoLocation";

// Declare cache-map definition
class CacheMapDefLocationProfiles extends CacheMapDef<TLocation> {

	constructor() {
		super(CACHE_MAP_ID_LOCATION_PROFILES);
	}

	buildDataSet(locationId: number): Promise<TLocation> {
		return DataProvider.locationsGetLidProfile(locationId);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefLocationProfiles = TCacheMapDef<TLocation>;

const cacheMapDefLocationProfiles: TCacheMapDefLocationProfiles = new CacheMapDefLocationProfiles();
export default cacheMapDefLocationProfiles;
