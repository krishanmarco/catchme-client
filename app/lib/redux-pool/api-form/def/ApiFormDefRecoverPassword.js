/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import ApiFormDef from "../ApiFormDef";
import {ApiFormState} from "../ApiFormModel";
import {Validate} from "../../../helpers/Validator";
import type {TApiFormRecoverPassword} from "../../../daos/DaoApiFormRecoverPassword";
import type {TApiFormDef} from "../ApiFormDef";
import type {TThunk} from "../../../types/Types";
import DaoApiFormRecoverPassword from "../../../daos/DaoApiFormRecoverPassword";

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
		return ApiClient.accountsChangePassword(apiFormRecoverPassword);	// todo
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