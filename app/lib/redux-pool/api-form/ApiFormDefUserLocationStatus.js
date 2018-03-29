/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../data/ApiClient";
import ApiFormDef from "./ApiFormDef";
import DaoUserLocationStatus from "../../daos/DaoUserLocationStatus";
import {FORM_API_ID_EDIT_USER_LOCATION_STATUS, ReduxPoolApiForms} from "../../../redux/ReduxPool";
import type {TApiFormDef} from "./ApiFormDef";
import type {TLocation} from "../../daos/DaoLocation";
import type {TUserLocationStatus} from "../../daos/DaoUserLocationStatus";


// Declare form definition
class FormDefUserLocationStatus extends ApiFormDef<TLocation> {

	constructor() {
		super(FORM_API_ID_EDIT_USER_LOCATION_STATUS, true);
	}

	initState() {
		return new ReduxPoolApiForms(this.formId, DaoUserLocationStatus.newInstance());
	}

	post(userLocationStatus: TUserLocationStatus): Promise<TUserLocationStatus> {
		return ApiClient.userStatusAdd(userLocationStatus);
	}

	validate(userLocationStatus: TUserLocationStatus, errors: TUserLocationStatus, inclusive: boolean = false): TUserLocationStatus {
		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefUserLocationStatus = TApiFormDef<TUserLocationStatus>;

const apiFormDefUserLocationStatus: TApiFormDefUserLocationStatus = new FormDefUserLocationStatus();
export default apiFormDefUserLocationStatus;