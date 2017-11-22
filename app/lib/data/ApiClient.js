/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const, Urls} from '../../Config';
import {seconds} from "../HelperFunctions";
import ApiAuthentication from './ApiAuthentication';
import RealmIO from './RealmIO';
import RNFetchBlob from 'react-native-fetch-blob';
import DaoLocation from "../daos/DaoLocation";


class ApiClient {

  constructor() {
    this.api401Attempts = 0;
    this._handleResponse = this._handleResponse.bind(this);
    this._get = this._get.bind(this);
    this._post = this._post.bind(this);
    this._postMultipart = this._postMultipart.bind(this);
    this._onUserLogin = this._onUserLogin.bind(this);
  }


  _handleResponse(response, url, callbackRetryRequest) {

    // CASE 1, status == 200
    if (response.status === 200) {

      // Request is successful, reset the failed counter
      this.api401Attempts = 0;

      console.log(`ApiClient _handleResponse: status(200) for ${url}`);
      return Promise.resolve(response.text());
    }



    // CASE 3, status == 401
    if (response.status === 401) {
      console.log(`ApiClient _handleResponse: status(401[${this.api401Attempts}]) for ${url}`);

      // Request is unsuccessful, increment the failed counter
      this.api401Attempts++;

      ApiAuthentication.invalidateAuthenticationToken();

      if (this.api401Attempts > Const.ApiClient.maxApi401) {
        // This request has been unauthorized too many times
        console.log("ApiClient _handleResponse: Too many [401], terminating request retry-loop");

        // Reset the 401 request counter
        this.api401Attempts = 0;
        return Promise.reject();
      }

      return callbackRetryRequest();
    }



    // CASE 2, status == 500
    if (response.status === 500) {
      console.log(`ApiClient _handleResponse: status(500) for ${url}`);

      return response.text()
          .then(json => {
            let apiException = JSON.parse(json);
            console.log(apiException);
            return Promise.reject(apiException);
          });
    }


    // CASE 2, status UNKNOWN
    console.log(`ApiClient _handleResponse: status(${response.status}) for ${url}`);
    return Promise.reject(0);
  }




