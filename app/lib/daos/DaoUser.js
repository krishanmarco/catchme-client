/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {Const} from '../../Config';
import ObjectCache from "../helpers/ObjectCache";
import DaoLocation from "./DaoLocation";
import Maps from "../data/Maps";
import type {TLocation} from "./DaoLocation";


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
  favorites: Array<TLocation>,        // [1, 2, 3, 4, ...]            Preferred locations by this user
  top: Array<TLocation>,              // [1, 2, 3, 4, ...]            Where the user has been most
  past: Array<TLocation>,             // [1, 2, 3, 4, ...]            Where the user has been
  now: Array<TLocation>,              // [1, 2, 3, 4, ...]            Where the user is now
  future: Array<TLocation>            // [1, 2, 3, 4, ...]            Where the user will be later
};

export type TUserLocationIds = {
  favorites: Array<number>,        // [1, 2, 3, 4, ...]               Ids of preferred locations by this user, lazy and cached
  top: Array<number>,              // [1, 2, 3, 4, ...]               Ids of where the user has been most, lazy and cached
  past: Array<number>,             // [1, 2, 3, 4, ...]               Ids of where the user has been, lazy and cached
  now: Array<number>,              // [1, 2, 3, 4, ...]               Ids of Where the user is now, lazy and cached
  future: Array<number>            // [1, 2, 3, 4, ...]               Ids of where the user will be later, lazy and cached
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
  static pAdminLocations = 'adminLocations';
  static pConnections = 'connections';
  static pLocations = 'locations';
  static pConnectionFriends = `${DaoUser.pConnections}.friends`;
  static pConnectionRequests = `${DaoUser.pConnections}.requests`;
  static pConnectionBlocked = `${DaoUser.pConnections}.blocked`;
  static pLocationsFavorite = `${DaoUser.pLocations}.favorites`;
  static pLocationsTop = `${DaoUser.pLocations}.top`;
  static pLocationsPast = `${DaoUser.pLocations}.past`;
  static pLocationsNow = `${DaoUser.pLocations}.now`;
  static pLocationsFuture = `${DaoUser.pLocations}.future`;
  static _pConnectionIds = '_connectionIds';
  static _pLocationIds = '_locationIds';
  static _pConnectionFriendIds = `${DaoUser._pConnectionIds}.friends`;
  static _pConnectionRequestIds = `${DaoUser._pConnectionIds}.requests`;
  static _pConnectionBlockedIds = `${DaoUser._pConnectionIds}.blocked`;
  static _pLocationFavoriteIds = `${DaoUser._pLocationIds}.favorites`;
  
  
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
    _.set(newUser, DaoUser.pLocationsFavorite, DaoUser.gLocationsFavorite(user));
    _.set(newUser, DaoUser.pLocationsTop, DaoUser.gLocationsTop(user));
    _.set(newUser, DaoUser.pLocationsPast, DaoUser.gLocationsPast(user));
    _.set(newUser, DaoUser.pLocationsNow, DaoUser.gLocationsNow(user));
    _.set(newUser, DaoUser.pLocationsFuture, DaoUser.gLocationsFuture(user));
    // Private fields (_) will have to be recalculated...
    return newUser;
  }
  
  
  


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

  static gAdminLocations(user: TUser) {
    return _.get(user, DaoUser.pAdminLocations, []);
  }

  static gConnectionsFriends(user: TUser) {
    return _.get(user, DaoUser.pConnectionFriends, []);
  }

  static gConnectionsRequests(user: TUser) {
    return _.get(user, DaoUser.pConnectionRequests, []);
  }

  static gConnectionsBlocked(user: TUser) {
    return _.get(user, DaoUser.pConnectionBlocked, []);
  }

  static gLocationsFavorite(user: TUser) {
    return _.get(user, DaoUser.pLocationsFavorite, []);
  }

  static gLocationsPast(user: TUser) {
    return _.get(user, DaoUser.pLocationsPast, []);
  }

  static gLocationsNow(user: TUser) {
    return _.get(user, DaoUser.pLocationsNow, []);
  }

  static gLocationsFuture(user: TUser) {
    return _.get(user, DaoUser.pLocationsFuture, []);
  }

  static gLocationsTop(user: TUser) {
    return _.get(user, DaoUser.pLocationsTop, []);
  }



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

  static gLocationFavoriteIds(user: TUser) {
    return ObjectCache.get(user, DaoUser._pLocationFavoriteIds,
        () => _.get(user, DaoUser.pLocationsFavorite, []).map(DaoLocation.gId)
    );
  }


  static addLocationToFavorites(user: TUser, location: TLocation) {
    const favoriteLocations = DaoUser.gLocationsFavorite(user);
    favoriteLocations.push(location);
    user[DaoUser.pLocationsFavorite] = favoriteLocations;
    ObjectCache.invalidate(user, DaoUser._pLocationFavoriteIds);
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



}