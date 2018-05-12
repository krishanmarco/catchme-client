/* eslint-disable no-multi-spaces */
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
/* eslint-disable key-spacing */

import {t} from "../i18n/Translations";

const errorStrings = [
	/** 0   return_ok **/                                     '',
	/** -1  return_error_generic **/                          t('t_e_generic_error'),
	/** -2  return_error_form **/                          		t('t_e_form_error'),
	/** -3  return_error_not_allowed **/                      t('t_e_not_allowed'),
	/** -4  return_error_email_taken **/                      t('t_e_email_taken'),
	/** -5  return_error_user_not_found **/                   t('t_e_user_not_found'),
	/** -6  return_error_incorrect_password **/               t('t_e_wrong_password'),
	/** -7  return_error_user_banned **/                      t('t_e_user_banned'),
	/** -8  return_error_file_upload_failed **/               t('t_e_upload_failed'),
	/** -9  return_error_invalid_social_token **/             t('t_e_invalid_social_token'),
	/** -10  return_error_field_invalid **/                   t('t_e_field_invalid'),
	/** -11 return_error_field_not_set**/                     t('t_e_field_not_set'),
	/** -12 return_error_field_length **/                     t('t_e_field_length_invalid'),

	/** -13 return_error_field_length_short **/               t('t_e_field_length_short'),
	/** -14 return_error_field_length_long **/                t('t_e_field_length_long'),
	/** -15 return_error_field_phone **/                      t('t_e_field_phone'),
	/** -16 return_error_field_email **/                      t('t_e_field_email'),
	/** -17 return_error_field_url **/                        t('t_e_field_url'),
	/** -18 return_error_field_country **/                    t('t_e_field_country'),
	/** -19 return_error_passwords_not_equal **/              t('t_e_passwords_not_equal'),
	/** -20 return_error_incorrect_recovery_key **/           t('t_e_incorrect_recovery_key'),
];

const errorIds = {
	return_ok: 0,
	return_error_generic: -1,
	return_error_form: -2,
	return_error_not_allowed: -3,
	return_error_email_taken: -4,
	return_error_user_not_found: -5,
	return_error_incorrect_password: -6,
	return_error_user_banned: -7,
	return_error_file_upload_failed: -8,
	return_error_invalid_social_token: -9,
	return_error_field_invalid: -10,
	return_error_field_not_set: -11,
	return_error_field_length: -12,
	return_error_field_length_short: -13,
	return_error_field_length_long: -14,
	return_error_field_phone: -15,
	return_error_field_email: -16,
	return_error_field_url: -17,
	return_error_field_country: -18,
	return_error_passwords_not_equal: -19,
	return_error_incorrect_recovery_key: -20,
};


export class Validate {

	static mapErrorCodeToMessage(errorCode: number): string {
		return errorStrings[errorCode * -1];
	}


	static string(value: string, min: number, max: number): string {
		if (value == null || value.length <= 0)
			return errorIds.return_error_field_not_set;

		if (min && value.length < min)
			return errorIds.return_error_field_length_short;

		if (max && value.length > max)
			return errorIds.return_error_field_length_long;

		return errorIds.return_ok;
	}

	static phone(value: string) {
		return Validate.string(value, 5, 15);
	}

	static password(value: string) {
		return Validate.string(value, 3, 100);
	}


	static passwordsEqual(password1: string, password2: string) {
		if (password1 != password2)
			return errorIds.return_error_passwords_not_equal;

		return errorIds.return_ok;
	}


	static countryCode(value: string): string {
		return Validate.string(value, 2, 2);
	}

	static email(value: string): string {
		const validateString = Validate.string(value, 3, 254);

		if (validateString !== errorIds.return_ok)
			return validateString;

		if (value.indexOf('@') == -1)
			return errorIds.return_error_field_email;

		return errorIds.return_ok;
	}

	static number(value: number, min: number, max: number): string {
		if (value == null)
			return errorIds.return_error_field_not_set;

		if (min && value < min)
			return errorIds.return_error_field_length_short;

		if (max && value > max)
			return errorIds.return_error_field_length_long;

		return errorIds.return_ok;
	}

}

