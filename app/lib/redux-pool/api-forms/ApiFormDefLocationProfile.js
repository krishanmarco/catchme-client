/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../data/ApiClient";
import ApiFormDef from "./ApiFormDef";
import {FORM_API_ID_EDIT_LOCATION_PROFILE, ReduxPoolApiForms} from "../../../redux/ReduxPool";
import {Validate} from "../../helpers/Validator";
import type {TLocation} from "../../daos/DaoLocation";
import DaoLocation from "../../daos/DaoLocation";
import type {TApiFormDef} from "./ApiFormDef";


// Declare form definition
class ApiFormDefLocationProfile extends ApiFormDef<TLocation> {

	constructor() {
		super(FORM_API_ID_EDIT_LOCATION_PROFILE, true);
	}

	initState() {
		const location = DaoLocation.newInstance();
		const errors = this.validate(location, {}, true);
		return new ReduxPoolApiForms(this.formId, location, errors);
	}

	post(locationProfile: TLocation): Promise<TLocation> {
		return ApiClient.userLocationsAdminEditLid(locationProfile);
		// todo then set the response objet back into this form (tod set id)
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