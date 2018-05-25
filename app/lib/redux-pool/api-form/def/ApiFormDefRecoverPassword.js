/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import ApiFormDef from '../ApiFormDef';
import CacheActionCreator from '../../cache/CacheActionCreator';
import DaoApiFormRecoverPassword from '../../../daos/DaoApiFormRecoverPassword';
import DaoUser from '../../../daos/DaoUser';
import {ApiFormState} from '../ApiFormModel';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from '../../cache/def/CacheDefUserProfile';
import {Validate} from '../../../helpers/Validator';
import type {TApiFormDef} from '../ApiFormDef';
import type {TApiFormRecoverPassword} from '../../../daos/DaoApiFormRecoverPassword';
import type {TThunk} from '../../../types/Types';

export const FORM_API_ID_RECOVER_PASSWORD = 'FORM_API_ID_RECOVER_PASSWORD';

// Declare form definition
class ApiFormDefRecoverPassword extends ApiFormDef<TApiFormRecoverPassword> {

	constructor() {
		super(FORM_API_ID_RECOVER_PASSWORD, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoApiFormRecoverPassword.newInstance());
	}

	post(thunk: TThunk, apiFormRecoverPassword: TApiFormRecoverPassword): Promise<TApiFormRecoverPassword> {
		const email = DaoApiFormRecoverPassword.gEmail(apiFormRecoverPassword);
		return ApiClient.accountsRecoverPassword(email);
	}

	validate(form: TApiFormRecoverPassword, errors: TApiFormRecoverPassword, inclusive: boolean = false): TApiFormRecoverPassword {
		this.setError(errors, inclusive, form, DaoApiFormRecoverPassword.pEmail, p => Validate.email(p));
		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefRecoverPassword = TApiFormDef<TApiFormRecoverPassword>;

const apiFormDefRecoverPassword: TApiFormDefRecoverPassword = new ApiFormDefRecoverPassword();
export default apiFormDefRecoverPassword;