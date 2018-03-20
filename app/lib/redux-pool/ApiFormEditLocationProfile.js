/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import type {TApiFormPool} from "./ApiFormPool";
import type {TLocation} from "../daos/DaoLocation";
import ApiClient from "../data/ApiClient";
import {FORM_API_ID_EDIT_LOCATION_PROFILE, ReduxPoolApiForms} from "../../redux/ReduxPool";
import DaoLocation from "../daos/DaoLocation";
import {Validate} from "../helpers/Validator";

export type TApiFormEditLocationProfile = TApiFormPool<TLocation>;

class FormApiEditLocationProfile {

	initState() {
		return new ReduxPoolApiForms(FORM_API_ID_EDIT_LOCATION_PROFILE, DaoLocation.newInstance());
	}

	post(locationProfile: TLocation): Promise<TLocation> {
		ApiClient.userLocationsAdminEditLid(locationProfile);
	}

	localValidate(locationProfile: TLocation): TLocation {
		return {
			[DaoLocation.pName]: Validate.string(DaoLocation.gName(locationProfile), 3, 10),
			[DaoLocation.pEmail]: Validate.email(DaoLocation.gEmail(locationProfile)),
			[DaoLocation.pCapacity]: Validate.number(DaoLocation.gCapacity(locationProfile), 1),
			[DaoLocation.pPhone]: Validate.number(DaoLocation.gPhone(locationProfile), 5, 15),
			[DaoLocation.pAddress]: Validate.string(DaoLocation.gAddress(locationProfile), 3, 255),
			[DaoLocation.pTimings]: Validate.string(DaoLocation.gTimings(locationProfile), 168, 168),
		};
	}

}

const formApiEditLocationProfile: TApiFormEditLocationProfile = new FormApiEditLocationProfile();
export default formApiEditLocationProfile;