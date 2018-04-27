/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import _ from 'lodash';
import ApiClient from "../../../data/ApiClient";
import CacheDef from "../CacheDef";
import DaoLocation from "../../../daos/DaoLocation";
import DaoUser from "../../../daos/DaoUser";
import Logger from "../../../Logger";
import ObjectCache from "../../../helpers/ObjectCache";
import {CacheState} from "../CacheModel";
import type {TCacheDef} from "../CacheDef";
import type {TLocation} from "../../../daos/DaoLocation";
import type {TUser} from "../../../daos/DaoUser";

export const CACHE_ID_USER_PROFILE = 'CACHE_ID_USER_PROFILE';
export type TCacheUserProfile = CacheDefUserProfileActionCreator & CacheState;

// Declare cache definition
class CacheDefUserProfile extends CacheDef<TUser> {

	constructor() {
		super(CACHE_ID_USER_PROFILE);
	}

	buildDataSet(): Promise<TUser> {
		return ApiClient.userProfile();
	}

}

// Declare cache sub-type
export type TCacheDefUserProfile = TCacheDef<TUser>;

const cacheDefUserProfile: TCacheDefUserProfile = new CacheDefUserProfile();
export default cacheDefUserProfile;


export class CacheDefUserProfileActionCreator {

	constructor(cacheActionCreator) {
		this.cacheActionCreator = cacheActionCreator;
		this._addToConnectionArray = this._addToConnectionArray.bind(this);
		this._removeFromConnectionArray = this._removeFromConnectionArray.bind(this);
		this._removeUserFromConnectionsFriends = this._removeUserFromConnectionsFriends.bind(this);
		this._removeUserFromConnectionsBlocked = this._removeUserFromConnectionsBlocked.bind(this);
		this._addUserToConnectionsFriends = this._addUserToConnectionsFriends.bind(this);
		this._addUserToConnectionsBlocked = this._addUserToConnectionsBlocked.bind(this);
		this.addUserToFriends = this.addUserToFriends.bind(this);
		this.removeUserFromFriends = this.removeUserFromFriends.bind(this);
		this.acceptUserFriendship = this.acceptUserFriendship.bind(this);
		this.blockUser = this.blockUser.bind(this);
		this.addLocationToFavorites = this.addLocationToFavorites.bind(this);
		this.removeLocationFromFavorites = this.removeLocationFromFavorites.bind(this);
	}

	_addToConnectionArray(userToAdd: TUser, connectionPropertyName, getConnectionIds, invalidateConnectionIds) {
		const {executeIfDataNotNull, setData} = this.cacheActionCreator;

		return executeIfDataNotNull((thisUser: TUser) => {
			const userIdToAdd = DaoUser.gId(userToAdd);

			// Get all the connection ids
			const connectionIds = getConnectionIds(thisUser);

			if (connectionIds.includes(userIdToAdd))
				return;

			// Get the connections, add the userToAdd and set
			const connections = _.get(thisUser, connectionPropertyName, []);
			connections.push(userToAdd);
			_.set(thisUser, connectionPropertyName, connections);

			// Invalidate the id cache
			invalidateConnectionIds(thisUser);

			// Run the dispatch action (updating this user)
			setData(thisUser);
		});
	}

	_removeFromConnectionArray(userToRemove: TUser, connectionPropertyName, getConnectionIds, invalidateConnectionIds) {
		const {executeIfDataNotNull, setData} = this.cacheActionCreator;

		return executeIfDataNotNull((thisUser: TUser) => {
			const userIdToRemove = DaoUser.gId(userToRemove);

			// Get all the connection ids
			const connectionIds = getConnectionIds(thisUser);

			if (!connectionIds.includes(userIdToRemove))
				return;

			// Get the connections, remove the userToRemove and set
			const connections = _.get(thisUser, connectionPropertyName, []);
			_.remove(connections, u => userIdToRemove == DaoUser.gId(u));
			_.set(thisUser, connectionPropertyName, connections);

			// Invalidate the id cache
			invalidateConnectionIds(thisUser);

			// Run the dispatch action (updating this user)
			setData(thisUser);
		});
	}

	_addUserToConnectionsFriends(userToAdd: TUser) {
		this._addToConnectionArray(
			userToAdd,
			DaoUser.pConnectionFriends,
			DaoUser.gConnectionFriendIds,
			DaoUser.invalidateConnectionFriendIds
		);
	}

