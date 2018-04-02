/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../data/ApiClient";
import ApiFormDef from "./ApiFormDef";
import {
	FORM_API_ID_EDIT_USER_PROFILE,
	POOL_TYPE_API_FORMS,
	POOL_TYPE_CACHE,
	ReduxPoolApiForms,
	ReduxPoolBuilder
} from "../../../redux/ReduxPool";
import {Validate} from "../../helpers/Validator";
import type {TUser} from "../../daos/DaoUser";
import DaoUser from "../../daos/DaoUser";
import type {TApiFormDef} from "./ApiFormDef";
import {CACHE_ID_USER_PROFILE} from "../cache/CachePool";


// Declare form definition
class ApiFormDefUserProfile extends ApiFormDef<TUser> {

	constructor() {
		super(FORM_API_ID_EDIT_USER_PROFILE, true);
	}

	initState() {
		return new ReduxPoolApiForms(this.formId, DaoUser.newInstance());
	}

	post(user: TUser): Promise<TUser> {
		// Get POOL_TYPE_CACHE and POOL_TYPE_API_FORMS actions
		const poolTypeCache = ReduxPoolBuilder[POOL_TYPE_CACHE];
		const poolTypeApiForms = ReduxPoolBuilder[POOL_TYPE_API_FORMS];

		// Get CACHE_ID_USER_PROFILE and FORM_API_ID_EDIT_USER_PROFILE pool
		const cacheUserProfile = poolTypeCache.defs[CACHE_ID_USER_PROFILE];
		const formApiEditUserProfile = poolTypeApiForms.defs[FORM_API_ID_EDIT_USER_PROFILE];

		// Get POOL_TYPE_CACHE and POOL_TYPE_API_FORMS actions
		const userProfileActions = poolTypeCache
			.connectParams.getActionCreators(CACHE_ID_USER_PROFILE, cacheUserProfile, this.dispatch);

		const userProfileFormActions = poolTypeApiForms
			.connectParams.getActionCreators(FORM_API_ID_EDIT_USER_PROFILE, formApiEditUserProfile, this.dispatch);


		// Post and invalidate CACHE_ID_USER_PROFILE
		return ApiClient.userProfileEdit(user)
			.then(() => userProfileActions.invalidate())
			.then(() => userProfileActions.initialize())
			.then((user: TUser) => userProfileFormActions.change(user));
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