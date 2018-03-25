/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../data/ApiClient";
import ApiFormDef from "./ApiFormDef";
import {FORM_API_ID_CHANGE_PASSWORD, ReduxPoolApiForms} from "../../../redux/ReduxPool";
import {Validate} from "../../helpers/Validator";
import type {TApiFormChangePassword} from "../../daos/DaoApiFormChangePassword";
import DaoApiFormChangePassword from "../../daos/DaoApiFormChangePassword";
import type {TApiFormDef} from "./ApiFormDef";

// Declare form definition
class ApiFormDefChangePassword extends ApiFormDef<TApiFormChangePassword> {

	constructor() {
		super(FORM_API_ID_CHANGE_PASSWORD, true);
	}

	initState() {
		return new ReduxPoolApiForms(this.formId, DaoApiFormChangePassword.newInstance());
	}

	post(apiFormChangePassword: TApiFormChangePassword): Promise<TApiFormChangePassword> {
		return ApiClient.accountsChangePassword(apiFormChangePassword);
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