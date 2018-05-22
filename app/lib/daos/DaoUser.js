/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from "./DaoLocation";
import Maps from "../data/Maps";
import ObjectCache from "../helpers/ObjectCache";
import {Const} from '../../Config';
import {denormObj, isValidUrl, mapIdsToObjects} from "../HelperFunctions";
import type {TLocation} from "./DaoLocation";
import type {TLocationWithULS} from "../helpers/ULSListManager";
import type {TUserLocationStatus} from "./DaoUserLocationStatus";


export type TUser = {
	id: number,                           // 1                                	Unique feed item identifier
	pictureUrl: string,                   // 'http://catchme.top/image.png'   	URL of the user profile picture
	name: string,                         // 'Krishan Madan'                  	User name
	reputation: number,                   // 450                              	User reputation
	publicMessage: string,                // 'Hi, i am Krishan Madan'         	User public message
	phone?: string,                       // '+393347014935'                  	Location phone number
	email?: string,                       // 'admin@areadocks.com'            	Location email address
	apiKey?: string,                      // '203984230092384230984'          	Api key is only set if this is current users
	gender?: number,                      // 1                                	User gender id
	settingPrivacy?: string,              // '120'                            	Users privacy settings
	settingNotifications?: string,        // '00101'                          	Users notification settings
	adminLocations?: Array<TLocation>,    // [{...TLocation}, {TLocation} ...]  Locations administered by this user
	connections?: TUserConnections,       // {...TUserConnections}            	Connections
	locations?: TUserLocations,           // {...TUserLocations}              	Locations
	_connectionIds?: TUserConnectionIds,  // {...TUserConnectionIds}          	Connection ids [Lazy], needs refresh
	_locationIds?: TUserLocationIds       // {...TUserLocationIds}            	Location ids [Lazy], needs refresh
};

export type TUserConnections = {
	friends: Array<TUser>,              // [{...TUser}, ...]                People confirmed as friends
	requests: Array<TUser>,             // [{...TUser}, ...]                Pending friend requests
	blocked: Array<TUser>               // [{...TUser}, ...]                People blocked
};
export type TUserConnectionIds = {
	friends: Array<number>,             // [1, 2, 3, 4, 5, ...]             Ids of each friend, lazy and cached
	requests: Array<number>,            // [6, 7, 8, ...]                   Ids of each request, lazy and cached
	blocked: Array<number>              // [9, 10,11, ...]                  Ids of each blocked user, lazy and cached
};

export type TUserLocations = {
	favorites: Array<number>,                         // [1, 2, 3, 4, ...]            Preferred locations by this user, no order
	top: Array<number>,                               // [1, 2, 3, 4, ...]            Where the user has been most, ordered
	userLocationStatuses: Array<TUserLocationStatus>, // [{...TUserLocationStatus}]   All UserLocationStatuses not necessarily ordered
	locations: Array<TLocation>                       // [{...TLocation}, ...]        All locations which have a corresponding id in object
};

export type TUserLocationIds = {
	favorites: Array<number>,             // [1, 2, 3, 4, ...]          Ids of preferred locations by this user, lazy and cached, no order
	top: Array<number>,                   // [1, 2, 3, 4, ...]          Ids of where the user has been most, lazy and cached, ordered
	userLocationStatuses: Array<number>,  // [1, 2, 3, 4, ...]          Ids of where UserLocationStatuses (past, now, future), lazy and cached
	locations: Array<number>              // [1, 2, 3, 4, ...]          Ids of all locations used in the other fields of this object
};


