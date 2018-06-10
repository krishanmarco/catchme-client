/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './ApiAuthentication';
import ApiExceptionHandler from './ApiExceptionHandler';
import Context from '../Context';
import DaoLocation from '../daos/DaoLocation';
import DaoUser from '../daos/DaoUser';
import firebase from './Firebase';
import I18n from 'react-native-i18n';
import Logger from '../Logger';
import RNFetchBlob from 'react-native-fetch-blob';
import StorageIO from './StorageIO';
import {Const, Urls} from '../../Config';
import {prepareForMultipart, seconds} from '../HelperFunctions';
import type {TApiFormChangePassword} from '../daos/DaoApiFormChangePassword';
import type {TApiFormRegister} from '../daos/DaoApiFormRegister';
import type {TId} from '../types/Types';
import type {TLocation} from '../daos/DaoLocation';
import type {TUser} from '../daos/DaoUser';
import type {TUserLocationStatus} from '../daos/DaoUserLocationStatus';

class ApiClient {

	constructor() {
		this.api401Attempts = 0;
		this._getHeaders = this._getHeaders.bind(this);
		this._handleResponse = this._handleResponse.bind(this);
		this._get = this._get.bind(this);
		this._post = this._post.bind(this);
		this._postMultipart = this._postMultipart.bind(this);
		this._onReceiveUserProfile = this._onReceiveUserProfile.bind(this);
	}

	async _getHeaders(contentType: string) {
		const authToken = await ApiAuthentication.getUserAuthenticationToken();
		Logger.v(`ApiClient _getHeaders: Using auth-token ${authToken}`);
		return {
			'Accept': 'application/json',
			'Content-Type': contentType,
			'Authorization': authToken,
			'Accept-Language': I18n.currentLocale(),
			'Geolocation': JSON.stringify(Context.getGeolocation())
		};
	}

	async _handleResponse(response: Object, url: string, callbackRetryRequest: Function) {
		const status = response.status;
		let text: ?String = await response.text();

		Logger.v(`ApiClient _handleResponse: s(${status}), a(${this.api401Attempts}) u(${url})`, text);

		if (status == 401) {
			this.api401Attempts++;
			ApiAuthentication.invalidateAuthenticationToken();

			// Check if request rejected too many times
			if (this.api401Attempts > Const.apiMax401)
				throw new Error('ApiClient _handleResponse: Too many unauthorized requests.');

			// Retry the request, the token will be regenerated
			return callbackRetryRequest();
		}

		// The request was not unauthorized, reset the failed counter
		this.api401Attempts = 0;

		if (status == 200)
			return text;

		// (![401, 400, 500, 200]) -> Unknown status code -> Local ApiException
		if (status != 400 && status != 500)
			return ApiExceptionHandler.onApiExceptionCatch(ApiExceptionHandler.exUnknownStatus);

		return ApiExceptionHandler.onApiExceptionCatch(JSON.parse(text));
	}

	_get(url: string) {
		Logger.v(`ApiClient _get: Requesting auth-token for ${url}`);

		return this._getHeaders('application/json')
			.then(headers => fetch(url, {method: 'GET', headers}))
			.then(response => this._handleResponse(response, url, () => this._get(url)));
	}

	_post(url: string, body: ?Object) {
		Logger.v(`ApiClient _post: Requesting auth-token for ${url}`);

		return this._getHeaders('application/json')
			.then(headers => fetch(url, {method: 'POST', body: JSON.stringify(body), headers}))
			.then(response => this._handleResponse(response, url, () => this._post(url, body)));
	}

	_postMultipart(url: string, formData: ?Object = {}) {
		Logger.v(`ApiClient _postMultipart: Requesting auth-token for ${url}`);

		return this._getHeaders('multipart/form-data')
			.then(headers => RNFetchBlob.fetch('POST', url, headers, formData))
			.then(rnFetchResponse => ({
				text: () => Promise.resolve(rnFetchResponse.text()),
				status: rnFetchResponse.respInfo.status
			}))
			.then(response => this._handleResponse(response, url, () => this._postMultipart(url, formData)));
	}

	// Should only be called from login and register functions
	async _onReceiveUserProfile(userProfileJson: string): Promise<TUser> {
		const user: TUser = JSON.parse(userProfileJson);

		if (DaoUser.gApiKey(user) == null)
			return Promise.reject(ApiExceptionHandler.exInvalidApiKey);

		await StorageIO.setLocalUser(user);
		await ApiAuthentication.update(DaoUser.gId(user), DaoUser.gApiKey(user));

		return user;
	}

