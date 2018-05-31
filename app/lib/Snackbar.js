/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25-May-18 © **/
import RNSnackbar from 'react-native-snackbar';
import {Colors} from '../Config';
import {Validator} from './helpers/Validator';
import Maps from "./data/Maps";
import type {TApiException} from "./daos/DaoApiException";
import DaoApiException from "./daos/DaoApiException";

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