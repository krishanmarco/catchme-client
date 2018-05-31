/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from './ApiClient';
import Logger from '../Logger';
import MD5 from 'md5';
import RSAKey from '../react-native-rsa/rsa';
import {Const} from '../../Config';
import {hex2b64} from '../react-native-rsa/base64';


// AUTHORIZATION TOKEN UNENCRYPTED
// {
//    pId:     The pId of the user
//    key:    hash of this users API key
// }
class ApiAuthentication {

	constructor() {
		this.userId = -1;
		this.apiKey = '';
		this.invalidateAuthenticationToken();
		this.simpleAuthToken = this._createToken();
	}

	async update(userId, apiKey) {
		this.userId = userId;
		this.apiKey = apiKey;
		this.invalidateAuthenticationToken();
		return ApiClient.authenticateFirebase();
	}

	invalidateAuthenticationToken() {
		this.userAuthToken = null;
	}

	// Used to get an authentication token for this specific user
	// Returns a promise because we need to sync with the servers
	// timestamp so this function has to be asynchronous
	async getUserAuthenticationToken() {

		if (this.userAuthToken !== null) {
			// userAuthToken is still valid no need
			// to recalculate it so call the callback immediately
			Logger.v('ApiAuthentication getUserAuthenticationToken: found valid token');
			return Promise.resolve(this.userAuthToken);
		}

		// No local timestamp,  Request server timestamp
		this.userAuthToken = this._createToken(this.userId, this.apiKey, await ApiClient.time());
		return this.userAuthToken;
	}


	// Used to get an authentication token for the generic app
	// as an anonymous user, this is not asynchronous so it
	// directly returns the result
	getSimpleAuthenticationToken() {
		return this.simpleAuthToken;
	}

	_createToken(userId = -1, apiKey = '', serverTimestamp = '') {

		const rsa = new RSAKey();
		rsa.setPublic(Const.apiAuthRSAN, Const.apiAuthRSAE);

		const key = MD5(serverTimestamp + apiKey);
		const json = JSON.stringify({id: userId, key});
		const encrypted = rsa.encrypt(json);

		return hex2b64(encrypted);
	}

}

const _ApiAuthentication = new ApiAuthentication();
export default _ApiAuthentication;
