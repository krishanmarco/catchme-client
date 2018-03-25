/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from "./DaoLocation";
import Maps from "../data/Maps";
import ObjectCache from "../helpers/ObjectCache";
import {Const} from '../../Config';
import {denormObj, mapIdsToObjects} from "../HelperFunctions";
import type {TLocation} from "./DaoLocation";
import type {TUserLocationStatus} from "./DaoUserLocationStatus";
import ManagerWeekTimings from "../helpers/ManagerWeekTimings";


export type TUser = {
	id: number,                           // 1                                Unique feed item identifier
	pictureUrl: string,                   // 'http://catchme.top/image.png'   URL of the user profile picture
	name: string,                         // 'Krishan Madan'                  User name
	reputation: number,                   // 450                              User reputation
	publicMessage: string,                // 'Hi, i am Krishan Madan'         User public message
	phone?: string,                       // '+393347014935'                  Location phone number
	email?: string,                       // 'admin@areadocks.com'            Location email address
	apiKey?: string,                      // '203984230092384230984'          Api key is only set if this is current users
	gender?: number,                      // 1                                User gender id
	settingPrivacy?: string,              // '120'                            Users privacy settings
	settingNotifications?: string,        // '00101'                          Users notification settings
	adminLocations?: Array<TLocation>,    // [1, 2, 3, 4, ...]            Locations administered by this user
	connections?: TUserConnections,       // {...TUserConnections}            Connections
	locations?: TUserLocations,           // {...TUserLocations}              Locations
	_connectionIds?: TUserConnectionIds,  // {...TUserConnectionIds}          Connection ids [Lazy], needs refresh
	_locationIds?: TUserLocationIds       // {...TUserLocationIds}            Location ids [Lazy], needs refresh
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
	static pConnectionRequests = `${DaoUser.pConnections}.requests`;
	static pConnectionBlocked = `${DaoUser.pConnections}.blocked`;
	static pAdminLocations = 'adminLocations';
	static pLocationsFavorites = `${DaoUser.pLocations}.favorites`;
	static pLocationsTop = `${DaoUser.pLocations}.top`;
	static pLocationsUserLocationStatuses = `${DaoUser.pLocations}.userLocationStatuses`;
	static pLocationsLocations = `${DaoUser.pLocations}.locations`;
	static _pConnectionIds = '_connectionIds';
	static _pConnectionFriendIds = `${DaoUser._pConnectionIds}.friends`;
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
		_.set(newUser, DaoUser.pConnectionRequests, DaoUser.gConnectionsRequests(user));
		_.set(newUser, DaoUser.pConnectionBlocked, DaoUser.gConnectionsBlocked(user));
		_.set(newUser, DaoUser.pLocationsFavorites, DaoUser.gLocationsFavoriteIds(user));
		_.set(newUser, DaoUser.pLocationsTop, DaoUser.gLocationsTopIds(user));
		_.set(newUser, DaoUser.pLocationsUserLocationStatuses, DaoUser.gLocationsUserLocationStatuses(user));
		_.set(newUser, DaoUser.pLocationsLocations, DaoUser.gLocationsLocations(user));
		
		// Private fields (_) will have to be recalculated...
		return newUser;
	}


	static newInstance(): TUser {
		return denormObj({
			// To allow a new user to be saved to the server
			// through the 'edit' entry-point the id has to be -1
			[DaoUser.pSettingPrivacy]: Const.DaoUser.defaultPrivacySettings,
			[DaoUser.pSettingNotifications]: Const.DaoUser.defaultNotificationSettings,
			[DaoUser.pPictureUrl]: '',
			[DaoUser.pPhone]: '',
			[DaoUser.pEmail]: '',
			[DaoUser.pPublicMessage]: ''
		});
	}


