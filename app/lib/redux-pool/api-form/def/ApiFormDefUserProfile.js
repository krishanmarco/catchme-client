/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import ApiFormActionCreator from '../ApiFormActionCreator';
import ApiFormDef from '../ApiFormDef';
import CacheActionCreator from '../../cache/CacheActionCreator';
import DaoUser from '../../../daos/DaoUser';
import {ApiFormState} from '../ApiFormModel';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from '../../cache/def/CacheDefUserProfile';
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

	post(thunk: TThunk, user: TUser): Promise<TUser> {
		const formApiActionsEditUserProfile = new ApiFormActionCreator(FORM_API_ID_EDIT_USER_PROFILE, thunk.dispatch);

		const cacheActionCreator = new CacheActionCreator(CACHE_ID_USER_PROFILE, thunk.dispatch);
		const userProfileActionCreator = new CacheDefUserProfileActionCreator(cacheActionCreator);

		return userProfileActionCreator.editUser(user)
			.then((newUser) => {
				formApiActionsEditUserProfile.change(newUser);
			});
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