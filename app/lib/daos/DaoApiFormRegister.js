/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 24-Mar-18 © **/
import _ from 'lodash';
import {denormObj} from "../HelperFunctions";


export type TApiFormRegister = {
	name: string,
	email: string,
	password: string,
	passwordConfirm: string
};


export default class DaoApiFormRegister {
	static pName = 'name';
	static pEmail = 'email';
	static pPassword = 'password';
	static pPasswordConfirm = 'passwordConfirm';
	static pPublicMessage = 'publicMessage';

	static newInstance(): TApiFormRegister {
		return denormObj({
			[DaoApiFormRegister.pName]: '',
			[DaoApiFormRegister.pEmail]: '',
			[DaoApiFormRegister.pPassword]: '',
			[DaoApiFormRegister.pPasswordConfirm]: '',
			[DaoApiFormRegister.pPublicMessage]: 'Hey! I\'m on Catch me too!',
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************

	static gName(apiFormRegister: TApiFormRegister) {
		return _.get(apiFormRegister, DaoApiFormRegister.pName);
	}

	static gEmail(apiFormRegister: TApiFormRegister) {
		return _.get(apiFormRegister, DaoApiFormRegister.pEmail);
	}

	static gPassword(apiFormRegister: TApiFormRegister) {
		return _.get(apiFormRegister, DaoApiFormRegister.pPassword);
	}

	static gPasswordConfirm(apiFormRegister: TApiFormRegister) {
		return _.get(apiFormRegister, DaoApiFormRegister.pPasswordConfirm);
	}

}
