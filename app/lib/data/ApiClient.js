/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './ApiAuthentication';
import Context from "../Context";
import DaoLocation from "../daos/DaoLocation";
import DaoUser from "../daos/DaoUser";
import firebase from "./Firebase";
import Logger from "../Logger";
import StorageIO from './StorageIO';
import RNFetchBlob from 'react-native-fetch-blob';
import {Const, Urls} from '../../Config';
import {prepareForMultipart, seconds} from "../HelperFunctions";
import type {TApiFormChangePassword} from "../daos/DaoApiFormChangePassword";
import type {TApiFormRegister} from "../daos/DaoApiFormRegister";
import type {TLocation} from "../daos/DaoLocation";
import type {TUser} from "../daos/DaoUser";
import type {TUserLocationStatus} from "../daos/DaoUserLocationStatus";


class ApiClient {

	constructor() {
		this.api401Attempts = 0;
		this._handleResponse = this._handleResponse.bind(this);
		this._get = this._get.bind(this);
		this._post = this._post.bind(this);
		this._postMultipart = this._postMultipart.bind(this);
		this._onReceiveUserProfile = this._onReceiveUserProfile.bind(this);
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

			if (this.api401Attempts > Const.apiMax401) {
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
				Logger.v(`ApiClient _get: Using auth-token ${authenticationToken}`);

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
		return fetch(`${Urls.api}/meta/time`)
			.then(response => response.text())
			.then(callback)
			.catch(error => Logger.v(error));
	}




	async _onReceiveUserProfile(userProfileJson): Promise<TUser> {
		const user: TUser = JSON.parse(userProfileJson);

		await StorageIO.setLocalUser(user);
		ApiAuthentication.update(DaoUser.gId(user), DaoUser.gApiKey(user));

		return user;
	}

	accountsRegister(formUserRegister: TApiFormRegister) {
		return this._post(`${Urls.api}/accounts/register`, formUserRegister)
			.then(this._onReceiveUserProfile);
	}

	accountsLogin(formUserLogin) {
		return this._post(`${Urls.api}/accounts/login`, formUserLogin)
			.then(this._onReceiveUserProfile);
	}

	accountsLoginFacebook(accessToken) {
		return this._post(`${Urls.api}/accounts/login/facebook`, {token: accessToken})
			.then(this._onReceiveUserProfile);
	}

	accountsLoginGoogle(accessToken) {
		return this._post(`${Urls.api}/accounts/login/google`, {token: accessToken})
			.then(this._onReceiveUserProfile);
	}



	userProfile() {
		return this._get(`${Urls.api}/user/profile`)
			.then(this._onReceiveUserProfile);
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




	mediaAddTypeIdItemId(typeId, itemId, filePath) {
		const n = seconds().toString();
		return this._postMultipart(
			`${Urls.api}/media/add/${typeId}/${itemId}`,
			[{name: 'media', filename: n, data: RNFetchBlob.wrap(filePath)}]
		);
	}




	// Verified API Below ***************************************************************************
	// Verified API Below ***************************************************************************

	usersGetUid(uid: number): Promise<TUser> {
		return this._get(`${Urls.api}/users/${uid}`)
			.then(json => JSON.parse(json));
	}

	locationsGetLid(lid: number): Promise<TLocation> {
		return this._get(`${Urls.api}/locations/${lid}`)
			.then(json => JSON.parse(json));
	}

	// Should only be called from DataProvider.usersGetUidProfile
	usersGetUidProfile(uid: number): Promise<TUser> {
		return this._get(`${Urls.api}/users/${uid}/profile`)
			.then(json => JSON.parse(json));
	}

	// Should only be called from DataProvider.locationsGetLidProfile
	locationsGetLidProfile(lid: number): Promise<TLocation> {
		return this._get(`${Urls.api}/locations/${lid}/profile`)
			.then(json => JSON.parse(json));
	}

	// Should only be called from ApiFormDefRecoverPassword
	accountsRecoverPassword(email: string) {
		return this._get(`${Urls.api}/accounts/user/${email}/password/recover`);
	}

	// Should only be called from CacheDefUserProfile
	accountsChangePassword(uid: number, formChangePassword: TApiFormChangePassword) {
		return this._post(`${Urls.api}/accounts/user/${uid}/password/change`, formChangePassword);
	}

	// Should only be called from CacheDefUserProfile
	userConnectionsAddUid(uid): Promise<number> {
		return this._get(`${Urls.api}/user/connections/add/${uid}`);
	}

	// Should only be called from CacheDefUserProfile
	userConnectionsRemoveUid(uid): Promise<number> {
		return this._get(`${Urls.api}/user/connections/remove/${uid}`);
	}

	// Should only be called from CacheDefUserProfile
	userLocationsFavoritesAddLid(lid): Promise<number> {
		return this._get(`${Urls.api}/user/locations/favorites/add/${lid}`);
	}

	// Should only be called from CacheDefUserProfile
	userLocationsFavoritesDelLid(lid): Promise<number> {
		return this._get(`${Urls.api}/user/locations/favorites/del/${lid}`);
	}

	// Should only be called from CacheDefUserProfile
	userStatusAddOrEdit(status: TUserLocationStatus): Promise<TUserLocationStatus> {
		return this._post(`${Urls.api}/user/status/add`, status)
			.then(json => JSON.parse(json));
	}

	// Should only be called from CacheDefUserProfile
	userStatusDel(statusId) {
		return this._get(`${Urls.api}/user/status/del/${statusId}`);
	}

	// Should only be called from CacheDefUserProfile
	userStatusGet(): Promise<TUserLocationStatus> {
		return this._get(`${Urls.api}/user/status`);
	}

	// Should only be called from CacheDefUserProfile
	userProfileEdit(user: TUser): TUser {
		user = DaoUser.apiClean(user);

		const formData = prepareForMultipart(user);

		if (DaoUser.hasNewImage(user)) {
			const pictureUri = DaoUser.gPictureUrl(user);
			const n = seconds().toString();
			formData.push({name: DaoUser.pPictureUrl, filename: n, data: RNFetchBlob.wrap(pictureUri)});
		}

		return this._postMultipart(`${Urls.api}/user/profile/edit`, formData)
			.then(this._onReceiveUserProfile);
	}

	// Should only be called from CacheDefUserProfile
	userLocationsAdminEditLid(location: TLocation) {
		location = DaoLocation.apiClean(location);

		// If the locationId == -1 then this is a new location
		const locationId = DaoLocation.gId(location);

		const formData = prepareForMultipart(location);

		if (DaoLocation.hasNewImage(location)) {
			const pictureUri = DaoLocation.gPictureUrl(location);
			const n = seconds().toString();
			formData.push({name: DaoLocation.pPictureUrl, filename: n, data: RNFetchBlob.wrap(pictureUri)});
		}

		return this._postMultipart(`${Urls.api}/user/locations/administrating/edit/${locationId}`, formData)
			.then(json => JSON.parse(json));
	}

	// Should only be called from SearchDataDefUsers.searchApiCall
	searchQueryUsers(query = ''): Promise<Array<TUser>> {
		return this._get(`${Urls.api}/search/${query}/users`)
			.then(json => JSON.parse(json));
	}

	// Should only be called from SearchDataDefUsers.suggestApiCall
	suggestSeedUsers(seed = 0): Promise<Array<TUser>> {
		return this._get(`${Urls.api}/suggest/${seed}/users`)
			.then(json => JSON.parse(json));
	}

	// Should only be called from SearchDataDefUsers.suggestApiCall
	searchQueryLocations(query = ''): Promise<Array<TLocation>> {
		return this._get(`${Urls.api}/search/${query}/locations`)
			.then(json => JSON.parse(json));
	}

	// Should only be called from SearchDataDefLocations.suggestApiCall
	suggestSeedLocations(seed = 0): Promise<Array<TLocation>> {
		return this._get(`${Urls.api}/suggest/${seed}/locations`)
			.then(json => JSON.parse(json));
	}

	// Called from AddContacts.mapContactsToUsers
	searchUsers(queryArray = []): Promise<Array<TUser>> {
		return this._post(`${Urls.api}/search/users`, {queries: queryArray})
			.then(json => JSON.parse(json));
	}



}

const client = new ApiClient();
export default client;
