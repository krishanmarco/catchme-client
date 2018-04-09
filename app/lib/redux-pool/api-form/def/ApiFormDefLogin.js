/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import type {TApiFormDef} from "../ApiFormDef";
import ApiFormDef from "../ApiFormDef";
import {Validate} from "../../../helpers/Validator";
import type {TApiFormLogin} from "../../../daos/DaoApiFormLogin";
import DaoApiFormLogin from "../../../daos/DaoApiFormLogin";
import {ApiFormState} from "../ApiFormModel";
import type {TThunk} from "../../../types/Types";

export const FORM_API_ID_LOGIN = 'FORM_API_ID_LOGIN';

// Declare form definition
class ApiFormDefLogin extends ApiFormDef<TApiFormLogin> {

	constructor() {
		super(FORM_API_ID_LOGIN, true, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoApiFormLogin.newInstance());
	}

	post(thunk: TThunk, apiFormLogin: TApiFormLogin): Promise<TApiFormLogin> {
		return ApiClient.accountsLogin(apiFormLogin);
	}

	validate(apiFormLogin: TApiFormLogin, errors: TApiFormLogin, inclusive: boolean = false): TApiFormLogin {
		this.setError(errors, inclusive, apiFormLogin, DaoApiFormLogin.pEmail, e => Validate.email(e));
		this.setError(errors, inclusive, apiFormLogin, DaoApiFormLogin.pPassword, p => Validate.password(p));
		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefLogin = TApiFormDef<TApiFormLogin>;

const apiFormDefLogin: TApiFormDefLogin = new ApiFormDefLogin();
export default apiFormDefLogin;
