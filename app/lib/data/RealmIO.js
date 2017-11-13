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
  }



  setLocalUser(user) {
    user = this._prepareApiUserForDb(user);
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
    user = this._prepareApiUserForDb(user);
    this._tryAddToRealm('User', user);
  }

  getUserById(id) {
    let user = realm.objectForPrimaryKey('User', id);

    if (user == null)
      return null;

    return {
        ...user,
      
    };
  }




  addLocation(location) {
    location = this._prepareApiLocationForDb(location);
    this._tryAddToRealm('Location', location);
  }

  getLocationById(id) {
    let location = realm.objectForPrimaryKey('Location', id);

    if (location == null)
      return null;

    return {
      ...location,
      timings: JSON.parse(_.get(location, `${DaoLocation.pTimings}.value`)),
      imageUrls: JSON.parse(_.get(location, `${DaoLocation.pImageUrls}.value`)),
      people: JSON.parse(_.get(location, `${DaoLocation.pPeople}.value`)),
      address: JSON.parse(_.get(location, `${DaoLocation.pAddress}.value`))
    };
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

    _.set(location, DaoLocation.pTimings, {value: JSON.stringify(_.get(location, DaoLocation.pTimings, []))});

    _.set(location, DaoLocation.pPeople, {value: JSON.stringify(_.get(location, DaoLocation.pPeople, {}))});

    _.set(location, DaoLocation.pAddress, {value: JSON.stringify(_.get(location, DaoLocation.pAddress, {}))});

    _.set(location, DaoLocation.pConnectionsNow,
        _.get(location, DaoLocation.pConnectionsNow, []).map(this._prepareApiUserForDb));

    _.set(location, DaoLocation.pConnectionsFuture,
        _.get(location, DaoLocation.pConnectionsFuture, []).map(this._prepareApiUserForDb));

    location = {...location, insertTs: seconds()};

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