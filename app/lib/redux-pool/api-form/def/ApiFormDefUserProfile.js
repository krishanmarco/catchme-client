/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import ApiFormActionCreator from "../ApiFormActionCreator";
import type {TApiFormDef} from "../ApiFormDef";
import ApiFormDef from "../ApiFormDef";
import CacheActionCreator from "../../cache/CacheActionCreator";
import type {TUser} from "../../../daos/DaoUser";
import DaoUser from "../../../daos/DaoUser";
import {CACHE_ID_USER_PROFILE} from "../../cache/def/CacheDefUserProfile";
import {Validate} from "../../../helpers/Validator";
import {ApiFormState} from "../ApiFormModel";


export const FORM_API_ID_EDIT_USER_PROFILE = 'FORM_API_ID_EDIT_USER_PROFILE';

// Declare form definition
class ApiFormDefUserProfile extends ApiFormDef<TUser> {

	constructor() {
		super(FORM_API_ID_EDIT_USER_PROFILE, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoUser.newInstance());
	}

	post(user: TUser): Promise<TUser> {
		const cacheActionsUserProfile = new CacheActionCreator(CACHE_ID_USER_PROFILE, this.dispatch);
		const formApiActionsEditUserProfile = new ApiFormActionCreator(FORM_API_ID_EDIT_USER_PROFILE, this.dispatch);
		
		// Post and invalidate CACHE_ID_USER_PROFILE
		return ApiClient.userProfileEdit(user)
			.then(() => cacheActionsUserProfile.reinitialize())
			.then((user: TUser) => formApiActionsEditUserProfile.change(user));
	}
	
	
	validate(user: TUser, errors: TUser, inclusive: boolean = false): TUser {
		this.setError(errors, inclusive, user, DaoUser.pEmail, e => Validate.email(e));
		this.setError(errors, inclusive, user, DaoUser.pPhone, p => Validate.phone(p));
		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefUserProfile = TApiFormDef<TUser>;

const apiFormDefUserProfile: TApiFormDefUserProfile = new ApiFormDefUserProfile();
export default apiFormDefUserProfile;