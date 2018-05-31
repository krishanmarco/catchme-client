/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25-May-18 © **/
import DaoApiException from './daos/DaoApiException';
import Maps from './data/Maps';
import RNSnackbar from 'react-native-snackbar';
import {Colors} from '../Config';
import {Validator} from './helpers/Validator';
import type {TApiException} from './daos/DaoApiException';

export class Snackbar {

	static showErrorStr(message: String) {
		RNSnackbar.show({
			title: message,
			duration: RNSnackbar.LENGTH_SHORT,
			backgroundColor: Colors.alertRed
		});
	}

	static showErrorCode(errorCode: number) {
		Snackbar.showErrorStr(Maps.errorIdToString(errorCode));
	}

	static showApiException(apiException: TApiException) {
		Snackbar.showErrorCode(DaoApiException.gErrorCode(apiException));
	}

	static showSuccessStr(message: String) {
		RNSnackbar.show({
			title: message,
			duration: RNSnackbar.LENGTH_SHORT,
			backgroundColor: Colors.primary
		});
	}

	static showWarningStr(message: String) {
		RNSnackbar.show({
			title: message,
			duration: RNSnackbar.LENGTH_SHORT,
			backgroundColor: Colors.neutralOrange
		});
	}


}