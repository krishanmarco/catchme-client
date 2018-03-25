/* eslint-disable no-multi-spaces */
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
/* eslint-disable key-spacing */

const errorStrings = [
	/** 0   return_ok **/                                     '',
	/** -1  return_error_generic **/                          'Generic error',
	/** -2  return_error_form **/                          		'Form error',
	/** -3  return_error_not_allowed **/                      'You are not allowed to do that',
	/** -4  return_error_email_taken **/                      'There is already an account with this email',
	/** -5  return_error_user_not_found **/                   'This user was not found',
	/** -6  return_error_incorrect_password **/               'Wrong password',
	/** -7  return_error_user_banned **/                      'This user has been banned',
	/** -8  return_error_file_upload_failed **/               'The file upload failed',
	/** -9  return_error_invalid_social_token **/             'Something wen\'t wrong',
	/** -10  return_error_field_invalid **/                   'This field was not valid',
	/** -11 return_error_field_not_set**/                     'Please fill this field',
	/** -12 return_error_field_length **/                     'The length of this field is invalid',
	/** -13 return_error_field_length_short **/               'This field is too short',
	/** -14 return_error_field_length_long **/                'This field is too long',
	/** -15 return_error_field_phone **/                      'Please insert a valid phone number',
	/** -16 return_error_field_email **/                      'Please insert a valid email',
	/** -17 return_error_field_url **/                        'That URL was not valid',
	/** -18 return_error_field_country **/                    'Please insert a valid country',
	/** -19 return_error_passwords_not_equal **/              'The two passwords do not match',
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
};


export class Validate {

	static mapErrorCodeToMessage(errorCode: number): string {
		return errorStrings[errorCode * -1];
	}


	static string(value: string, min: number, max: number): string {
		if (value == null)
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

