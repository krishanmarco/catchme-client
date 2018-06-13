/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from './DaoLocation';
import DaoMetadata from './DaoMetadata';
import Maps from '../data/Maps';
import {Const} from '../../Config';
import {denormObj, isValidUrl} from '../HelperFunctions';
import type {TLocation} from './DaoLocation';
import type {TLocationWithULS} from '../helpers/ULSListManager';
import type {TMetadata} from './DaoMetadata';
import type {TUserLocationStatus} from './DaoUserLocationStatus';

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
	static pLocationsFavoriteIds = 'locationsFavoritesIds';
	static pLocationsTopIds = 'locationsTopIds';
	static pLocationsUserLocationIds = 'locationsUserLocationIds';
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
		_.set(newUser, DaoUser.pLocationsUserLocationIds, DaoUser.gLocationsUserLocationIds(user));
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

	static gLocationsUserLocationIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pLocationsUserLocationIds, []);
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
	
// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************

	static gLocationsAdmin(user: TUser): Array<TLocation> {
		return DaoMetadata.gLocationsFromIds(DaoUser.gMetadata(user), DaoUser.gLocationsAdminIds(user));
	}

	static gLocationsFavorites(user: TUser) {
		return DaoMetadata.gLocationsFromIds(DaoUser.gMetadata(user), DaoUser.gLocationsFavoriteIds(user));
	}

	static gLocationsTop(user: TUser) {
		return DaoMetadata.gLocationsFromIds(DaoUser.gMetadata(user), DaoUser.gLocationsTopIds(user));
	}

	static gLocationsUserLocations(user: TUser): Array<TUserLocationStatus> {
		return DaoMetadata.gUserLocationsFromIds(DaoUser.gMetadata(user), DaoUser.gLocationsUserLocationIds(user));
	}

	static gConnectionsFriends(user: TUser): Array<TUser> {
		return DaoMetadata.gUsersFromIds(DaoUser.gMetadata(user), DaoUser.gConnectionsFriendIds(user));
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