// Accessors ********************************************************************************************
// Accessors ********************************************************************************************
	
	static gId(user: TUser) {
		return _.get(user, DaoUser.pId);
	}
	
	static gPictureUrl(user: TUser) {
		return _.get(user, DaoUser.pPictureUrl);
	}
	
	static gName(user: TUser) {
		return _.get(user, DaoUser.pName);
	}
	
	static gReputation(user: TUser) {
		return _.get(user, DaoUser.pReputation);
	}
	
	static gPublicMessage(user: TUser) {
		return _.get(user, DaoUser.pPublicMessage);
	}
	
	static gPhone(user: TUser) {
		return _.get(user, DaoUser.pPhone);
	}
	
	static gEmail(user: TUser) {
		return _.get(user, DaoUser.pEmail);
	}
	
	static gApiKey(user: TUser) {
		return _.get(user, DaoUser.pApiKey);
	}
	
	static gSettingPrivacy(user: TUser) {
		return _.get(user, DaoUser.pSettingPrivacy, Const.DaoUser.defaultPrivacySettings);
	}
	
	static gSettingNotifications(user: TUser) {
		return _.get(user, DaoUser.pSettingNotifications, Const.DaoUser.defaultNotificationSettings);
	}
	
	static gGender(user: TUser) {
		return _.get(user, DaoUser.pGender, Maps.genderDefault().value);
	}
	
	static gConnections(user: TUser) {
		return _.get(user, DaoUser.pConnections);
	}
	
	static gLocations(user: TUser) {
		return _.get(user, DaoUser.pLocations);
	}
	
	static gAdminLocations(user: TUser): Array<TLocation> {
		return _.get(user, DaoUser.pAdminLocations, []);
	}
	
	static gConnectionsFriends(user: TUser): Array<TUser> {
		return _.get(user, DaoUser.pConnectionFriends, []);
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
	
	static gConnectionFriendIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionFriendIds,
			() => _.get(user, DaoUser.pConnectionFriends, []).map(DaoUser.gId)
		);
	}
	
	static gConnectionRequestIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionRequestIds,
			() => _.get(user, DaoUser.pConnectionRequests, []).map(DaoUser.gId)
		);
	}
	
	static gConnectionBlockedIds(user: TUser) {
		return ObjectCache.get(user, DaoUser._pConnectionBlockedIds,
			() => _.get(user, DaoUser.pConnectionBlocked, []).map(DaoUser.gId)
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
		return DaoUser.pPhone in user;
	}
	
	static hasEmail(user: TUser) {
		return DaoUser.pEmail in user;
	}
	
	static hasConnections(user: TUser) {
		return DaoUser.pConnections in user;
	}
	
	static hasLocations(user: TUser) {
		return DaoUser.pLocations in user;
	}


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************
	
	static addLocationToFavorites(user: TUser, location: TLocation) {
		const locationId = DaoLocation.gId(location);
		
		// Get all the location ids
		let favoriteLocationIds = DaoUser.gLocationsFavoriteIds(user);
		
		// If this is already a favorite location don't do anything
		if (favoriteLocationIds.includes(locationId))
			return;
		
		// This location needs to be added to the favorite location list
		favoriteLocationIds.push(locationId);
		
		// Set the new list into the user.locations object
		user[DaoUser.pLocationsFavorites] = favoriteLocationIds;
		
		
		// Get the list of locations associated to the user.locations object
		const locations = DaoUser.gLocationsLocations(user);
		
		const locationAlreadyIncluded = _.some(locations, l => DaoLocation.gId(l) == locationId);
		if (locationAlreadyIncluded)
			return;
		
		// The location needs to be added to the accumulated locations
		locations.push(location);
		
		// Set the new list into the user.locations object
		user[DaoUser.pLocationsLocations] = locations;
	}
	
	static removeLocationFromFavorites(user: TUser, location: TLocation) {
		const favoriteLocations = DaoUser.gLocationsFavoriteIds(user);
		_.remove(favoriteLocations, DaoLocation.gId(location));
		user[DaoUser.pLocationsFavorites] = favoriteLocations;
	}
	
	
}