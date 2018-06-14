/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import type {TLocation} from './DaoLocation';
import DaoLocation from './DaoLocation';
import type {TMetadata} from './DaoMetadata';
import DaoMetadata from './DaoMetadata';
import Maps from '../data/Maps';
import {Const} from '../../Config';
import {denormObj, isValidUrl} from '../HelperFunctions';
import type {TLocationWithULS} from '../helpers/ULSListManager';
import type {TUserLocationStatus} from './DaoUserLocationStatus';
import type {TId} from "../types/Types";
import DaoUserLocationStatus from "./DaoUserLocationStatus";

export type TUser = {
	id: number,
	name: string,
	email?: string,
	apiKey?: string,
	settingPrivacy?: string,
	settingNotifications?: string,
	gender?: number,
	reputation: number,
	phone?: string,
	publicMessage: string,
	pictureUrl: string,
	locationsAdminIds: Array<number>,
	locationsFavoritesIds: Array<number>,
	locationsTopIds: Array<number>,
	locationsUserLocationIds: Array<number>,
	connectionsFriendsIds: Array<number>,
	connectionsPendingIds: Array<number>,
	connectionsRequestIds: Array<number>,
	connectionsBlockedIds: Array<number>,
	metadata: TMetadata
};

export default class DaoUser {
	static pId = 'id';
	static pName = 'name';
	static pEmail = 'email';
	static pApiKey = 'apiKey';
	static pSettingPrivacy = 'settingPrivacy';
	static pSettingNotifications = 'settingNotifications';
	static pGender = 'gender';
	static pReputation = 'reputation';
	static pPhone = 'phone';
	static pPublicMessage = 'publicMessage';
	static pPictureUrl = 'pictureUrl';
	static pLocationsAdminIds = 'locationsAdminIds';
	static pLocationsFavoriteIds = 'locationsFavoriteIds';
	static pLocationsTopIds = 'locationsTopIds';
	static pUserLocationIds = 'locationsUserLocationIds';
	static pConnectionsFriendIds = 'connectionsFriendIds';
	static pConnectionsPendingIds = 'connectionsPendingIds';
	static pConnectionsRequestIds = 'connectionsRequestIds';
	static pConnectionsBlockedIds = 'connectionsBlockedIds';
	static pMetadata = 'metadata';

	static shallowCopy(user: TUser): TUser {
		const newUser = {};
		_.set(newUser, DaoUser.pId, DaoUser.gId(user));
		_.set(newUser, DaoUser.pName, DaoUser.gName(user));
		_.set(newUser, DaoUser.pEmail, DaoUser.gEmail(user));
		_.set(newUser, DaoUser.pApiKey, DaoUser.gApiKey(user));
		_.set(newUser, DaoUser.pSettingPrivacy, DaoUser.gSettingPrivacy(user));
		_.set(newUser, DaoUser.pSettingNotifications, DaoUser.gSettingNotifications(user));
		_.set(newUser, DaoUser.pGender, DaoUser.gGender(user));
		_.set(newUser, DaoUser.pReputation, DaoUser.gReputation(user));
		_.set(newUser, DaoUser.pPhone, DaoUser.gPhone(user));
		_.set(newUser, DaoUser.pPublicMessage, DaoUser.gPublicMessage(user));
		_.set(newUser, DaoUser.pPictureUrl, DaoUser.gPictureUrl(user));
		_.set(newUser, DaoUser.pLocationsAdminIds, DaoUser.gLocationsAdminIds(user));
		_.set(newUser, DaoUser.pLocationsFavoriteIds, DaoUser.gLocationsFavoriteIds(user));
		_.set(newUser, DaoUser.pLocationsTopIds, DaoUser.gLocationsTopIds(user));
		_.set(newUser, DaoUser.pUserLocationIds, DaoUser.gUserLocationIds(user));
		_.set(newUser, DaoUser.pConnectionsFriendIds, DaoUser.gConnectionsFriendIds(user));
		_.set(newUser, DaoUser.pConnectionsPendingIds, DaoUser.gConnectionsPendingIds(user));
		_.set(newUser, DaoUser.pConnectionsRequestIds, DaoUser.gConnectionsRequestIds(user));
		_.set(newUser, DaoUser.pConnectionsBlockedIds, DaoUser.gConnectionsBlockedIds(user));
		_.set(newUser, DaoUser.pMetadata, DaoMetadata.shallowCopy(DaoUser.gMetadata(user)));
		// Private fields (_) will have to be recalculated...
		return newUser;
	}

