/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import ApiFormDef from "../ApiFormDef";
import {Validate} from "../../../helpers/Validator";
import DaoApiFormLogin from "../../../daos/DaoApiFormLogin";
import type {TApiFormLogin} from "../../../daos/DaoApiFormLogin";
import type {TApiFormDef} from "../ApiFormDef";
import {FORM_API_ID_LOGIN} from "../ApiFormPool";
import {ApiFormState} from "../ApiFormModel";

// Declare form definition
class ApiFormDefLogin extends ApiFormDef<TApiFormLogin> {

	constructor() {
		super(FORM_API_ID_LOGIN, true, true);
		this.initState = this.initState.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoApiFormLogin.newInstance());
	}

	post(apiFormLogin: TApiFormLogin): Promise<TApiFormLogin> {
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
