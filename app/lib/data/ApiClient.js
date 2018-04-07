/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './ApiAuthentication';
import DaoLocation from "../daos/DaoLocation";
import DaoUser from "../daos/DaoUser";
import Logger from "../Logger";
import RealmIO from './RealmIO';
import RNFetchBlob from 'react-native-fetch-blob';
import {Const, Urls} from '../../Config';
import {prepareForMultipart, seconds} from "../HelperFunctions";
import type {TUser} from "../daos/DaoUser";
import type {TUserLocationStatus} from "../daos/DaoUserLocationStatus";
import type {TApiFormRegister} from "../daos/DaoApiFormRegister";
import type {TApiFormChangePassword} from "../daos/DaoApiFormChangePassword";
import type {TLocation} from "../daos/DaoLocation";
import {startApplication} from "../../App";
import firebase from "./Firebase";
import Context from "../Context";


class ApiClient {

	constructor() {
		this.api401Attempts = 0;
		this._handleResponse = this._handleResponse.bind(this);
		this._get = this._get.bind(this);
		this._post = this._post.bind(this);
		this._postMultipart = this._postMultipart.bind(this);
		this._onUserLoginSuccess = this._onUserLoginSuccess.bind(this);
	}


	_handleResponse(response, url, callbackRetryRequest) {

		// CASE 1, status == 200
		if (response.status === 200) {

			// Request is successful, reset the failed counter
			this.api401Attempts = 0;

			return response.text()
				.then(text => {
					Logger.v(`ApiClient _handleResponse: status(200) for ${url}`, text);
					return text;
				});
		}

		// CASE 2, status == 400
		if (response.status === 400) {

			// Request is successful, reset the failed counter
			this.api401Attempts = 0;

			return response.text()
				.then(text => {
					Logger.v(`ApiClient _handleResponse: status(400) for ${url}`, text);
					return Promise.reject(text);
				});
		}



		// CASE 3, status == 401
		if (response.status === 401) {
			Logger.v(`ApiClient _handleResponse: status(401[${this.api401Attempts}]) for ${url}`);

			// Request is unsuccessful, increment the failed counter
			this.api401Attempts++;

			ApiAuthentication.invalidateAuthenticationToken();

			if (this.api401Attempts > Const.ApiClient.maxApi401) {
				// This request has been unauthorized too many times
				Logger.v("ApiClient _handleResponse: Too many [401], terminating request retry-loop");

				// Reset the 401 request counter
				this.api401Attempts = 0;
				return Promise.reject();
			}

			return callbackRetryRequest();
		}



		// CASE 4, status == 500
		if (response.status === 500) {
			Logger.v(`ApiClient _handleResponse: status(500) for ${url}`);

			return response.text()
				.then(json => {
					const apiException = JSON.parse(json);
					Logger.v('ApiClient _handleResponse: ', apiException);
					return Promise.reject(apiException);
				}).catch(apiException => {
					// Do nothing on server internal error
				});
		}


		// CASE 5, status UNKNOWN
		Logger.v(`ApiClient _handleResponse: status(${response.status}) for ${url}`);
		return Promise.reject(0);
	}




