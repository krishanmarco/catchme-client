/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 24-Mar-18 © **/
import _ from 'lodash';
import {denormObj} from "../HelperFunctions";


export type TApiFormLogin = {
	email: string,
	password: string
};


export default class DaoApiFormLogin {
	static pEmail = 'email';
	static pPassword = 'password';

	static newInstance(): TApiFormLogin {
		// development remove
		return denormObj({
			[DaoApiFormLogin.pEmail]: 'krishanmarco@outlook.com',
			[DaoApiFormLogin.pPassword]: 'MomrpdrbrM93'
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************

	static gEmail(apiFormLogin: TApiFormLogin) {
		return _.get(apiFormLogin, DaoApiFormLogin.pEmail);
	}

	static gPassword(apiFormLogin: TApiFormLogin) {
		return _.get(apiFormLogin, DaoApiFormLogin.pPassword);
	}

}