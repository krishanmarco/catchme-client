/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 24-Mar-18 © **/
import _ from 'lodash';
import {denormObj} from "../HelperFunctions";


export type TApiFormRecoverPassword = {
	email: string,
};


export default class DaoApiFormRecoverPassword {
	static pEmail = 'email';

	static newInstance(): TApiFormRecoverPassword {
		return denormObj({
			[DaoApiFormRecoverPassword.pEmail]: '',
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************

	static gEmail(apiFormLogin: TApiFormRecoverPassword) {
		return _.get(apiFormLogin, DaoApiFormRecoverPassword.pEmail);
	}

}