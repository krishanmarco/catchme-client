/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {denormObj} from '../HelperFunctions';
import Maps from "../data/Maps";

export type TApiException = {
	errorCode: number,            // 1                            Api error
	errors: Object,               // {field: errorCode, ...}      If a form was posted the field results are in this object
	logMessage: ?string,          // 'What went wrong'            The error message, null in production
	_: ?string,                   // '{ex code} {ex mess}'        Server exception code and message, null in production
};

export default class DaoApiException {
	static pErrorCode = 'errorCode';
	static pErrors = 'errors';
	static pLogMessage = 'logMessage';
	static p_ = '_';

	static newInstance(errorCode: number, errors: ?Object = {}, logMessage: ?string): DaoApiException {
		return denormObj({
			[DaoApiException.pErrorCode]: errorCode,
			[DaoApiException.errors]: errors,
			[DaoApiException.pLogMessage]: logMessage
		});
	}

	static gErrorCode(exception: TApiException): number {
		return _.get(exception, DaoApiException.pErrorCode, Maps.rCodes.r_err_generic.id);
	}

	static gErrors(exception: TApiException): number {
		return _.get(exception, DaoApiException.pErrors, {});
	}

	static gLogMessage(exception: TApiException): boolean {
		return _.get(exception, DaoApiException.pLogMessage, null);
	}

	static g_(exception: TApiException): string {
		return _.get(exception, DaoApiException.p_, null);
	}

}