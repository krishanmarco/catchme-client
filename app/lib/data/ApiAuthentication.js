/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const} from '../../Config';

import ApiClient from './ApiClient';

import RSAKey from '../react-native-rsa/rsa';
import {hex2b64} from '../react-native-rsa/base64';
import MD5 from 'md5';




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


  update(userId, apiKey) {
    this.userId = userId;
    this.apiKey = apiKey;
    this.invalidateAuthenticationToken();
  }


  invalidateAuthenticationToken() {
    this.userAuthToken = null;
  }


  // Used to get an authentication token for this specific user
  // Returns a promise because we need to sync with the servers
  // timestamp so this function has to be asynchronous
  getUserAuthenticationToken() {

    if (this.userAuthToken !== null) {
      // userAuthToken is still valid no need
      // to recalculate it so call the callback immediately
      console.log("ApiAuthentication getUserAuthenticationToken: ApiAuthentication found valid token");
      return Promise.resolve(this.userAuthToken);
    }


    // No local timestamp,  Request server timestamp
    return ApiClient.time()
        .then(serverTimestamp => {
          this.userAuthToken = this._createToken(this.userId, this.apiKey, serverTimestamp);
          return this.userAuthToken;
        });
  }


  // Used to get an authentication token for the generic app
  // as an anonymous user, this is not asynchronous so it
  // directly returns the result
  getSimpleAuthenticationToken() {
    return this.simpleAuthToken;
  }


  _createToken(userId = -1, apiKey = '', serverTimestamp = '') {

    let rsa = new RSAKey();
    rsa.setPublic(Const.ApiAuthentication.RSA_N, Const.ApiAuthentication.RSA_E);

    let key = MD5(serverTimestamp + apiKey);
    let json = JSON.stringify({id: userId, key: key});
    let encrypted = rsa.encrypt(json);

    return hex2b64(encrypted);
  }


}

const _ApiAuthentication = new ApiAuthentication();
export default _ApiAuthentication;
