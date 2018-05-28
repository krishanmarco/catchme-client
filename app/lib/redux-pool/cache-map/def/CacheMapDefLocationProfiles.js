/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import CacheMapDef from '../CacheMapDef';
import type {TCacheMapDef} from '../CacheMapDef';
import type {TLocation} from '../../../daos/DaoLocation';
import type {TThunk} from '../../../types/Types';

export const CACHE_MAP_ID_LOCATION_PROFILES = 'CACHE_MAP_ID_LOCATION_PROFILES';

// Declare cache-map definition
class CacheMapDefLocationProfiles extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_LOCATION_PROFILES);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	buildDataSet(thunk: TThunk, lid: number, extraParams: Object): Promise<TLocation> {
		return ApiClient.locationsGetLidProfile(lid);
	}

}

// Declare cache-map sub-type
export type TCacheMapDefLocationProfiles = TCacheMapDef<TLocation>;

const cacheMapDefLocationProfiles: TCacheMapDefLocationProfiles = new CacheMapDefLocationProfiles();
export default cacheMapDefLocationProfiles;
