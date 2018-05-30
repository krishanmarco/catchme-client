/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import _ from 'lodash';
import ApiClient from '../../../data/ApiClient';
import CacheDef from '../CacheDef';
import DaoLocation from '../../../daos/DaoLocation';
import DaoUser from '../../../daos/DaoUser';
import DaoUserLocationStatus from '../../../daos/DaoUserLocationStatus';
import Logger from '../../../Logger';
import {CacheState} from '../CacheModel';
import {Snackbar} from '../../../Snackbar';
import {t} from '../../../i18n/Translations';
import type {TApiFormChangePassword} from '../../../daos/DaoApiFormChangePassword';
import type {TCacheDef} from '../CacheDef';
import type {TLocation} from '../../../daos/DaoLocation';
import type {TLocationWithULS} from '../../../helpers/ULSListManager';
import type {TThunk} from '../../../types/Types';
import type {TUser} from '../../../daos/DaoUser';
import type {TUserLocationStatus} from '../../../daos/DaoUserLocationStatus';

export const CACHE_ID_USER_PROFILE = 'CACHE_ID_USER_PROFILE';
export type TCacheUserProfile = CacheDefUserProfileActionCreator & CacheState;

// Declare cache definition
class CacheDefUserProfile extends CacheDef<TUser> {

	constructor() {
		super(CACHE_ID_USER_PROFILE);
	}

	buildDataSet(thunk: TThunk, extraParams: Object): Promise<TUser> {
		return ApiClient.userProfile();
	}

}

// Declare cache sub-type
export type TCacheDefUserProfile = TCacheDef<TUser>;

const cacheDefUserProfile: TCacheDefUserProfile = new CacheDefUserProfile();
export default cacheDefUserProfile;


export class CacheDefUserProfileActionCreator {

	constructor(cacheActionCreator) {
		// We can't extend CacheActionCreator because it would create a require-cycle
		// We have to pass cacheActionCreator in as a parameter and extend with Object.assign
		Object.assign(this, cacheActionCreator);
		this._putToUserLocationStatusesArray = this._putToUserLocationStatusesArray.bind(this);
		this._removeFromUserLocationStatusesArray = this._removeFromUserLocationStatusesArray.bind(this);
		this._putToAdminLocationsArray = this._putToAdminLocationsArray.bind(this);
		this._removeFromAdminLocationsArray= this._removeFromAdminLocationsArray.bind(this);
		this._addToLocationFavoritesArray = this._addToLocationFavoritesArray.bind(this);
		this._removeFromLocationFavoritesArray = this._removeFromLocationFavoritesArray.bind(this);
		this._addToConnectionArray = this._addToConnectionArray.bind(this);
		this._removeFromConnectionArray = this._removeFromConnectionArray.bind(this);
		this._removeUserFromConnectionsFriends = this._removeUserFromConnectionsFriends.bind(this);
		this._removeUserFromConnectionsPending = this._removeUserFromConnectionsPending.bind(this);
		this._removeUserFromConnectionsBlocked = this._removeUserFromConnectionsBlocked.bind(this);
		this.editUser = this.editUser.bind(this);
		this._addUserToConnectionsFriends = this._addUserToConnectionsFriends.bind(this);
		this._addUserToConnectionsPending = this._addUserToConnectionsPending.bind(this);
		this._addUserToConnectionsBlocked = this._addUserToConnectionsBlocked.bind(this);
		this.connAdd = this.connAdd.bind(this);
		this.connRemove = this.connRemove.bind(this);
		this.connAccept = this.connAccept.bind(this);
		this.connCancel = this.connCancel.bind(this);
		this.connBlock = this.connBlock.bind(this);
		this.locationFavAdd = this.locationFavAdd.bind(this);
		this.locationFavRemove = this.locationFavRemove.bind(this);
		this.putLocationWithULS = this.putLocationWithULS.bind(this);
		this.removeLocationWithULS = this.removeLocationWithULS.bind(this);
		this.putAdminLocation = this.putAdminLocation.bind(this);
		this.changeUserPassword = this.changeUserPassword.bind(this);
	}

