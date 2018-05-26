/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25-May-18 © **/
import {Colors} from '../Config';
import RNSnackbar from 'react-native-snackbar';
import {Validate} from './helpers/Validator';
// todo ui: color not working
export class Snackbar {

	static showErrorStr(message: String) {
		RNSnackbar.show({
			title: message,
			duration: RNSnackbar.LENGTH_SHORT,
			color: Colors.alertRed
		});
	}

	static showErrorCode(errorCode: number) {
		Snackbar.showErrorStr(Validate.mapErrorCodeToMessage(errorCode));
	}

	static showSuccessStr(message: String) {
		RNSnackbar.show({
			title: message,
			duration: RNSnackbar.LENGTH_SHORT,
			color: Colors.primary
		});
	}


}