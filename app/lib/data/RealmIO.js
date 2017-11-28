/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {seconds} from '../HelperFunctions';
import realm from './RealmSchema';
import ApiAuthentication from './ApiAuthentication';
import DaoUser from '../daos/DaoUser';
import DaoLocation from "../daos/DaoLocation";

class RealmIO {

  constructor() {
    this._prepareApiLocationForDb = this._prepareApiLocationForDb.bind(this);
    this._prepareApiUserForDb = this._prepareApiUserForDb.bind(this);
    this._normalizeLocationFromDb = this._normalizeLocationFromDb.bind(this);
    this._normalizeUserFromDb = this._normalizeUserFromDb.bind(this);
  }



  setLocalUser(user) {
    const newUser = this._prepareApiUserForDb(user);
    newUser.insertTs = -1;

    const localUser = _.get(realm.objects('LocalUser'), '[0]');

    if (localUser != null) {
      realm.write(() => {localUser.user = newUser;});
      return;
    }

    this._tryAddToRealm('LocalUser', {user: newUser});
  }

  removeLocalUser() {
    const localUser = _.get(realm.objects('LocalUser'), '[0]');

    if (!localUser)
      return false;

    realm.write(() => {localUser.user = null;});
    ApiAuthentication.update(-1, '');

    return true;
  }

  getLocalUserData() {
    // realm.objects returns an array but the
    // LocalUser table will only have one entry
    const dbUser = _.get(realm.objects('LocalUser'), '[0].user');

    if (dbUser == null)
      return null;

    return this._normalizeUserFromDb(dbUser);
  }




  addUser(user) {
    user = this._prepareApiUserForDb(user);
    this._tryAddToRealm('User', user);
  }

  getUserById(id) {
    const user = realm.objectForPrimaryKey('User', id);

    if (user == null)
      return null;

    return this._normalizeUserFromDb(user);
  }




  addLocation(location) {
    location = this._prepareApiLocationForDb(location);
    this._tryAddToRealm('Location', location);
  }

  getLocationById(id) {
    const location = realm.objectForPrimaryKey('Location', id);

    if (location == null)
      return null;

    return this._normalizeLocationFromDb(location);
  }


  _normalizeUserFromDb(dbUser, maxDepth = 1, currentDepth = 0) {
    const user = DaoUser.shallowCopy(dbUser);

    const recurse = currentDepth < maxDepth;
    const nlfb = (location) => this._normalizeLocationFromDb(location, maxDepth, currentDepth++);
    const nufb = (user) => this._normalizeUserFromDb(user, maxDepth, currentDepth++);

    _.set(user, DaoUser.pAdminLocations,
        (recurse ? Object.values(DaoUser.gAdminLocations(user)) : []).map(nlfb));

    _.set(user, DaoUser.pLocationsFavorite,
        (recurse ? Object.values(DaoUser.gLocationsFavorite(user)) : []).map(nlfb));

    _.set(user, DaoUser.pLocationsTop,
        (recurse ? Object.values(DaoUser.gLocationsTop(user)) : []).map(nlfb));

    _.set(user, DaoUser.pLocationsPast,
        (recurse ? Object.values(DaoUser.gLocationsPast(user)) : []).map(nlfb));

    _.set(user, DaoUser.pLocationsNow,
        (recurse ? Object.values(DaoUser.gLocationsNow(user)) : []).map(nlfb));

    _.set(user, DaoUser.pLocationsFuture,
        (recurse ? Object.values(DaoUser.gLocationsFuture(user)) : []).map(nlfb));

    _.set(user, DaoUser.pConnectionFriends,
        (recurse ? Object.values(DaoUser.gConnectionsFriends(user)) : []).map(nufb));

    _.set(user, DaoUser.pConnectionRequests,
        (recurse ? Object.values(DaoUser.gConnectionsRequests(user)) : []).map(nufb));

    _.set(user, DaoUser.pConnectionBlocked,
        (recurse ? Object.values(DaoUser.gConnectionsBlocked(user)) : []).map(nufb));

    return user;
  }