	_putToUserLocationStatusesArray(locationWithULS: TLocationWithULS) {
		const {executeIfDataNotNull, setData} = this;

		return executeIfDataNotNull((thisUser: TUser) => {
			const userLocationStatuses = DaoUser.gLocationsUserLocationStatuses(thisUser);

			const ulsId = DaoLocation.gUserLocationStatusId(locationWithULS);
			if (userLocationStatuses.map(DaoUserLocationStatus.gId).includes(ulsId)) {
				// This uls is already in the array, remove it so the new version gets pushed
				this._removeFromUserLocationStatusesArray(locationWithULS);
			}

			userLocationStatuses.push(DaoLocation.gUserLocationStatus(locationWithULS));
			_.set(thisUser, DaoUser.pLocationsUserLocationStatuses, userLocationStatuses);
			setData(thisUser);
		});
	}

	_removeFromUserLocationStatusesArray(locationWithULS: TLocationWithULS) {
		const {executeIfDataNotNull, setData} = this;

		return executeIfDataNotNull((thisUser: TUser) => {
			const userLocationStatuses = DaoUser.gLocationsUserLocationStatuses(thisUser);

			const ulsId = DaoLocation.gUserLocationStatusId(locationWithULS);
			_.remove(userLocationStatuses, uls => DaoUserLocationStatus.gId(uls) == ulsId);
			_.set(thisUser, DaoUser.pLocationsUserLocationStatuses, userLocationStatuses);

			setData(thisUser);
		});
	}

	_putToAdminLocationsArray(locationToAdd: TLocation) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const userAdminLocations = DaoUser.gAdminLocations(thisUser);

			const newLid = DaoLocation.gId(locationToAdd);
			if (userAdminLocations.map(DaoLocation.gId).includes(newLid)) {
				// This lid is already in the array, remove it so the new version gets pushed
				this._removeFromAdminLocationsArray(locationToAdd);
			}

