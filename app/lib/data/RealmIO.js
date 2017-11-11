/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {seconds} from '../HelperFunctions';
import realm from './RealmSchema';
import ApiAuthentication from './ApiAuthentication';
import DaoUser from '../daos/DaoUser';
import DaoLocation from "../daos/DaoLocation";

class RealmIO {

  constructor() {
    this._prepareLocationForDb = this._prepareLocationForDb.bind(this);
    this._prepareUserForDb = this._prepareUserForDb.bind(this);
  }



  setLocalUser(user) {
    user = this._prepareUserForDb(user);
    this._tryAddToRealm('LocalUser', {user: {insertTs: -1, ...user}});
    ApiAuthentication.update(DaoUser.gId(user), DaoUser.gApiKey(user))
  }

  removeLocalUser() {
    realm.write(() => realm.update('LocalUser', {user: null}));
    ApiAuthentication.update(-1, '');
  }

  getLocalUserData() {
    return _.get(realm.objects('LocalUser'), '[0].user');
  }




  addUser(user) {
    user = this._prepareUserForDb(user);
    this._tryAddToRealm('User', user);
  }

  getUserById(id) {
    return realm.objectForPrimaryKey('User', id);
  }




  addLocation(location) {
    location = this._prepareLocationForDb(location);
    this._tryAddToRealm('Location', location);
  }

  getLocationById(id) {
    let location = realm.objectForPrimaryKey('Location', id);

    if (location == null)
      return location;

    return {
      ...location,
      timings: JSON.parse(_.get(location, `${DaoLocation.pTimings}.value`)),
      imageUrls: JSON.parse(_.get(location, `${DaoLocation.pImageUrls}.value`)),
      people: JSON.parse(_.get(location, `${DaoLocation.pPeople}.value`)),
      address: JSON.parse(_.get(location, `${DaoLocation.pAddress}.value`))
    };
  }


  _prepareUserForDb(user) {

    _.set(user, DaoUser.pLocationsFavorite,
        _.get(user, DaoUser.pLocationsFavorite, []).map(this._prepareLocationForDb));

    _.set(user, DaoUser.pLocationsTop,
        _.get(user, DaoUser.pLocationsTop, []).map(this._prepareLocationForDb));

    _.set(user, DaoUser.pLocationsPast,
        _.get(user, DaoUser.pLocationsPast, []).map(this._prepareLocationForDb));

    _.set(user, DaoUser.pLocationsNow,
        _.get(user, DaoUser.pLocationsNow, []).map(this._prepareLocationForDb));

    _.set(user, DaoUser.pLocationsFuture,
        _.get(user, DaoUser.pLocationsFuture, []).map(this._prepareLocationForDb));

    _.set(user, DaoUser.pAdminLocations,
        _.get(user, DaoUser.pAdminLocations, []).map(this._prepareLocationForDb));

    _.set(user, DaoUser.pConnectionFriends,
        _.get(user, DaoUser.pConnectionFriends, []).map(this._prepareUserForDb));

    _.set(user, DaoUser.pConnectionRequests,
        _.get(user, DaoUser.pConnectionRequests, []).map(this._prepareUserForDb));

    _.set(user, DaoUser.pConnectionBlocked,
        _.get(user, DaoUser.pConnectionBlocked, []).map(this._prepareUserForDb));

    user = {...user, insertTs: seconds()}

    return user;
  }


  _prepareLocationForDb(location) {

    _.set(location, DaoLocation.pImageUrls, {value: JSON.stringify(_.get(location, DaoLocation.pImageUrls, []))});

    _.set(location, DaoLocation.pTimings, {value: JSON.stringify(_.get(location, DaoLocation.pTimings, []))});

    _.set(location, DaoLocation.pPeople, {value: JSON.stringify(_.get(location, DaoLocation.pPeople, {}))});

    _.set(location, DaoLocation.pAddress, {value: JSON.stringify(_.get(location, DaoLocation.pAddress, {}))});

    _.set(location, DaoLocation.pConnectionsNow,
        _.get(location, DaoLocation.pConnectionsNow, []).map(this._prepareUserForDb));

    _.set(location, DaoLocation.pConnectionsFuture,
        _.get(location, DaoLocation.pConnectionsFuture, []).map(this._prepareUserForDb));

    location = {...location, insertTs: seconds()}

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