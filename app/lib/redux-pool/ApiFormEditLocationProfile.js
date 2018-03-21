/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import type {TApiFormPool} from "./ApiFormPool";
import type {TLocation} from "../daos/DaoLocation";
import ApiClient from "../data/ApiClient";
import {FORM_API_ID_EDIT_LOCATION_PROFILE, ReduxPoolApiForms} from "../../redux/ReduxPool";
import DaoLocation from "../daos/DaoLocation";
import {Validate} from "../helpers/Validator";
import _ from 'lodash';

export type TApiFormEditLocationProfile = TApiFormPool<TLocation>;

class FormApiEditLocationProfile {

	initState() {
		return new ReduxPoolApiForms(FORM_API_ID_EDIT_LOCATION_PROFILE, DaoLocation.newInstance());
	}

	post(locationProfile: TLocation): Promise<TLocation> {
		ApiClient.userLocationsAdminEditLid(locationProfile);
	}


	_setError(errors, inclusive, objToValidate, propertyName, validator) {
		const value = _.get(objToValidate, propertyName);

		if (inclusive || value)
			errors = _.set(errors, propertyName, validator(value));

		return errors;
	}

	validate(location: TLocation, inclusive: boolean = false): TLocation {
		const errors = {};
		this._setError(errors, inclusive, location, DaoLocation.pName, n => Validate.string(n, 3, 100));
		this._setError(errors, inclusive, location, DaoLocation.pEmail, e => Validate.email(e));
		this._setError(errors, inclusive, location, DaoLocation.pCapacity, c => Validate.number(c, 1));
		this._setError(errors, inclusive, location, DaoLocation.pPhone, p => Validate.string(p, 5, 15));
		this._setError(errors, inclusive, location, DaoLocation.pAddress, a => Validate.string(a, 3, 255));
		this._setError(errors, inclusive, location, DaoLocation.pAddressCountry, c => Validate.countryCode(c));
		this._setError(errors, inclusive, location, DaoLocation.pAddressState, s => Validate.string(s));
		this._setError(errors, inclusive, location, DaoLocation.pAddressCity, c => Validate.string(c));
		this._setError(errors, inclusive, location, DaoLocation.pAddressPostcode, p => Validate.string(p));
		this._setError(errors, inclusive, location, DaoLocation.pAddress, a => Validate.string(a));
		return errors;
	}

}

const formApiEditLocationProfile: TApiFormEditLocationProfile = new FormApiEditLocationProfile();
export default formApiEditLocationProfile;