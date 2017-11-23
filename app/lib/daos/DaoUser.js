/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {Const} from '../../Config';
import ObjectCache from "../helpers/ObjectCache";
import DaoLocation from "./DaoLocation";
import Maps from "../data/Maps";


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
  static _pConnectionIds = 'connectionIds';
  static _pLocationIds = 'locationIds';
  static _pConnectionFriendIds = `${DaoUser._pConnectionIds}.friends`;
  static _pConnectionRequestIds = `${DaoUser._pConnectionIds}.requests`;
  static _pConnectionBlockedIds = `${DaoUser._pConnectionIds}.blocked`;
  static _pLocationFavoriteIds = `${DaoUser._pLocationIds}.favorites`;
  
  
  static shallowCopy(user) {
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
  
  
  


  static gId(user) {
    return _.get(user, DaoUser.pId);
  }

  static gPictureUrl(user) {
    return _.get(user, DaoUser.pPictureUrl);
  }

  static gName(user) {
    return _.get(user, DaoUser.pName);
  }

  static gReputation(user) {
    return _.get(user, DaoUser.pReputation);
  }

  static gPublicMessage(user) {
    return _.get(user, DaoUser.pPublicMessage);
  }

  static gPhone(user) {
    return _.get(user, DaoUser.pPhone);
  }

  static gEmail(user) {
    return _.get(user, DaoUser.pEmail);
  }

  static gApiKey(user) {
    return _.get(user, DaoUser.pApiKey);
  }

  static gSettingPrivacy(user) {
    return _.get(user, DaoUser.pSettingPrivacy, Const.DaoUser.defaultPrivacySettings);
  }

  static gSettingNotifications(user) {
    return _.get(user, DaoUser.pSettingNotifications, Const.DaoUser.defaultNotificationSettings);
  }

  static gGender(user) {
    return _.get(user, DaoUser.pGender, Maps.genderDefault().value);
  }

  static gConnections(user) {
    return _.get(user, DaoUser.pConnections);
  }

  static gLocations(user) {
    return _.get(user, DaoUser.pLocations);
  }

  static gAdminLocations(user) {
    return _.get(user, DaoUser.pAdminLocations, []);
  }

  static gConnectionsFriends(user) {
    return _.get(user, DaoUser.pConnectionFriends, []);
  }

  static gConnectionsRequests(user) {
    return _.get(user, DaoUser.pConnectionRequests, []);
  }

  static gConnectionsBlocked(user) {
    return _.get(user, DaoUser.pConnectionBlocked, []);
  }

  static gLocationsFavorite(user) {
    return _.get(user, DaoUser.pLocationsFavorite, []);
  }

  static gLocationsPast(user) {
    return _.get(user, DaoUser.pLocationsPast, []);
  }

  static gLocationsNow(user) {
    return _.get(user, DaoUser.pLocationsNow, []);
  }

  static gLocationsFuture(user) {
    return _.get(user, DaoUser.pLocationsFuture, []);
  }

  static gLocationsTop(user) {
    return _.get(user, DaoUser.pLocationsTop, []);
  }



  static gConnectionFriendIds(user) {
    return ObjectCache.get(user, DaoUser._pConnectionFriendIds,
        () => _.get(user, DaoUser.pConnectionFriends, []).map(DaoUser.gId)
    );
  }

  static gConnectionRequestIds(user) {
    return ObjectCache.get(user, DaoUser._pConnectionRequestIds,
        () => _.get(user, DaoUser.pConnectionRequests, []).map(DaoUser.gId)
    );
  }

  static gConnectionBlockedIds(user) {
    return ObjectCache.get(user, DaoUser._pConnectionBlockedIds,
        () => _.get(user, DaoUser.pConnectionBlocked, []).map(DaoUser.gId)
    );
  }

  static gLocationFavoriteIds(user) {
    return ObjectCache.get(user, DaoUser._pLocationFavoriteIds,
        () => _.get(user, DaoUser.pLocationsFavorite, []).map(DaoLocation.gId)
    );
  }


  static addLocationToFavorites(user, location) {
    const favoriteLocations = DaoUser.gLocationsFavorite(user);
    favoriteLocations.push(location);
    user[DaoUser.pLocationsFavorite] = favoriteLocations;
    ObjectCache.invalidate(user, DaoUser._pLocationFavoriteIds);
  }



  static hasPhone(user) {
    return DaoUser.pPhone in user;
  }

  static hasEmail(user) {
    return DaoUser.pEmail in user;
  }

  static hasConnections(user) {
    return DaoUser.pConnections in user;
  }

  static hasLocations(user) {
    return DaoUser.pLocations in user;
  }



}