	_addUserToConnectionsBlocked(userToAdd: TUser) {
		this._addToConnectionArray(
			userToAdd,
			DaoUser.pConnectionBlocked,
			DaoUser.gConnectionBlockedIds,
			DaoUser.invalidateConnectionBlockedIds
		);
	}

	_removeUserFromConnectionsFriends(userToRemove: TUser) {
		this._removeFromConnectionArray(
			userToRemove,
			DaoUser.pConnectionFriends,
			DaoUser.gConnectionFriendIds,
			DaoUser.invalidateConnectionFriendIds
		);
	}

	_removeUserFromConnectionsBlocked(userToRemove: TUser) {
		this._removeFromConnectionArray(
			userToRemove,
			DaoUser.pConnectionBlocked,
			DaoUser.gConnectionBlockedIds,
			DaoUser.invalidateConnectionBlockedIds
		);
	}

	addUserToFriends(userToAdd: TUser) {
		// Update the UI before running the request
		this._addUserToConnectionsFriends(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsAddUid(uid)
			.then(success => {
				Logger.v("UserList addUserToFriends addUid success", uid, success);
			})
			.catch(error => {
				// Revert to the previous state
				this._removeUserFromConnectionsFriends(userToAdd);
				Logger.v("UserList addUserToFriends addUid failed", uid, error);
			});
	}

	removeUserFromFriends(userToAdd: TUser) {
		// Update the UI before running the request
		this._removeUserFromConnectionsFriends(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsBlockUid(uid)
			.then(success => {
				Logger.v("UserList removeUserFromFriends blockUid success", uid, success);
			})
			.catch(error => {
				// Revert to the previous state
				this._addUserToConnectionsFriends(userToAdd);
				Logger.v("UserList removeUserFromFriends blockUid failed", uid, error);
			});
	}

	blockUser(userToAdd: TUser) {
		// Update the UI before running the request
		this._addUserToConnectionsBlocked(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsBlockUid(uid)
			.then(success => {
				Logger.v("UserList blockUser blockUid success", uid, success);
			})
			.catch(error => {
				// Revert to the previous state
				this._removeUserFromConnectionsBlocked(userToAdd);
				Logger.v("UserList blockUser blockUid failed", uid, error);
			});
	}

	acceptUserFriendship(userToAdd: TUser) {
		// Update the UI before running the request
		this._addUserToConnectionsFriends(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsAcceptUid(uid)
			.then(success => {
				Logger.v("UserList acceptUserFriendship acceptUid success", uid, success);
			})
			.catch(error => {
				// Revert to the previous state
				this._removeUserFromConnectionsFriends(userToAdd);
				Logger.v("UserList acceptUserFriendship acceptUid failed", uid, error);
			});
	}

	addLocationToFavorites(locationToAdd: TLocation) {
		const {executeIfDataNotNull, setData} = this.cacheActionCreator;

		return executeIfDataNotNull((thisUser: TUser) => {
			const locationId = DaoLocation.gId(locationToAdd);

			// Get all the location ids
			const favoriteLocationIds = DaoUser.gLocationsFavoriteIds(thisUser);

			// If this is already a favorite location don't do anything
			if (favoriteLocationIds.includes(locationId))
				return;

			// Add the new id
			favoriteLocationIds.push(locationId);
			_.set(thisUser, DaoUser.pLocationsFavorites, favoriteLocationIds);

			// Get the list of locations associated to the user.locations object
			const locations = DaoUser.gLocationsLocations(thisUser);

			const locationAlreadyIncluded = _.some(locations, l => DaoLocation.gId(l) == locationId);
			if (locationAlreadyIncluded)
				return;

			// Add the new location
			locations.push(locationToAdd);
			_.set(thisUser, DaoUser.pLocationsLocations, locations);

			// Run the dispatch action (updating this user)
			setData(thisUser);
		});
	}

	removeLocationFromFavorites(locationToRemove: TLocation) {
		const {executeIfDataNotNull, setData} = this.cacheActionCreator;

		return executeIfDataNotNull((thisUser: TUser) => {
			const favoriteLocations = DaoUser.gLocationsFavoriteIds(thisUser);

			_.remove(favoriteLocations, DaoLocation.gId(locationToRemove));
			_.set(thisUser, DaoUser.pLocationsFavorites, favoriteLocations);

			setData(thisUser);
		});
	}


}