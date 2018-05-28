/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import CacheMapActionCreator from '../CacheMapActionCreator';
import CacheMapDef from '../CacheMapDef';
import {CACHE_MAP_ID_LOCATION_PROFILES} from './CacheMapDefLocationProfiles';
import type {TCacheMapDef} from '../CacheMapDef';
import type {TLocation} from '../../../daos/DaoLocation';
import type {TThunk} from '../../../types/Types';
import type {TUser} from '../../../daos/DaoUser';
import {locationsProfilesActions} from "../../PoolHelper";

export const CACHE_MAP_ID_LOCATIONS = 'CACHE_MAP_ID_LOCATIONS';

// Declare cache-map definition
class CacheMapDefLocations extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_LOCATIONS);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	async buildDataSet(thunk: TThunk, lid: number, extraParams: Object): Promise<TUser> {
		const locationProfileActions = locationsProfilesActions(thunk);

		return await locationProfileActions.itemExists(lid, false)
			? locationProfileActions.initializeItem(lid)
			: ApiClient.locationsGetLid(lid);
	}

}

// Declare cache-map sub-type
export type TCacheMapLocations = TCacheMapDef<TLocation>;

const cacheMapLocations: TCacheMapLocations = new CacheMapDefLocations();
export default cacheMapLocations;
