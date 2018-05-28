/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiFormDef from '../ApiFormDef';
import CacheActionCreator from '../../cache/CacheActionCreator';
import DaoApiFormChangePassword from '../../../daos/DaoApiFormChangePassword';
import {ApiFormState} from '../ApiFormModel';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from '../../cache/def/CacheDefUserProfile';
import {Validate} from '../../../helpers/Validator';
import type {TApiFormChangePassword} from '../../../daos/DaoApiFormChangePassword';
import type {TApiFormDef} from '../ApiFormDef';
import type {TThunk} from '../../../types/Types';
import {userProfileActions} from "../../PoolHelper";

export const FORM_API_ID_CHANGE_PASSWORD = 'FORM_API_ID_CHANGE_PASSWORD';

// Declare form definition
class ApiFormDefChangePassword extends ApiFormDef<TApiFormChangePassword> {

	constructor() {
		super(FORM_API_ID_CHANGE_PASSWORD, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoApiFormChangePassword.newInstance());
	}

	post(thunk: TThunk, apiFormChangePassword: TApiFormChangePassword): Promise<TApiFormChangePassword> {
		return userProfileActions(thunk).changeUserPassword(apiFormChangePassword);
	}

	validate(apiFormChangePassword: TApiFormChangePassword, errors: TApiFormChangePassword, inclusive: boolean = false): TApiFormChangePassword {
		this.setError(errors, inclusive, apiFormChangePassword, DaoApiFormChangePassword.pPasswordPrevious, p => Validate.password(p));

		const errorId = Validate.passwordsEqual(
			apiFormChangePassword[DaoApiFormChangePassword.pPasswordNext],
			apiFormChangePassword[DaoApiFormChangePassword.pPasswordConfirmNext]
		);

		errors[DaoApiFormChangePassword.pPasswordNext] = errorId;
		errors[DaoApiFormChangePassword.pPasswordConfirmNext] = errorId;

		// The passwordNext and passwordConfirmNext not set errors have precedence over the passwords not equal error
		this.setError(errors, inclusive, apiFormChangePassword, DaoApiFormChangePassword.pPasswordNext, p => Validate.password(p));
		this.setError(errors, inclusive, apiFormChangePassword, DaoApiFormChangePassword.pPasswordConfirmNext, p => Validate.password(p));

		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefChangePassword = TApiFormDef<TApiFormChangePassword>;

const apiFormDefChangePassword: TApiFormDefChangePassword = new ApiFormDefChangePassword();
export default apiFormDefChangePassword;