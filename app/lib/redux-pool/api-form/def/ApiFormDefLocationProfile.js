/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import ApiFormDef from "../ApiFormDef";
import CacheActionCreator from "../../cache/CacheActionCreator";
import DaoLocation from "../../../daos/DaoLocation";
import {ApiFormState} from "../ApiFormModel";
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from "../../cache/def/CacheDefUserProfile";
import {Validate} from "../../../helpers/Validator";
import type {TApiFormDef} from "../ApiFormDef";
import type {TLocation} from "../../../daos/DaoLocation";
import type {TThunk} from "../../../types/Types";


export const FORM_API_ID_EDIT_LOCATION_PROFILE = 'FORM_API_ID_EDIT_LOCATION_PROFILE';

// Declare form definition
class ApiFormDefLocationProfile extends ApiFormDef<TLocation> {

	constructor() {
		super(FORM_API_ID_EDIT_LOCATION_PROFILE, true, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		const location = DaoLocation.newInstance();
		const errors = this.validate(location, {}, true);
		return new ApiFormState(this.formId, location, errors);
	}

	post(thunk: TThunk, locationProfile: TLocation): Promise<TLocation> {
		const cacheActionCreator = new CacheActionCreator(CACHE_ID_USER_PROFILE, thunk.dispatch);
		const cacheUserProfile = new CacheDefUserProfileActionCreator(cacheActionCreator);
		return cacheUserProfile.putAdminLocation(locationProfile);
	}

	validate(location: TLocation, errors: TLocation, inclusive: boolean = false): TLocation {
		this.setError(errors, inclusive, location, DaoLocation.pName, n => Validate.string(n, 3, 100));
		this.setError(errors, inclusive, location, DaoLocation.pEmail, e => Validate.email(e));
		this.setError(errors, inclusive, location, DaoLocation.pCapacity, c => Validate.number(c, 1));
		this.setError(errors, inclusive, location, DaoLocation.pPhone, p => Validate.phone(p));
		this.setError(errors, inclusive, location, DaoLocation.pAddressCountry, c => Validate.countryCode(c));
		this.setError(errors, inclusive, location, DaoLocation.pAddressState, s => Validate.string(s));
		this.setError(errors, inclusive, location, DaoLocation.pAddressCity, c => Validate.string(c));
		this.setError(errors, inclusive, location, DaoLocation.pAddressPostcode, p => Validate.string(p));
		this.setError(errors, inclusive, location, DaoLocation.pAddressAddress, a => Validate.string(a));
		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefLocationProfile = TApiFormDef<TLocation>;

const formDefLocationProfile: TApiFormDefLocationProfile = new ApiFormDefLocationProfile();
export default formDefLocationProfile;