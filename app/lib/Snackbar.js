/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25-May-18 © **/
import {Snackbar as RNSnackbar} from 'react-native-snackbar';
import {Colors} from "../Config";
import {Validate} from "./helpers/Validator";

export class Snackbar {

	static showErrorStr(message: String) {
		RNSnackbar.show({
			title: message,
			duration: RNSnackbar.LENGTH_SHORT,
			color: Colors.alertRed
		});
	}

	static showErrorCode(errorCode: number) {
		this.showErrorStr(Validate.mapErrorCodeToMessage(errorCode));
	}


}