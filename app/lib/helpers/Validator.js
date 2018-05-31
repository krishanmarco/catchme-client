/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import _ from 'lodash';
import Maps from "../data/Maps";

export class Validator {

	// If fields is set hasErrors only returns true if the
	// fields in {fields} have errors, else it evaluates
	// all the fields in {errors}
	static hasErrors(errors: Object, fields: ?Array<String> = null): boolean {
		if (fields == null) {
			return !Object.keys(errors).reduce((prev, key) => prev && _.get(errors, key) == 0, true);
		}

		return !fields.reduce((prev, key) => prev && (!(key in errors) || _.get(errors, key) == 0), true);
	}

	static string(value: string, min: number, max: number): string {
		if (value == null || value.length <= 0)
			return Maps.rCodes.r_err_fld_not_set.id;

		if (min && value.length < min)
			return Maps.rCodes.r_err_fld_length_short.id;

		if (max && value.length > max)
			return Maps.rCodes.r_err_fld_length_long.id;

		return Maps.rCodes.r_ok.id;
	}

	static phone(value: string) {
		return Validator.string(value, 5, 15);
	}

	static password(value: string) {
		return Validator.string(value, 3, 100);
	}


	static passwordsEqual(password1: string, password2: string) {
		if (password1 != password2)
			return Maps.rCodes.r_err_passwords_not_equal.id;

		return Maps.rCodes.r_ok.id;
	}


	static countryCode(value: string): string {
		return Validator.string(value, 2, 2);
	}

	static email(value: string): string {
		const validateString = Validator.string(value, 3, 254);

		if (validateString !== Maps.rCodes.r_ok.id)
			return validateString;

		if (value.indexOf('@') == -1)
			return Maps.rCodes.r_err_fld_email.id;

		return Maps.rCodes.r_ok.id;
	}

	static number(value: number, min: number, max: number): string {
		if (value == null)
			return Maps.rCodes.r_err_fld_not_set.id;

		if (min && value < min)
			return Maps.rCodes.r_err_fld_length_short.id;

		if (max && value > max)
			return Maps.rCodes.r_err_fld_length_long.id;

		return Maps.rCodes.r_ok.id;
	}

}

