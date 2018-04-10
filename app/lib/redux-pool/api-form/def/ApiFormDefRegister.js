/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import ApiFormDef from "../ApiFormDef";
import DaoApiFormRegister from "../../../daos/DaoApiFormRegister";
import {ApiFormState} from "../ApiFormModel";
import {Validate} from "../../../helpers/Validator";
import type {TApiFormDef} from "../ApiFormDef";
import type {TApiFormRegister} from "../../../daos/DaoApiFormRegister";
import type {TThunk} from "../../../types/Types";

export const FORM_API_ID_REGISTER = 'FORM_API_ID_REGISTER';

// Declare form definition
class ApiFormDefChangePassword extends ApiFormDef<TApiFormRegister> {

	constructor() {
		super(FORM_API_ID_REGISTER, true);
		this.initState = this.initState.bind(this);
		this.post = this.post.bind(this);
		this.validate = this.validate.bind(this);
	}

	initState() {
		return new ApiFormState(this.formId, DaoApiFormRegister.newInstance());
	}

	post(thunk: TThunk, apiFormRegister: TApiFormRegister): Promise<TApiFormRegister> {
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