  _get(url) {
    console.log(`ApiClient _get: Requesting auth-token for ${url}`);

    return ApiAuthentication.getUserAuthenticationToken()
        .then(authenticationToken => {
          console.log("ApiClient _get: Using auth-token " + authenticationToken);

          return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": authenticationToken
            }
          });

        })
        .then(response => this._handleResponse(response, url, () => this._get(url)));
  }




  _post(url, body) {
    console.log(`ApiClient _post: Requesting auth-token for ${url}`);

    return ApiAuthentication.getUserAuthenticationToken()
        .then(authenticationToken => {
          console.log(`ApiClient _post: Using auth-token ${authenticationToken}`);

          return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": authenticationToken
            },
            body: JSON.stringify(body)
          });

        })
        .then(response => this._handleResponse(response, url, () => this._post(url, body)));
  }




  _postMultipart(url, formData) {
    console.log(`ApiClient _postFile: Requesting auth-token for ${url}`);

    return ApiAuthentication.getUserAuthenticationToken()
        .then(authenticationToken => {
          console.log(`ApiClient _postFile: Using auth-token ${authenticationToken}`);

          return RNFetchBlob.fetch('POST', url,
              {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                "Authorization": authenticationToken
              },
              formData
          );
        })
        .then(response => this._handleResponse(response, url, () => this._postMultipart(url, formData)));
  }




  time(callback) {
    return fetch(Urls.api + '/meta/time')
        .then(response => response.text().then(callback))
        .catch(error => console.error(error));
  }





  _onUserLogin(userProfileJson) {
    return Promise.resolve(userProfileJson)
        .then(json => JSON.parse(json))
        .then(userData => {
          RealmIO.setLocalUser(userData);
          return userData;
        });
  }

  accountsRegister(formUserRegister) {
    return this._post(`${Urls.api}/accounts/register`, formUserRegister)
        .then(this._onUserLogin);
  }

  accountsLogin(formUserLogin) {
    return this._post(`${Urls.api}/accounts/login`, formUserLogin)
        .then(this._onUserLogin);
  }

  accountsLoginFacebook(accessToken) {
    return this._post(`${Urls.api}/accounts/login/facebook`, {token: accessToken})
        .then(this._onUserLogin);
  }

  accountsLoginGoogle(accessToken) {
    return this._post(`${Urls.api}/accounts/login/google`, {token: accessToken})
        .then(this._onUserLogin);
  }

  accountsLoginTwitter(accessToken) {
    return this._post(`${Urls.api}/accounts/login/twitter`, {token: accessToken})
        .then(this._onUserLogin);
  }



  userFirebaseJwt() {
    return this._get(`${Urls.api}/user/firebase-jwt`);
  }

  userProfile() {
    return this._get(Urls.api + '/user/profile')
        .then(json => JSON.parse(json));
  }

  userProfileEdit(userData, filePath = null) {
    const formData = Object.keys(userData)
        .map(key => ({name: key, data: userData[key]}));

    if (filePath != null) {
      const n = seconds().toString();
      formData.push({name: n, filename: n, data: RNFetchBlob.wrap(filePath)});
    }

    return this._postMultipart(`${Urls.api}/user/profile/edit`, formData)
        .then(json => JSON.parse(json));
  }

  userConnectionsAddUid(uid) {
    return this._get(Urls.api + '/user/pConnections/add/' + uid);
  }

  userConnectionsAcceptUid(uid) {
    return this._get(Urls.api + '/user/pConnections/accept/' + uid);
  }

  userConnectionsBlockUid(uid) {
    return this._get(Urls.api + '/user/pConnections/block/' + uid);
  }

  userStatusAdd(status) {
    return this._post(`${Urls.api}/user/status/add`, status);
  }

  userStatusDel(statusId) {
    return this._get(`${Urls.api}/user/status/del/${statusId}`);
  }

  userLocationsFavoritesAdd(locationId) {
    return this._get(`${Urls.api}/user/locations/favorites/add/${locationId}`);
  }

  userLocationsFavoritesDel(locationId) {
    return this._get(`${Urls.api}/user/locations/favorites/del/${locationId}`);
  }

  userLocationsAdminEditLid(locationData, filePath = null) {
    const formData = Object.keys(locationData)
        .map(key => ({name: key, data: locationData[key]}));

    if (filePath != null) {
      const n = seconds().toString();
      formData.push({name: n, filename: n, data: RNFetchBlob.wrap(filePath)});
    }

    const url = `${Urls.api}/user/locations/administrating/edit/${DaoLocation.gId(locationData)}`;
    return this._postMultipart(url, formData)
        .then(json => JSON.parse(json));
  }



  usersGetUidProfile(uid) {
    return this._get(Urls.api + '/users/' + uid + '/profile')
        .then(json => JSON.parse(json));
  }

  locationsGetLidProfile(lid) {
    return this._get(Urls.api + '/locations/' + lid + '/profile')
        .then(json => JSON.parse(json));
  }



  searchQueryLocations(query) {
    return this._get(`${Urls.api}/search/${query}/locations`)
        .then(json => JSON.parse(json));
  }

  searchQueryUsers(query) {
    return this._get(`${Urls.api}/search/${query}/users`)
        .then(json => JSON.parse(json));
  }

  searchUsers(queryArray) {
    return this._post(`${Urls.api}/search/users`, {queries: queryArray})
        .then(json => JSON.parse(json));
  }

  suggestSeedLocations(seed) {
    return this._get(`${Urls.api}/suggest/${seed}/locations`)
        .then(json => JSON.parse(json));
  }

  suggestSeedUsers(seed) {
    return this._get(`${Urls.api}/suggest/${seed}/users`)
        .then(json => JSON.parse(json));
  }



  userLocationsFavoritesAddLid(lid) {
    return this._get(`${Urls.api}/user/locations/favorites/add/${lid}`);
  }




  mediaAddTypeIdItemId(typeId, itemId, filePath) {
    const filename = seconds().toString();
    return this._postMultipart(
        `${Urls.api}/media/add/${typeId}/${itemId}`,
        [{name: filename, filename: filename, data: RNFetchBlob.wrap(filePath)}]
    );
  }




}

const client = new ApiClient();
export default client;
