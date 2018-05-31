/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-May-18 © **/
import DaoApiException from '../daos/DaoApiException';
import Maps from './Maps';
import type {TApiException} from '../daos/DaoApiException';

// This class should handle all ApiExceptions
// It also encodes whether or not they will show a toast
// If an exception occurs after the exception response it is
// Not in this classes responsibilities
export default class ApiExceptionHandler {
	static exUnknownStatus = DaoApiException.newInstance(Maps.rCodes.r_ex_unknown_status_code.id);
	static exInvalidApiKey = DaoApiException.newInstance(Maps.rCodes.r_ex_invalid_api_key.id);

	static async onApiExceptionCatch(exception: TApiException): Promise {
		const rCode = Maps.errorIdToRCode(DaoApiException.gErrorCode(exception));

		switch (rCode.id) {
			// Run actions which should be applied to all cases
			// Where a certain error code has been returned
		}

		return Promise.reject(exception);
	}

}