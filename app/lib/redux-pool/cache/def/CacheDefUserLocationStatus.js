/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import type {TCacheDef} from "../CacheDef";
import CacheDef from "../CacheDef";
import type {TUserLocationStatus} from "../../../daos/DaoUserLocationStatus";

export const CACHE_ID_USER_LOCATION_STATUS = 'CACHE_ID_USER_LOCATION_STATUS';

// Declare cache definition
class CacheDefUserLocationStatus extends CacheDef<Array<TUserLocationStatus>> {

	constructor() {
		super(CACHE_ID_USER_LOCATION_STATUS);
	}

	buildDataSet(): Promise<Array<TUserLocationStatus>> {
		return ApiClient.userStatusGet();
	}

}

// Declare cache sub-type
export type TCacheDefUserLocationStatus = TCacheDef<Array<TUserLocationStatus>>;

const cacheDefUserLocationStatus: TCacheDefUserLocationStatus = new CacheDefUserLocationStatus();
export default cacheDefUserLocationStatus;