export default class DaoUser {
	static pId = 'id';
	static pPictureUrl = 'pictureUrl';
	static pName = 'name';
	static pReputation = 'reputation';
	static pPublicMessage = 'publicMessage';
	static pPhone = 'phone';
	static pEmail = 'email';
	static pApiKey = 'apiKey';
	static pGender = 'gender';
	static pSettingPrivacy = 'settingPrivacy';
	static pSettingNotifications = 'settingNotifications';
	static pConnections = 'connections';
	static pLocations = 'locations';
	static pConnectionFriends = `${DaoUser.pConnections}.friends`;
	static pConnectionPending = `${DaoUser.pConnections}.pending`;
	static pConnectionRequests = `${DaoUser.pConnections}.requests`;
	static pConnectionBlocked = `${DaoUser.pConnections}.blocked`;
	static pAdminLocations = 'adminLocations';
	static pLocationsFavorites = `${DaoUser.pLocations}.favorites`;
	static pLocationsTop = `${DaoUser.pLocations}.top`;
	static pLocationsUserLocationStatuses = `${DaoUser.pLocations}.userLocationStatuses`;
	static pLocationsLocations = `${DaoUser.pLocations}.locations`;
	static _pConnectionIds = '_connectionIds';
	static _pConnectionFriendIds = `${DaoUser._pConnectionIds}.friends`;
	static _pConnectionPendingIds = `${DaoUser._pConnectionIds}.pending`;
	static _pConnectionRequestIds = `${DaoUser._pConnectionIds}.requests`;
	static _pConnectionBlockedIds = `${DaoUser._pConnectionIds}.blocked`;
	
	
	static shallowCopy(user: TUser): TUser {
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
		_.set(newUser, DaoUser.pAdminLocations, DaoUser.gAdminLocations(user));
		_.set(newUser, DaoUser.pConnectionFriends, DaoUser.gConnectionsFriends(user));
		_.set(newUser, DaoUser.pConnectionPending, DaoUser.gConnectionsPending(user));
		_.set(newUser, DaoUser.pConnectionRequests, DaoUser.gConnectionsRequests(user));
		_.set(newUser, DaoUser.pConnectionBlocked, DaoUser.gConnectionsBlocked(user));
		_.set(newUser, DaoUser.pLocationsFavorites, DaoUser.gLocationsFavoriteIds(user));
		_.set(newUser, DaoUser.pLocationsTop, DaoUser.gLocationsTopIds(user));
		_.set(newUser, DaoUser.pLocationsUserLocationStatuses, DaoUser.gLocationsUserLocationStatuses(user));
		_.set(newUser, DaoUser.pLocationsLocations, DaoUser.gLocationsLocations(user));
		
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
			[DaoUser.pPublicMessage]: ''
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************
	
	static gId(user: TUser): number {
		return _.get(user, DaoUser.pId);
	}
	
	static gPictureUrl(user: TUser): string {
		const pictureUri = _.trim(_.get(user, DaoUser.pPictureUrl));
		return _.isEmpty(pictureUri) ? Const.userDefaultAvatar : pictureUri;
	}
	
	static gName(user: TUser): string {
		return _.get(user, DaoUser.pName);
	}
	
	static gReputation(user: TUser): number {
		return _.get(user, DaoUser.pReputation);
	}
	
	static gPublicMessage(user: TUser): string {
		return _.get(user, DaoUser.pPublicMessage);
	}
	
	static gPhone(user: TUser): string {
		return _.get(user, DaoUser.pPhone);
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
		return _.get(user, DaoUser.pGender, Maps.genderDefault().value);
	}
	
	static gConnections(user: TUser): TUserConnectionIds {
		return _.get(user, DaoUser.pConnections);
	}
	
	static gLocations(user: TUser): Array<TLocation> {
		return _.get(user, DaoUser.pLocations);
	}
	
	static gAdminLocations(user: TUser): Array<TLocation> {
		return _.get(user, DaoUser.pAdminLocations, []);
	}
	
	static gConnectionsFriends(user: TUser): Array<TUser> {
		return _.get(user, DaoUser.pConnectionFriends, []);
	}
	
	static gConnectionsPending(user: TUser): Array<TUser> {
		return _.get(user, DaoUser.pConnectionPending, []);
	}

	static gConnectionsRequests(user: TUser): Array<TUser> {
		return _.get(user, DaoUser.pConnectionRequests, []);
	}
	
	static gConnectionsBlocked(user: TUser): Array<TUser> {
		return _.get(user, DaoUser.pConnectionBlocked, []);
	}
	
	static gLocationsFavoriteIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pLocationsFavorites, []);
	}
	
	static gLocationsTopIds(user: TUser): Array<number> {
		return _.get(user, DaoUser.pLocationsTop, []);
	}
	
	static gLocationsUserLocationStatuses(user: TUser): Array<TUserLocationStatus> {
		return _.get(user, DaoUser.pLocationsUserLocationStatuses, []);
	}
	
	static gLocationsLocations(user: TUser): Array<TLocation> {
		return _.get(user, DaoUser.pLocationsLocations, []);
	}


// CacheAccessors ***************************************************************************************
// CacheAccessors ***************************************************************************************

	static invalidateConnectionFriendIds(user: TUser) {
		ObjectCache.invalidate(user, DaoUser._pConnectionFriendIds);
	}

	static invalidateConnectionBlockedIds(user: TUser) {
		ObjectCache.invalidate(user, DaoUser._pConnectionBlockedIds);
	}
	
	static gConnectionFriendIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionFriendIds,
			() => DaoUser.gConnectionsFriends(user).map(DaoUser.gId)
		);
	}

	static gConnectionPendingIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionPendingIds,
			() => DaoUser.gConnectionsPending(user).map(DaoUser.gId)
		);
	}
	
	static gConnectionRequestIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionRequestIds,
			() => DaoUser.gConnectionsRequests(user).map(DaoUser.gId)
		);
	}
	
	static gConnectionBlockedIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionBlockedIds,
			() => DaoUser.gConnectionsBlocked(user).map(DaoUser.gId)
		);
	}


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************
	
	static gLocationsFavorites(user: TUser) {
		return mapIdsToObjects(
			DaoUser.gLocationsFavoriteIds(user),
			DaoUser.gLocationsLocations(user),
			DaoLocation.gId
		);
	}
	
	static gLocationsTop(user: TUser) {
		return mapIdsToObjects(
			DaoUser.gLocationsTopIds(user),
			DaoUser.gLocationsLocations(user),
			DaoLocation.gId
		);
	}
	
	
	static hasPhone(user: TUser) {
		return !_.isEmpty(DaoUser.gPhone(user));
	}
	
	static hasEmail(user: TUser) {
		return !_.isEmpty(DaoUser.gEmail(user));
	}
	
	static hasConnections(user: TUser) {
		return DaoUser.pConnections in user;
	}
	
	static hasLocations(user: TUser) {
		return DaoUser.pLocations in user;
	}

	static hasNewImage(user: TUser): boolean {
		const image = DaoUser.gPictureUrl(user);
		return image != null
			&& image != Const.userDefaultAvatar
			&& !isValidUrl(image);
	}

	static gIdStr(user: TUser): string {
		return DaoUser.gId(user).toString();
	}

	static findUserLocationStatus(user: TUser, ulsId: number): ?TLocationWithULS {
		const locationsWithULSs = DaoUser.gLocationsUserLocationStatuses(user);
		return locationsWithULSs.find(locationWithULS => DaoLocation.isUlSInLocation(ulsId, locationWithULS));
	}


}