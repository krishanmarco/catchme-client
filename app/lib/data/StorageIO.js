/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../daos/DaoUser';
import {AsyncStorage} from 'react-native';
import type {TUser} from '../daos/DaoUser';

export default class StorageIO {
	static KEY_LOCAL_USER = 'LocalUser';

	static setLocalUser(user: TUser): Promise {
		const newUser = DaoUser.apiClean(user);
		newUser.expiryTs = -1;

		return AsyncStorage.setItem(StorageIO.KEY_LOCAL_USER, JSON.stringify(newUser), (error) => {
			// todo
		});
	}
	
	static removeLocalUser(): Promise {
		return AsyncStorage.removeItem(StorageIO.KEY_LOCAL_USER, (error) => {
			// todo
		});
	}
	
	static getLocalUser(): Promise<?TUser> {
		return AsyncStorage.getItem(StorageIO.KEY_LOCAL_USER, (error) => {
			// todo
		}).then(userStr => JSON.parse(userStr));
	}

}
