/* eslint-disable no-multi-spaces */
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
/* eslint-disable key-spacing */

const errorStrings = [
	/** 0   return_ok **/                                     '',
	/** -1  return_error_generic **/                          'Generic error',
	/** -2  return_error_not_allowed **/                      'You are not allowed to do that',
	/** -3  return_error_email_taken **/                      'There is already an account with this email',
	/** -4  return_error_user_not_found **/                   'This user was not found',
	/** -5  return_error_incorrect_password **/               'Wrong password',
	/** -6  return_error_user_banned **/                      'This user has been banned',
	/** -7  return_error_file_upload_failed **/               'The file upload failed',
	/** -8  return_error_invalid_social_token **/             'Something wen\'t wrong',
	/** -9  return_error_field_invalid **/                    'This field was not valid',
	/** -10 return_error_field_not_set**/                     'You have to fill this field',
	/** -11 return_error_field_length **/                     'This field was not valid',
	/** -12 return_error_field_phone **/                      'Please insert a valid phone number',
	/** -13 return_error_field_email **/                      'Please insert a valid email',
	/** -14 return_error_field_url **/                        'That URL was not valid',
	/** -15 return_error_field_country **/                    'Please insert a valid country',
];

const errorIds = {
	return_ok: 0,
	return_error_generic: -1,
	return_error_not_allowed: -2,
	return_error_email_taken: -3,
	return_error_user_not_found: -4,
	return_error_incorrect_password: -5,
	return_error_user_banned: -6,
	return_error_file_upload_failed: -7,
	return_error_invalid_social_token: -8,
	return_error_field_invalid: -9,
	return_error_field_not_set: -10,
	return_error_field_length: -11,
	return_error_field_phone: -12,
	return_error_field_email: -13,
	return_error_field_url: -14,
	return_error_field_country: -15,
};


export class Validate {

	static mapErrorCodeToMessage(errorCode: number): string {
		return errorStrings[errorCode];
	}


	static string(value: string, min: number, max: number): string {
		if (value == null)
			return errorIds.return_error_field_not_set;

		if ((min && value.length < min) || (max && value.length > max))
			return errorIds.return_error_field_length;

		return errorIds.return_ok;
	}

	static email(value: string): string {
		const validateString = Validate.string(value, 3, 254);

		if (validateString !== errorIds.return_ok)
			return validateString;

		if (!validateString.includes('@'))
			return errorIds.return_error_field_email;

		return errorIds.return_ok;
	}

	static number(value: number, min: number, max: number): string {
		if (value == null)
			return errorIds.return_error_field_not_set;

		if ((min && value < min) || (max && value > max))
			return errorIds.return_error_field_length;

		return errorIds.return_ok;
	}

}