	// Server API ***********************************************************************************
	// Server API ***********************************************************************************

	// Should only be called from ApiAuthentication
	time() {
		return fetch(`${Urls.api}/meta/time`)
			.then(response => response.text());
	}

	// Should only be called from ApiAuthentication
	authenticateFirebase() {
		return this._get(`${Urls.api}/user/firebase-jwt`)
			.then(jwt => {
				Logger.v(`ApiClient userFirebaseJwt: Received firebase jwt ${jwt}`);
				Context.setFirebaseEnabled(true);
				return firebase.auth().signInWithCustomToken(jwt);
			})
			.catch(exception => {
				Context.setFirebaseEnabled(false);
				Logger.v('ApiClient authenticateFirebase: Failed to login to firebase', exception);
			});
	}

	// Should only be called from ApiFormDefRegister
	accountsRegister(formUserRegister: TApiFormRegister) {
		return this._post(`${Urls.api}/accounts/register`, formUserRegister)
			.then(this._onReceiveUserProfile);
	}

	// Should only be called from ApiFormDefLogin
	accountsLogin(formUserLogin) {
		return this._post(`${Urls.api}/accounts/login`, formUserLogin)
			.then(this._onReceiveUserProfile);
	}

	// Should only be called from ScreenLogin
	accountsLoginFacebook(accessToken) {
		return this._post(`${Urls.api}/accounts/login/facebook`, {token: accessToken})
			.then(this._onReceiveUserProfile);
	}

	// Should only be called from ScreenLogin
	accountsLoginGoogle(accessToken) {
		return this._post(`${Urls.api}/accounts/login/google`, {token: accessToken})
			.then(this._onReceiveUserProfile);
	}

	// Should only be called from CacheDefUserProfile
	userProfile() {
		return this._get(`${Urls.api}/user/profile`)
			.then(JSON.parse);
	}

	// Should only be called from CacheMapDefUserProfiles
	usersGetUidProfile(uid: number): Promise<TUser> {
		return this._get(`${Urls.api}/users/${uid}/profile`)
			.then(JSON.parse);
	}

	// Should only be called from CacheMapDefLocationProfiles
	locationsGetLidProfile(lid: number): Promise<TLocation> {
		return this._get(`${Urls.api}/locations/${lid}/profile`)
			.then(JSON.parse);
	}

	// Should only be called from CacheMapDefUsers
	usersGetUid(uid: number): Promise<TUser> {
		return this._get(`${Urls.api}/users/${uid}`)
			.then(JSON.parse);
	}

	// Should only be called from CacheMapDefLocations
	locationsGetLid(lid: number): Promise<TLocation> {
		return this._get(`${Urls.api}/locations/${lid}`)
			.then(JSON.parse);
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
			.then(JSON.parse);
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
			.then(JSON.parse);
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
			.then(JSON.parse);
	}

	// Should only be called from SearchDataDefUsers.searchApiCall
	searchQueryUsers(query: string = ''): Promise<Array<TUser>> {
		return this._get(`${Urls.api}/search/${query}/users`)
			.then(JSON.parse);
	}

	// Should only be called from SearchDataDefUsers.suggestApiCall
	suggestSeedUsers(seed: number = 0): Promise<Array<TUser>> {
		return this._get(`${Urls.api}/suggest/${seed}/users`)
			.then(JSON.parse);
	}

	// Should only be called from SearchDataDefUsers.suggestApiCall
	searchQueryLocations(query: string = ''): Promise<Array<TLocation>> {
		return this._get(`${Urls.api}/search/${query}/locations`)
			.then(JSON.parse);
	}

	// Should only be called from SearchDataDefLocations.suggestApiCall
	suggestSeedLocations(seed: number = 0): Promise<Array<TLocation>> {
		return this._get(`${Urls.api}/suggest/${seed}/locations`)
			.then(JSON.parse);
	}

	// Should only be called from CacheMapDefLocationProfilesActionCreator
	mediaAddTypeIdItemId(typeId: number, itemId: TId, filePath: string) {
		const n = seconds().toString();
		return this._postMultipart(
			`${Urls.api}/media/add/${typeId}/${itemId}`,
			[{name: 'media', filename: n, data: RNFetchBlob.wrap(filePath)}]
		);
	}

	// Called from AddContacts
	searchUsers(queryArray = []): Promise<Array<TUser>> {
		if (queryArray.length <= 0)
			return Promise.resolve([]);

		return this._post(`${Urls.api}/search/users`, {queries: queryArray})
			.then(JSON.parse);
	}

}

const client = new ApiClient();
export default client;