	static apiClean(user: TUser): TUser {
		const newUser = {};
		_.set(newUser, DaoUser.pId, DaoUser.gId(user));
		_.set(newUser, DaoUser.pPictureUrl, DaoUser.gPictureUrl(user));
		_.set(newUser, DaoUser.pName, DaoUser.gName(user));
		_.set(newUser, DaoUser.pReputation, DaoUser.gReputation(user));
		_.set(newUser, DaoUser.pPublicMessage, DaoUser.gPublicMessage(user));
		_.set(newUser, DaoUser.pPhone, DaoUser.gPhone(user));
		_.set(newUser, DaoUser.pEmail, DaoUser.gEmail(user));
		_.set(newUser, DaoUser.pApiKey, DaoUser.gApiKey(user));
		_.set(newUser, DaoUser.pSettingPrivacy, DaoUser.gSettingPrivacy(user));
		_.set(newUser, DaoUser.pSettingNotifications, DaoUser.gSettingNotifications(user));
		return newUser;
	}


	static newInstance(): TUser {
		return denormObj({
			// To allow a new user to be saved to the server
			// through the 'edit' entry-point the id has to be -1
			[DaoUser.pId]: -1,
			[DaoUser.pName]: '',
			[DaoUser.pSettingPrivacy]: Const.userDefaultPrivacySettings,
			[DaoUser.pSettingNotifications]: Const.userDefaultNotificationsSettings,
			[DaoUser.pReputation]: 0,
			[DaoUser.pPictureUrl]: '',
			[DaoUser.pPhone]: '',
			[DaoUser.pEmail]: '',
			[DaoUser.pPublicMessage]: '',
			[DaoUser.pMetadata]: DaoMetadata.newInstance()
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************

	static gId(user: TUser): number {
		return _.get(user, DaoUser.pId);
	}

	static gName(user: TUser): string {
		return _.get(user, DaoUser.pName);
	}

	static gEmail(user: TUser): string {
		return _.get(user, DaoUser.pEmail);
	}

	static gApiKey(user: TUser): string {
		return _.get(user, DaoUser.pApiKey);
	}

	static gSettingPrivacy(user: TUser): string {
		return _.get(user, DaoUser.pSettingPrivacy, Const.userDefaultPrivacySettings);
	}

	static gSettingNotifications(user: TUser): string {
		return _.get(user, DaoUser.pSettingNotifications, Const.userDefaultNotificationsSettings);
	}

	static gGender(user: TUser): number {
		return _.get(user, DaoUser.pGender, Maps.genders.def.id);
	}

	static gReputation(user: TUser): number {
		return _.get(user, DaoUser.pReputation);
	}

	static gPhone(user: TUser): string {
		return _.get(user, DaoUser.pPhone);
	}

	static gPublicMessage(user: TUser): string {
		return _.get(user, DaoUser.pPublicMessage);
	}

	static gPictureUrl(user: TUser): string {
		const pictureUri = _.trim(_.get(user, DaoUser.pPictureUrl));
		return _.isEmpty(pictureUri) ? Const.userDefaultAvatar : pictureUri;
	}

	static gLocationsAdminIds(user: TUser): Array<TLocation> {
		return _.get(user, DaoUser.pLocationsAdminIds, []);
	}

	static gLocationsFavoriteIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pLocationsFavoriteIds, []);
	}

	static gLocationsTopIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pLocationsTopIds, []);
	}

	static gUserLocationIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pUserLocationIds, []);
	}

	static gConnectionsFriendIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pConnectionsFriendIds, []);
	}

	static gConnectionsPendingIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pConnectionsPendingIds, []);
	}

	static gConnectionsRequestIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pConnectionsRequestIds, []);
	}

	static gConnectionsBlockedIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pConnectionsBlockedIds, []);
	}

	static gMetadata(user: TUser): TMetadata {
		return _.get(user, DaoUser.pMetadata, {});
	}

