/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 24-Mar-18 © **/
import _ from 'lodash';
import {denormObj} from "../HelperFunctions";


export type TApiFormChangePassword = {
	passwordPrevious: string,
	passwordNext: string,
	passwordConfirmNext: string
};


export default class DaoApiFormChangePassword {
	static pPasswordPrevious = 'passwordPrevious';
	static pPasswordNext = 'passwordNext';
	static pPasswordConfirmNext = 'passwordConfirmNext';

	static newInstance(): TApiFormChangePassword {
		return denormObj({
			[DaoApiFormChangePassword.pPasswordPrevious]: '',
			[DaoApiFormChangePassword.pPasswordNext]: '',
			[DaoApiFormChangePassword.pPasswordConfirmNext]: ''
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************

	static gPasswordPrevious(apiFormLogin: TApiFormChangePassword) {
		return _.get(apiFormLogin, DaoApiFormChangePassword.pPasswordPrevious);
	}

	static gPasswordNext(apiFormLogin: TApiFormChangePassword) {
		return _.get(apiFormLogin, DaoApiFormChangePassword.pPasswordNext);
	}

	static gPasswordConfirm(apiFormLogin: TApiFormChangePassword) {
		return _.get(apiFormLogin, DaoApiFormChangePassword.pPasswordConfirmNext);
	}

}