	_get(url) {
		Logger.v(`ApiClient _get: Requesting auth-token for ${url}`);

		return ApiAuthentication.getUserAuthenticationToken()
			.then(authenticationToken => {
				Logger.v("ApiClient _get: Using auth-token " + authenticationToken);

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
		Logger.v(`ApiClient _post: Requesting auth-token for ${url}`);

		return ApiAuthentication.getUserAuthenticationToken()
			.then(authenticationToken => {
				Logger.v(`ApiClient _post: Using auth-token ${authenticationToken}`);

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
		Logger.v(`ApiClient _postMultipart: Requesting auth-token for ${url}`);

		return ApiAuthentication.getUserAuthenticationToken()
			.then(authenticationToken => {
				Logger.v(`ApiClient _postMultipart: Using auth-token ${authenticationToken}`);

				return RNFetchBlob.fetch('POST', url,
					{
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
						"Authorization": authenticationToken
					},
					formData
				);
			})
			.then(rnFetchResponse => {
				// Map the RNFetchBlob answer to a normal fetch response
				const response = {
					// Add any parameters that _handleResponse may need in the response object
					text: () => Promise.resolve(rnFetchResponse.text()),
					status: rnFetchResponse.respInfo.status
				};

				return this._handleResponse(response, url, () => this._postMultipart(url, formData));
			});
	}




	time(callback) {
		return fetch(Urls.api + '/meta/time')
			.then(response => response.text())
			.then(callback)
			.catch(error => Logger.v(error));
	}




	_onUserLoginSuccess(userProfileJson): Promise<TUser> {
		const userForRealm: TUser = JSON.parse(userProfileJson);
		const userForReturn: TUser = JSON.parse(userProfileJson);

		RealmIO.setLocalUser(userForRealm);
		ApiAuthentication.update(DaoUser.gId(userForReturn), DaoUser.gApiKey(userForReturn));

		return userForReturn;
	}

	accountsRegister(formUserRegister: TApiFormRegister) {
		return this._post(`${Urls.api}/accounts/register`, formUserRegister)
			.then(this._onUserLoginSuccess);
	}

	accountsLogin(formUserLogin) {
		return this._post(`${Urls.api}/accounts/login`, formUserLogin)
			.then(this._onUserLoginSuccess);
	}

	accountsLoginFacebook(accessToken) {
		return this._post(`${Urls.api}/accounts/login/facebook`, {token: accessToken})
			.then(this._onUserLoginSuccess);
	}

	accountsLoginGoogle(accessToken) {
		return this._post(`${Urls.api}/accounts/login/google`, {token: accessToken})
			.then(this._onUserLoginSuccess);
	}

	accountsChangePassword(formChangePassword: TApiFormChangePassword) {
		return this._post(`${Urls.api}/accounts/password/change`, formChangePassword);
	}



	userProfile() {
		return this._get(Urls.api + '/user/profile')
			.then(this._onUserLoginSuccess);
	}

	authenticateFirebase() {
		return this._get(`${Urls.api}/user/firebase-jwt`)
			.then(jwt => {
				Logger.v(`ApiClient userFirebaseJwt: Received firebase jwt ${jwt}`);
				Context.setFirebaseEnabled(true);
				return firebase.auth().signInWithCustomToken(jwt);
			})
			.catch(exception => {
				Context.setFirebaseEnabled(false);
				Logger.v("ApiClient authenticateFirebase: Failed to login to firebase: ", exception);
			});
		}

	userProfileEdit(userData: TUser, filePath = null) {
		const formData = Object.keys(userData)
			.map(key => ({name: key, data: String(userData[key])}));

		if (filePath != null) {
			const n = seconds().toString();
			formData.push({name: n, filename: n, data: RNFetchBlob.wrap(filePath)});
		}

		return this._postMultipart(`${Urls.api}/user/profile/edit`, formData)
			.then(json => JSON.parse(json));
	}

	userConnectionsAddUid(uid) {
		return this._get(Urls.api + '/user/connections/add/' + uid);
	}

	userConnectionsAcceptUid(uid) {
		return this._get(Urls.api + '/user/connections/accept/' + uid);
	}

	userConnectionsBlockUid(uid) {
		return this._get(Urls.api + '/user/connections/block/' + uid);
	}

	userStatusAdd(status: TUserLocationStatus) {
		Logger.v("_userStatusAdd SENDING STATUS CONFIRM REQUEST.....");
		return this._post(`${Urls.api}/user/status/add`, status);
	}

	userStatusDel(statusId) {
		return this._get(`${Urls.api}/user/status/del/${statusId}`);
	}

	userStatusGet(): Promise<TUserLocationStatus> {
		return this._get(`${Urls.api}/user/status`);
	}

	userLocationsFavoritesAdd(locationId) {
		return this._get(`${Urls.api}/user/locations/favorites/add/${locationId}`);
	}

	userLocationsFavoritesDel(locationId) {
		return this._get(`${Urls.api}/user/locations/favorites/del/${locationId}`);
	}

	userLocationsAdminEditLid(location: TLocation) {
		location = DaoLocation.apiClean(location);

		// If the locationId == -1 then this is a new location
		const locationId = DaoLocation.gId(location);

		const formData = prepareForMultipart(location);

		if (DaoLocation.hasNewImage(location)) {
			const pictureUri = DaoLocation.gPictureUrl(location);
			const n = seconds().toString();		// todo: rename pictureUrl to avatar (without the URL part)
			formData.push({name: DaoLocation.pPictureUrl, filename: n, data: RNFetchBlob.wrap(pictureUri)});
		}

		const url = `${Urls.api}/user/locations/administrating/edit/${locationId}`;
		return this._postMultipart(url, formData)
			.then(json => JSON.parse(json));
	}



	usersGetUidProfile(uid: number) {
		return this._get(Urls.api + '/users/' + uid + '/profile')
			.then(json => JSON.parse(json));
	}

	locationsGetLidProfile(lid: number) {
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

	searchUsers(queryArray = []) {
		return this._post(`${Urls.api}/search/users`, {queries: queryArray})
			.then(json => JSON.parse(json));
	}

	suggestSeedLocations(seed = 0) {
		return this._get(`${Urls.api}/suggest/${seed}/locations`)
			.then(json => JSON.parse(json));
	}

	suggestSeedUsers(seed = 0) {
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
			[{name: filename, filename, data: RNFetchBlob.wrap(filePath)}]
		);
	}




}

const client = new ApiClient();
export default client;