// Modifiers ********************************************************************************************
// Modifiers ********************************************************************************************

	static removeLocationsFavorite(user: TUser, lid: TId) {
		const locationsFavoriteIds = DaoUser.gLocationsFavoriteIds(user);
		_.remove(locationsFavoriteIds, _lid => _lid == lid);
		_.set(user, DaoUser.pLocationsFavoriteIds, locationsFavoriteIds);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pLocations, DaoUser.pLocationsFavoriteIds);
	}

	static removeLocationsAdmin(user: TUser, lids: Array<TId>) {
		const locationsAdminIds = DaoUser.gLocationsAdminIds(user);
		_.remove(locationsAdminIds, lid => lids.includes(lid));
		_.set(user, DaoUser.pLocationsAdminIds, locationsAdminIds);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pLocations, DaoUser.pLocationsAdminIds);
	}

	static removeUserLocation(user: TUser, ulids: Array<TId> = []) {
		const userLocationIds = DaoUser.gUserLocationIds(user);
		_.remove(userLocationIds, ulid => ulids.includes(ulid));
		_.set(user, DaoUser.pUserLocationIds, userLocationIds);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUserLocations, DaoUser.pUserLocationIds);
	}

	static removeConnectionsFriend(user: TUser, uid: TId) {
		const connectionsFriendIds = DaoUser.gConnectionsFriendIds(user);
		_.remove(connectionsFriendIds, _uid => _uid == uid);
		_.set(user, DaoUser.pConnectionsFriendIds, connectionsFriendIds);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUsers, DaoUser.pConnectionsFriendIds);
	}

	static removeConnectionsPending(user: TUser, uid: TId) {
		const connectionsPendingIds = DaoUser.gConnectionsPendingIds(user);
		_.remove(connectionsPendingIds, _uid => _uid == uid);
		_.set(user, DaoUser.pConnectionsPendingIds, connectionsPendingIds);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUsers, DaoUser.pConnectionsPendingIds);
	}

	static removeConnectionsBlocked(user: TUser, uid: TId) {
		const connectionsBlockedIds = DaoUser.gConnectionsBlockedIds(user);
		_.remove(connectionsBlockedIds, _uid => _uid == uid);
		_.set(user, DaoUser.pConnectionsBlockedIds, connectionsBlockedIds);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUsers, DaoUser.pConnectionsBlockedIds);
	}

	static addUserLocation(user: TUser, locationWithULD: TLocationWithULS) {
		const userLocation = DaoLocation.gUserLocationStatus(locationWithULD);
		const ulidToAdd = DaoUserLocationStatus.gId(userLocation);
		const userLocationIds = DaoUser.gUserLocationIds(user);
		userLocationIds.push(ulidToAdd);
		_.set(user, DaoUser.pUserLocationIds, userLocationIds);
		DaoMetadata.putUserLocation(DaoUser.gMetadata(user), userLocation);
		DaoMetadata.putLocation(DaoUser.gMetadata(user), locationWithULD);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUserLocations, DaoUser.pUserLocationIds);
	}

	static addLocationsFavorite(user: TUser, locationToAdd: TLocation) {
		const lidToAdd = DaoLocation.gId(locationToAdd);
		const locationFavoriteIds = DaoUser.gLocationsFavoriteIds(user);
		locationFavoriteIds.push(lidToAdd);
		_.set(user, DaoUser.pLocationsFavoriteIds, locationFavoriteIds);
		DaoMetadata.putLocation(DaoUser.gMetadata(user), locationToAdd);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pLocations, DaoUser.pLocationsFavoriteIds);
	}

	static addLocationsAdmin(user: TUser, locationToAdd: TLocation) {
		const lidToAdd = DaoLocation.gId(locationToAdd);
		const locationAdminIds = DaoUser.gLocationsAdminIds(user);
		locationAdminIds.push(lidToAdd);
		_.set(user, DaoUser.pLocationsAdminIds, locationAdminIds);
		DaoMetadata.putLocation(DaoUser.gMetadata(user), locationToAdd);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pLocations, DaoUser.pLocationsAdminIds);
	}

	static addConnectionsFriend(user: TUser, userToAdd: TUser) {
		const uidToAdd = DaoUser.gId(userToAdd);
		const connectionFriendIds = DaoUser.gConnectionsFriendIds(user);
		connectionFriendIds.push(uidToAdd);
		_.set(user, DaoUser.pConnectionsFriendIds, connectionFriendIds);
		DaoMetadata.putUser(DaoUser.gMetadata(user), userToAdd);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUsers, DaoUser.pConnectionsFriendIds);
	}

	static addConnectionsPending(user: TUser, userToAdd: TUser) {
		const uidToAdd = DaoUser.gId(userToAdd);
		const connectionPendingIds = DaoUser.gConnectionsPendingIds(user);
		connectionPendingIds.push(uidToAdd);
		_.set(user, DaoUser.pConnectionsPendingIds, connectionPendingIds);
		DaoMetadata.putUser(DaoUser.gMetadata(user), userToAdd);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUsers, DaoUser.pConnectionsPendingIds);
	}

	static addConnectionsBlocked(user: TUser, userToAdd: TUser) {
		const uidToAdd = DaoUser.gId(userToAdd);
		const connectionBlockedIds = DaoUser.gConnectionsBlockedIds(user);
		connectionBlockedIds.push(uidToAdd);
		_.set(user, DaoUser.pConnectionsBlockedIds, connectionBlockedIds);
		DaoMetadata.putUser(DaoUser.gMetadata(user), userToAdd);
		DaoMetadata.cInvalidateObject(DaoUser.gMetadata(user), DaoMetadata.pUsers, DaoUser.pConnectionsBlockedIds);
	}


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************

	static gLocationsAdmin(user: TUser): Array<TLocation> {
		return DaoMetadata.gLocationsFromIds(
			DaoUser.gMetadata(user),
			DaoUser.gLocationsAdminIds(user),
			DaoUser.pLocationsAdminIds
		);
	}

	static gLocationsFavorites(user: TUser) {
		return DaoMetadata.gLocationsFromIds(
			DaoUser.gMetadata(user),
			DaoUser.gLocationsFavoriteIds(user),
			DaoUser.pLocationsFavoriteIds
		);
	}

	static gLocationsTop(user: TUser) {
		return DaoMetadata.gLocationsFromIds(
			DaoUser.gMetadata(user),
			DaoUser.gLocationsTopIds(user),
			DaoUser.pLocationsTopIds
		);
	}

	static gLocationsUserLocations(user: TUser): Array<TUserLocationStatus> {
		return DaoMetadata.gUserLocationsFromIds(
			DaoUser.gMetadata(user),
			DaoUser.gUserLocationIds(user),
			DaoUser.pUserLocationIds
		);
	}

	static gConnectionsFriends(user: TUser): Array<TUser> {
		return DaoMetadata.gUsersFromIds(
			DaoUser.gMetadata(user),
			DaoUser.gConnectionsFriendIds(user),
			DaoUser.pConnectionsFriendIds
		);
	}

	static hasPhone(user: TUser) {
		return !_.isEmpty(DaoUser.gPhone(user));
	}

	static hasEmail(user: TUser) {
		return !_.isEmpty(DaoUser.gEmail(user));
	}

	static hasNewImage(user: TUser): boolean {
		const image = DaoUser.gPictureUrl(user);
		return image != null && image != Const.userDefaultAvatar && !isValidUrl(image);
	}

	static gIdStr(user: TUser): string {
		return DaoUser.gId(user).toString();
	}

	static findUserLocationStatus(user: TUser, ulsId: number): ?TLocationWithULS {
		const locationsWithULSs = DaoUser.gLocationsUserLocations(user);
		return locationsWithULSs.find(locationWithULS => DaoLocation.isUlSInLocation(ulsId, locationWithULS));
	}

	static isSameUser(user1: TUser, user2: TUser) {
		return DaoUser.gId(user1) === DaoUser.gId(user2);
	}

}