			userAdminLocations.push(locationToAdd);
			_.set(thisUser, DaoUser.pAdminLocations, userAdminLocations);
			setData(thisUser);
		});
	}

	_removeFromAdminLocationsArray(locationToRemove: TLocation) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const userAdminLocations = DaoUser.gAdminLocations(thisUser);

			_.remove(userAdminLocations, l => DaoLocation.gId(l) == DaoLocation.gId(locationToRemove));
			_.set(thisUser, DaoUser.pAdminLocations, userAdminLocations);

			setData(thisUser);
		});
	}

	_addToLocationFavoritesArray(locationToAdd: TLocation) {
		const {executeIfDataNotNull, setData} = this;

		return executeIfDataNotNull((thisUser: TUser) => {
			const locationId = DaoLocation.gId(locationToAdd);

			// Get all the location ids
			const favoriteLocationIds = DaoUser.gLocationsFavoriteIds(thisUser);

			// If this is already a favorite location don't do anything
			if (favoriteLocationIds.includes(locationId))
				return;

			// Add the new id
			favoriteLocationIds.push(locationId);
			_.set(thisUser, DaoUser.pLocationsFavoriteIds, favoriteLocationIds);

			// Get the list of locations associated to the user.locations object
			const locations = DaoUser.gLocationsLocations(thisUser);

			const locationAlreadyIncluded = _.some(locations, l => DaoLocation.gId(l) == locationId);
			if (!locationAlreadyIncluded) {
				// Add the new location
				locations.push(locationToAdd);
				_.set(thisUser, DaoUser.pLocationsLocations, locations);
			}

			// Run the dispatch action (updating this user)
			setData(thisUser);
		});
	}

	_removeFromLocationFavoritesArray(locationToRemove: TLocation) {
		const {executeIfDataNotNull, setData} = this;

		return executeIfDataNotNull((thisUser: TUser) => {
			const favoriteLocationIds = DaoUser.gLocationsFavoriteIds(thisUser);

			_.remove(favoriteLocationIds, lid => lid == DaoLocation.gId(locationToRemove));
			_.set(thisUser, DaoUser.pLocationsFavoriteIds, favoriteLocationIds);

			setData(thisUser);
		});
	}

	_addToConnectionArray(userToAdd: TUser, connectionPropertyName, getConnectionIds, invalidateConnectionIds) {
		const {executeIfDataNotNull, setData} = this;

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
		const {executeIfDataNotNull, setData} = this;

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

	_addUserToConnectionsPending(userToAdd: TUser) {
		this._addToConnectionArray(
			userToAdd,
			DaoUser.pConnectionPending,
			DaoUser.gConnectionPendingIds,
			DaoUser.invalidateConnectionPendingIds
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

	_removeUserFromConnectionsPending(userToRemove: TUser) {
		this._removeFromConnectionArray(
			userToRemove,
			DaoUser.pConnectionPending,
			DaoUser.gConnectionPendingIds,
			DaoUser.invalidateConnectionPendingIds
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

	editUser(user: TUser) {
		const {executeIfDataNotNull, mergeData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const oldUser = Object.assign({}, thisUser);
			mergeData(user);

			const uid = DaoUser.gId(user);
			return ApiClient.userProfileEdit(user)
				.then((newUser: TUser) => {
					mergeData(user);
					Logger.v('CacheDefUserProfile editUser: success', uid, newUser);
					return newUser;
				})
				.catch(err => {
					// Revert to the previous state
					mergeData(oldUser);
					Logger.v('CacheDefUserProfile editUser: failed', uid, err);
					return err;
				});
		});
	}

	connAdd(userToAdd: TUser) {
		// Update the UI before running the request
		this._addUserToConnectionsPending(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsAddUid(uid)
			.then(success => {
				Logger.v('CacheDefUserProfile connAdd: success', uid, success);
				Snackbar.showWarningStr(t('t_ls_user_added'));
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._removeUserFromConnectionsFriends(userToAdd);
				Logger.v('CacheDefUserProfile connAdd: failed', uid, err);
				return err;
			});
	}

	connRemove(userToAdd: TUser) {
		// Update the UI before running the request
		this._removeUserFromConnectionsFriends(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsRemoveUid(uid)
			.then(success => {
				Logger.v('CacheDefUserProfile connRemove: success', uid, success);
				Snackbar.showSuccessStr(t('t_ls_user_removed'));
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._addUserToConnectionsFriends(userToAdd);
				Logger.v('CacheDefUserProfile connRemove: failed', uid, err);
				return err;
			});
	}

	connCancel(userToAdd: TUser) {
		// Update the UI before running the request
		this._removeUserFromConnectionsPending(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsRemoveUid(uid)
			.then(success => {
				Logger.v('CacheDefUserProfile connCancel: success', uid, success);
				Snackbar.showSuccessStr(t('t_ls_user_cancel'));
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._addUserToConnectionsPending(userToAdd);
				Logger.v('CacheDefUserProfile connCancel: failed', uid, err);
				return err;
			});
	}

	connBlock(userToAdd: TUser) {
		// Update the UI before running the request
		this._addUserToConnectionsBlocked(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsRemoveUid(uid)
			.then(success => {
				Logger.v('CacheDefUserProfile connBlock: success', uid, success);
				Snackbar.showSuccessStr(t('t_ls_user_blocked'));
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._removeUserFromConnectionsBlocked(userToAdd);
				Logger.v('CacheDefUserProfile connBlock: failed', uid, err);
				return err;
			});
	}

	connAccept(userToAdd: TUser) {
		// Update the UI before running the request
		this._addUserToConnectionsFriends(userToAdd);

		const uid = DaoUser.gId(userToAdd);
		return ApiClient.userConnectionsAddUid(uid)
			.then(success => {
				Logger.v('CacheDefUserProfile connAccept: success', uid, success);
				Snackbar.showSuccessStr(t('t_ls_connection_accepted'));
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._removeUserFromConnectionsFriends(userToAdd);
				Logger.v('CacheDefUserProfile connAccept: failed', uid, err);
				return err;
			});
	}

	locationFavAdd(locationToAdd: TLocation) {
		// Update the UI before running the request
		this._addToLocationFavoritesArray(locationToAdd);

		const lid = DaoLocation.gId(locationToAdd);
		return ApiClient.userLocationsFavoritesAddLid(lid)
			.then(success => {
				Logger.v('CacheDefUserProfile locationFavAdd: success', lid, success);
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._removeFromLocationFavoritesArray(locationToAdd);
				Logger.v('CacheDefUserProfile locationFavAdd: failed', lid, err);
				return err;
			});
	}

	locationFavRemove(locationToRemove: TLocation) {
		// Update the UI before running the request
		this._removeFromLocationFavoritesArray(locationToRemove);

		const lid = DaoLocation.gId(locationToRemove);
		return ApiClient.userLocationsFavoritesDelLid(lid)
			.then(success => {
				Logger.v('CacheDefUserProfile locationFavRemove: success', lid, success);
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._addToLocationFavoritesArray(locationToRemove);
				Logger.v('CacheDefUserProfile locationFavRemove: failed', lid, err);
				return err;
			});
	}

	putLocationWithULS(locationWithULS: TLocationWithULS) {
		const {executeIfDataNotNull} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const userLocationStatus = DaoLocation.gUserLocationStatus(locationWithULS);
			const ulsId = DaoUserLocationStatus.gId(userLocationStatus);

			// Get the old state (needed if the request fails)
			const oldLocationWithULS: ?TLocationWithULS = Object.assign({}, DaoUser.findUserLocationStatus(thisUser, ulsId));
			this._putToUserLocationStatusesArray(locationWithULS);

			return ApiClient.userStatusAddOrEdit(userLocationStatus)
				.then((newUserLocationStatus: TUserLocationStatus) => {
					// The add was successful and the UserLocationStatus id will
					// have changed, remove {userLocationStatus} and add {newUserLocationStatus}
					this._removeFromUserLocationStatusesArray(locationWithULS);
					const newLocationWithULS = DaoLocation.sUserLocationStatus(locationWithULS, newUserLocationStatus);
					this._putToUserLocationStatusesArray(newLocationWithULS);
					Logger.v('CacheDefUserProfile putLocationWithULS: success', ulsId, newUserLocationStatus);
					return newUserLocationStatus;
				})
				.catch(err => {
					// Revert to the previous state if oldLocationWithULS is not a valid uls
					// then the _putToUserLocationStatusesArray did an edit and we need to
					// edit the object again, if oldLocationWithULS is a valid uls
					// then the _putToUserLocationStatusesArray did an add and we should remove
					if (DaoLocation.hasUserLocationStatus(oldLocationWithULS))
						this._putToUserLocationStatusesArray(oldLocationWithULS);
					else this._removeFromUserLocationStatusesArray(locationWithULS);

					Logger.v('CacheDefUserProfile putLocationWithULS: failed', ulsId, err);
					return err;
				});
		});
	}

	removeLocationWithULS(locationWithULS: TLocationWithULS) {
		// Update the UI before running the request
		this._removeFromUserLocationStatusesArray(locationWithULS);

		const ulsId = DaoLocation.gUserLocationStatusId(locationWithULS);
		return ApiClient.userStatusDel(ulsId)
			.then(success => {
				Logger.v('CacheDefUserProfile removeUserLocationStatus: success', ulsId, success);
				return success;
			})
			.catch(err => {
				// Revert to the previous state
				this._putToUserLocationStatusesArray(locationWithULS);
				Logger.v('CacheDefUserProfile removeUserLocationStatus: failed', ulsId, err);
				return err;
			});
	}

	putAdminLocation(location: TLocation) {
		// Update the UI before running the request
		this._putToAdminLocationsArray(location);

		const lid = DaoLocation.gId(location);
		return ApiClient.userLocationsAdminEditLid(location)
			.then((location: TLocation) => {
				Logger.v('CacheDefUserProfile putAdminLocation: success', lid, location);
				Snackbar.showSuccessStr(t('t_ls_admin_location_added'));
				return location;
			})
			.catch(err => {
				// Revert to the previous state
				this._removeFromAdminLocationsArray(location);
				Logger.v('CacheDefUserProfile putAdminLocation: failed', lid, err);
				Snackbar.showSuccessStr(t('t_le_admin_location_add_failed'));
				return err;
			});
	}

	changeUserPassword(form: TApiFormChangePassword) {
		const {executeIfDataNotNull} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			return ApiClient.accountsChangePassword(DaoUser.gId(thisUser), form);
		});
	}

}