  _prepareApiUserForDb(user) {

    _.set(user, DaoUser.pLocationsFavorite,
        _.get(user, DaoUser.pLocationsFavorite, []).map(this._prepareApiLocationForDb));

    _.set(user, DaoUser.pLocationsTop,
        _.get(user, DaoUser.pLocationsTop, []).map(this._prepareApiLocationForDb));

    _.set(user, DaoUser.pLocationsPast,
        _.get(user, DaoUser.pLocationsPast, []).map(this._prepareApiLocationForDb));

    _.set(user, DaoUser.pLocationsNow,
        _.get(user, DaoUser.pLocationsNow, []).map(this._prepareApiLocationForDb));

    _.set(user, DaoUser.pLocationsFuture,
        _.get(user, DaoUser.pLocationsFuture, []).map(this._prepareApiLocationForDb));

    _.set(user, DaoUser.pAdminLocations,
        _.get(user, DaoUser.pAdminLocations, []).map(this._prepareApiLocationForDb));

    _.set(user, DaoUser.pConnectionFriends,
        _.get(user, DaoUser.pConnectionFriends, []).map(this._prepareApiUserForDb));

    _.set(user, DaoUser.pConnectionRequests,
        _.get(user, DaoUser.pConnectionRequests, []).map(this._prepareApiUserForDb));

    _.set(user, DaoUser.pConnectionBlocked,
        _.get(user, DaoUser.pConnectionBlocked, []).map(this._prepareApiUserForDb));

    user = {...user, insertTs: seconds()};

    return user;
  }


  _prepareApiLocationForDb(location) {

    _.set(location, DaoLocation.pImageUrls, {value: JSON.stringify(_.get(location, DaoLocation.pImageUrls, []))});

    _.set(location, DaoLocation.pPeople, {value: JSON.stringify(_.get(location, DaoLocation.pPeople, {}))});

    _.set(location, DaoLocation.pAddress, {value: JSON.stringify(_.get(location, DaoLocation.pAddress, {}))});

    _.set(location, DaoLocation.pConnectionsNow,
        _.get(location, DaoLocation.pConnectionsNow, []).map(this._prepareApiUserForDb));

    _.set(location, DaoLocation.pConnectionsFuture,
        _.get(location, DaoLocation.pConnectionsFuture, []).map(this._prepareApiUserForDb));

    location = {...location, insertTs: seconds()};

    return location;
  }
  
  
  _normalizeLocationFromDb(dbLocation, maxDepth = 1, currentDepth = 0) {
    const editableLocation = {...dbLocation};

    _.set(editableLocation, DaoLocation.pImageUrls, JSON.parse(_.get(dbLocation, `${DaoLocation.pImageUrls}.value`)));

    _.set(editableLocation, DaoLocation.pPeople, JSON.parse(_.get(dbLocation, `${DaoLocation.pPeople}.value`)));

    _.set(editableLocation, DaoLocation.pAddress, JSON.parse(_.get(dbLocation, `${DaoLocation.pAddress}.value`)));


    const location = DaoLocation.shallowCopy(editableLocation);

    const recurse = currentDepth < maxDepth;
    const nlfb = (location) => this._normalizeLocationFromDb(location, maxDepth, currentDepth++);
    const nufb = (user) => this._normalizeUserFromDb(user, maxDepth, currentDepth++);

    _.set(location, DaoLocation.pConnectionsNow,
        (recurse ? Object.values(DaoLocation.gFriendsNow(location)) : []).map(nufb));

    _.set(location, DaoLocation.pConnectionsFuture,
        (recurse ? Object.values(DaoLocation.gFriendsFuture(location)) : []).map(nufb));

    return location;
  }



  _tryAddToRealm(model, object) {

    console.log(`_tryWriteToRealm(${model}, {...}) ----------------------------------------------------------------`);
    console.log(object);
    console.log(`_tryWriteToRealm(${model}, {...}) ----------------------------------------------------------------`);

    try {
      // Create or update the object
      realm.write(() => realm.create(model, object, true));

    } catch (exception) {
      console.log(`RealmIO _tryWriteToRealm: Failed to add ${model} to realm => ${exception}`);
    }

  }


}

const realmIO = new RealmIO();
export default realmIO;