/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiFormDef from '../ApiFormDef';
import DaoUser from '../../../daos/DaoUser';
import {ApiFormState} from '../ApiFormModel';
import {formEditUserProfileActions, userProfileActions} from '../../PoolHelper';
import {Validate} from '../../../helpers/Validator';
import type {TApiFormDef} from '../ApiFormDef';
import type {TThunk} from '../../../types/Types';
import type {TUser} from '../../../daos/DaoUser';


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

	async post(thunk: TThunk, user: TUser): Promise<TUser> {
		return userProfileActions(thunk).editUser(user)
			.then(formEditUserProfileActions(thunk).change);
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