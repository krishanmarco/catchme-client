/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import ApiFormDef from "../ApiFormDef";
import CacheActionCreator from "../../cache/CacheActionCreator";
import DaoUserLocationStatus from "../../../daos/DaoUserLocationStatus";
import {ApiFormState} from "../ApiFormModel";
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from "../../cache/def/CacheDefUserProfile";
import type {TApiFormDef} from "../ApiFormDef";
import type {TLocation} from "../../../daos/DaoLocation";
import type {TLocationWithULS} from "../../../helpers/ULSListManager";
import type {TThunk} from "../../../types/Types";
import type {TUserLocationStatus} from "../../../daos/DaoUserLocationStatus";
import DaoLocation from "../../../daos/DaoLocation";


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

	post(thunk: TThunk, userLocationStatus: TUserLocationStatus, location: TLocation): Promise<TUserLocationStatus> {
		// Use the UserProfileActionCreator to keep the UI synced
		const actionCreator = new CacheActionCreator(CACHE_ID_USER_PROFILE, thunk.dispatch);
		const userProfileActionCreator = new CacheDefUserProfileActionCreator(actionCreator);

		let promiseLocationProfile = Promise.resolve(location);

		if (location == null)
			promiseLocationProfile = ApiClient.locationsGetLid(DaoUserLocationStatus.gLocationId(userLocationStatus));

		return promiseLocationProfile
			.then((location: TLocation) => {
				location = {...location};
				const locationWithULS = DaoLocation.sUserLocationStatus(location, userLocationStatus);
				return userProfileActionCreator.putLocationWithULS(locationWithULS);
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