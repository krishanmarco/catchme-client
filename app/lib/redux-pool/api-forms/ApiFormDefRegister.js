/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../data/ApiClient";
import ApiFormDef from "./ApiFormDef";
import {FORM_API_ID_REGISTER, ReduxPoolApiForms} from "../../../redux/ReduxPool";
import {Validate} from "../../helpers/Validator";
import type {TApiFormRegister} from "../../daos/DaoApiFormRegister";
import DaoApiFormRegister from "../../daos/DaoApiFormRegister";
import type {TApiFormDef} from "./ApiFormDef";

// Declare form definition
class ApiFormDefChangePassword extends ApiFormDef<TApiFormRegister> {

	constructor() {
		super(FORM_API_ID_REGISTER, true);
	}

	initState() {
		return new ReduxPoolApiForms(this.formId, DaoApiFormRegister.newInstance());
	}

	post(apiFormRegister: TApiFormRegister): Promise<TApiFormRegister> {
		return ApiClient.accountsRegister(apiFormRegister);
	}

	validate(apiFormRegister: TApiFormRegister, errors: TApiFormRegister, inclusive: boolean = false): TApiFormRegister {
		this.setError(errors, inclusive, apiFormRegister, DaoApiFormRegister.pName, n => Validate.string(n, 3, 100));
		this.setError(errors, inclusive, apiFormRegister, DaoApiFormRegister.pEmail, e => Validate.email(e));

		const errorId = Validate.passwordsEqual(
			apiFormRegister[DaoApiFormRegister.pPassword],
			apiFormRegister[DaoApiFormRegister.pPasswordConfirm]
		);

		errors[DaoApiFormRegister.pPassword] = errorId;
		errors[DaoApiFormRegister.pPasswordConfirm] = errorId;

		// The password and passwordConfirm not set errors have precedence over the passwords not equal error
		this.setError(errors, inclusive, apiFormRegister, DaoApiFormRegister.pPassword, p => Validate.password(p));
		this.setError(errors, inclusive, apiFormRegister, DaoApiFormRegister.pPasswordConfirm, p => Validate.password(p));

		return errors;
	}

}

// Declare form sub-type
export type TApiFormDefRegister = TApiFormDef<TApiFormRegister>;

const apiFormDefRegister: TApiFormDefRegister = new ApiFormDefChangePassword();
export default apiFormDefRegister;