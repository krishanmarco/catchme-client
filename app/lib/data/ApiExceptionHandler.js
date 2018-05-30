/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-May-18 © **/
import type {TApiException} from "../daos/DaoApiException";

// This class should handle all ApiExceptions
// It also encodes whether or not they will show a toast
// If an exception occurs after the exception response it is
// Not in this classes responsibilities
export default class ApiExceptionHandler {

	static async onApiExceptionCatch(exception: TApiException): Promise {
		return Promise.reject(exception);
	}

}