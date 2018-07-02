/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import _ from 'lodash';
import ApiClient from '../../../data/ApiClient';
import CacheDef from '../CacheDef';
import DaoLocation from '../../../daos/DaoLocation';
import DaoMetadata from '../../../daos/DaoMetadata';
import DaoUser from '../../../daos/DaoUser';
import DaoUserLocationStatus from '../../../daos/DaoUserLocationStatus';
import Logger from '../../../Logger';
import {CacheState} from '../CacheModel';
import {Snackbar} from '../../../Snackbar';
import {t} from '../../../i18n/Translations';
import type {TApiFormChangePassword} from '../../../daos/DaoApiFormChangePassword';
import type {TCacheDef} from '../CacheDef';
import type {TId, TThunk} from '../../../types/Types';
import type {TLocation} from '../../../daos/DaoLocation';
import type {TLocationWithULS} from '../../../helpers/ULSListManager';
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

	_putToUserLocationStatusesArray(locationWithULS: TLocationWithULS, removeUlids: Array<TId>) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeUserLocation(thisUser, removeUlids);
			DaoUser.addUserLocation(thisUser, locationWithULS);
			setData(thisUser);
		});
	}

	_putToAdminLocationsArray(locationToAdd: TLocation, removeLids: Array<TId>) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeLocationsAdmin(thisUser, removeLids);
			DaoUser.addLocationsAdmin(thisUser, locationToAdd);
			setData(thisUser);
		});
	}

	_addToLocationFavoritesArray(locationToAdd: TLocation) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.addLocationsFavorite(thisUser, locationToAdd);
			setData(thisUser);
		});
	}

	_addUserToConnectionsFriends(userToAdd: TUser) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.addConnectionsFriend(thisUser, userToAdd);
			setData(thisUser);
		});
	}

	_addUserToConnectionsPending(userToAdd: TUser) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.addConnectionsPending(thisUser, userToAdd);
			setData(thisUser);
		});
	}

	_addUserToConnectionsBlocked(userToAdd: TUser) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.addConnectionsBlocked(thisUser, userToAdd);
			setData(thisUser);
		});
	}

	_removeFromUserLocationStatusesArray(locationWithULS: TLocationWithULS) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const ulid = DaoUserLocationStatus.gId(DaoLocation.gUserLocationStatus(locationWithULS));
			DaoUser.removeUserLocation(thisUser, [ulid]);
			setData(thisUser);
		});
	}

	_removeFromLocationFavoritesArray(locationToRemove: TLocation) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeLocationsFavorite(thisUser, [DaoLocation.gId(locationToRemove)]);
			setData(thisUser);
		});
	}

	_removeFromAdminLocationsArray(locationToRemove: TLocation) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeLocationsAdmin(thisUser, [DaoLocation.gId(locationToRemove)]);
			setData(thisUser);
		});
	}

	_removeUserFromConnectionsFriends(userToRemove: TUser) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeConnectionsFriend(thisUser, [DaoUser.gId(userToRemove)]);
			setData(thisUser);
		});
	}

	_removeUserFromConnectionsPending(userToRemove: TUser) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeConnectionsPending(thisUser, [DaoUser.gId(userToRemove)]);
			setData(thisUser);
		});
	}

	_removeUserFromConnectionsBlocked(userToRemove: TUser) {
		const {executeIfDataNotNull, setData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			DaoUser.removeConnectionsBlocked(thisUser, [DaoUser.gId(userToRemove)]);
			setData(thisUser);
		});
	}

	editUser(user: TUser) {
		const {executeIfDataNotNull, mergeData} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const oldUser = {...thisUser};
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

	putLocationWithULS(newOrEditedLocationWithULS: TLocationWithULS) {
		const {executeIfDataNotNull} = this;
		return executeIfDataNotNull((thisUser: TUser) => {
			const newOrEditedUserLocation = DaoLocation.gUserLocationStatus(newOrEditedLocationWithULS);
			const newOrEditedUlid = DaoUserLocationStatus.gId(newOrEditedUserLocation);

			// Get the old state (needed if the request fails), must be before putting new object
			const oldUserLocation = {...DaoUser.findUserLocationStatus(thisUser, newOrEditedUlid)};
			const oldUserLocationId = DaoUserLocationStatus.gId(oldUserLocation);
			this._putToUserLocationStatusesArray(newOrEditedLocationWithULS);

			return ApiClient.userStatusAddOrEdit(newOrEditedUserLocation)
				.then((userLocationWithId: TUserLocationStatus) => {
					// The add was successful and the UserLocationStatus id will
					// have changed, remove {userLocationStatus} and add {newUserLocationStatus}
					const locationWithNewULS = DaoLocation.sUserLocationStatus(newOrEditedLocationWithULS, userLocationWithId);
					this._putToUserLocationStatusesArray(locationWithNewULS, [-1, oldUserLocationId]);
					Logger.v('CacheDefUserProfile putLocationWithULS: success', newOrEditedUlid, userLocationWithId);
					return userLocationWithId;
				})
				.catch(err => {
					// Revert to the previous state if oldLocationWithULS is not a valid uls
					// then the _putToUserLocationStatusesArray did an edit and we need to
					// edit the object again, if oldLocationWithULS is a valid uls
					// then the _putToUserLocationStatusesArray did an add and we should remove
					const locationWithOldULS = DaoLocation.sUserLocationStatus(newOrEditedLocationWithULS, oldUserLocation);

					if (oldUserLocation != null)
						this._putToUserLocationStatusesArray(locationWithOldULS);
					else this._removeFromUserLocationStatusesArray(locationWithOldULS);

					Logger.v('CacheDefUserProfile putLocationWithULS: failed', newOrEditedUlid, err);
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
			.then((locationWithId: TLocation) => {
				Logger.v('CacheDefUserProfile putAdminLocation: success', lid, locationWithId);
				this._putToAdminLocationsArray(locationWithId, [-1]);
				Snackbar.showSuccessStr(t('t_ls_admin_location_added'));
				return locationWithId;
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