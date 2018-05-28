/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import ApiFormDef from '../ApiFormDef';
import CacheActionCreator from '../../cache/CacheActionCreator';
import DaoLocation from '../../../daos/DaoLocation';
import DaoUserLocationStatus from '../../../daos/DaoUserLocationStatus';
import {ApiFormState} from '../ApiFormModel';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from '../../cache/def/CacheDefUserProfile';
import type {TApiFormDef} from '../ApiFormDef';
import type {TLocation} from '../../../daos/DaoLocation';
import type {TThunk} from '../../../types/Types';
import type {TUserLocationStatus} from '../../../daos/DaoUserLocationStatus';
import {locationActions, userProfileActions} from "../../PoolHelper";
import CacheMapActionCreator from "../../cache-map/CacheMapActionCreator";
import {CACHE_MAP_ID_LOCATIONS} from "../../cache-map/def/CacheMapDefLocations";


export const FORM_API_ID_EDIT_USER_LOCATION_STATUS = 'FORM_API_ID_EDIT_USER_LOCATION_STATUS';

// Declare form definition
class FormDefUserLocationStatus extends ApiFormDef<TLocation> {

	constructor() {
		super(FORM_API_ID_EDIT_USER_LOCATION_STATUS, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoUserLocationStatus.newInstance());
	}

	post(thunk: TThunk, uls: TUserLocationStatus, location: ?TLocation): Promise<TUserLocationStatus> {
		const promiseLocation = location != null
			? Promise.resolve(location)
			: locationActions(thunk).initializeItem(DaoUserLocationStatus.gLocationId(uls));

		return promiseLocation
			.then((location: TLocation) => {
				const locationWithULS = DaoLocation.sUserLocationStatus({...location}, uls);
				return userProfileActions(thunk).putLocationWithULS(locationWithULS);
			});
	}

	validate(userLocationStatus: TUserLocationStatus, errors: TUserLocationStatus, inclusive: boolean = false): TUserLocationStatus {
		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefUserLocationStatus = TApiFormDef<TUserLocationStatus>;

const apiFormDefUserLocationStatus: TApiFormDefUserLocationStatus = new FormDefUserLocationStatus();
export default apiFormDefUserLocationStatus;