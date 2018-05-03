/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import ApiAuthentication from './ApiAuthentication';
import DaoLocation from "../daos/DaoLocation";
import DaoUser from '../daos/DaoUser';
import DaoUserLocationStatus from "../daos/DaoUserLocationStatus";
import Logger from "../Logger";
import realm from './RealmSchema';
import {seconds} from '../HelperFunctions';
import type {TLocation} from "../daos/DaoLocation";
import type {TUser} from "../daos/DaoUser";
import type {TUserLocationStatus} from "../daos/DaoUserLocationStatus";

class RealmIO {
	
	constructor() {
		this._prepareApiLocationForDb = this._prepareApiLocationForDb.bind(this);
		this._prepareApiUserForDb = this._prepareApiUserForDb.bind(this);
		this._normalizeLocationFromDb = this._normalizeLocationFromDb.bind(this);
		this._normalizeUserFromDb = this._normalizeUserFromDb.bind(this);
	}
	
	
	setLocalUser(user: TUser) {
		const newUser = this._prepareApiUserForDb(user);
		newUser.insertTs = -1;
		
		const localUser = _.get(realm.objects('LocalUser'), '[0]');
		
		if (localUser != null) {
			realm.write(() => {
				localUser.user = newUser;
			});
			return;
		}
		
		this._tryAddToRealm('LocalUser', {user: newUser});
	}
	
	removeLocalUser() {
		const localUser = _.get(realm.objects('LocalUser'), '[0]');
		
		if (!localUser)
			return false;
		
		realm.write(() => {
			localUser.user = null;
		});
		ApiAuthentication.update(-1, '');
		
		return true;
	}
	
	getLocalUserData(): ?TUser {
		// realm.objects returns an array but the
		// LocalUser table will only have one entry
		const dbUser = _.get(realm.objects('LocalUser'), '[0].user');
		
		if (dbUser == null)
			return null;
		
		return this._normalizeUserFromDb(dbUser);
	}
	
	
	addUser(user: TUser) {
		user = this._prepareApiUserForDb(user);
		this._tryAddToRealm('User', user);
	}
	
	getUserById(id) {
		const user = realm.objectForPrimaryKey('User', id);
		
		if (user == null)
			return null;
		
		return this._normalizeUserFromDb(user);
	}
	
	
	addLocation(location: TLocation) {
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
		const editableUser = {
			...dbUser,
			
			// If realm objects are nested they have to be duplicated to prevent write errors
			[DaoUser.pLocations]: {..._.get(dbUser, DaoUser.pLocations, {})}
		};
		
		_.set(editableUser, DaoUser.pLocationsFavorites,
			JSON.parse(_.get(editableUser, `${DaoUser.pLocationsFavorites}.value`)));
		
		_.set(editableUser, DaoUser.pLocationsTop,
			JSON.parse(_.get(editableUser, `${DaoUser.pLocationsTop}.value`)));

		// todo the currentDepth + 1 seems wrong
		const recurse = currentDepth < maxDepth;
		const nlfdb = (l: TLocation) => this._normalizeLocationFromDb(l, maxDepth, currentDepth + 1);
		const nufdb = (u: TUser) => this._normalizeUserFromDb(u, maxDepth, currentDepth + 1);
		const nulsfdb = (lus: TUserLocationStatus) => this._normalizeUserLocationStatusFromDb(lus, maxDepth, currentDepth + 1);
		
		
		const user = DaoUser.shallowCopy(editableUser);
		
		_.set(user, DaoUser.pAdminLocations,
			(recurse ? Object.values(DaoUser.gAdminLocations(user)) : []).map(nlfdb));
		
		_.set(user, DaoUser.pLocationsUserLocationStatuses,
			(recurse ? Object.values(DaoUser.gLocationsUserLocationStatuses(user)) : []).map(nulsfdb));
		
		_.set(user, DaoUser.pLocationsLocations,
			(recurse ? Object.values(DaoUser.gLocationsLocations(user)) : []).map(nlfdb));
		
		_.set(user, DaoUser.pConnectionFriends,
			(recurse ? Object.values(DaoUser.gConnectionsFriends(user)) : []).map(nufdb));
		
		_.set(user, DaoUser.pConnectionRequests,
			(recurse ? Object.values(DaoUser.gConnectionsRequests(user)) : []).map(nufdb));
		
		_.set(user, DaoUser.pConnectionBlocked,
			(recurse ? Object.values(DaoUser.gConnectionsBlocked(user)) : []).map(nufdb));
		
		return user;
	}
	
	_prepareApiUserForDb(user: TUser) {

		_.set(user, DaoUser.pLocationsFavorites, {value: JSON.stringify(_.get(user, DaoUser.pLocationsFavorites, []))});

		_.set(user, DaoUser.pLocationsTop, {value: JSON.stringify(_.get(user, DaoUser.pLocationsTop, []))});

		_.set(user, DaoUser.pLocationsUserLocationStatuses,
			_.get(user, DaoUser.pLocationsUserLocationStatuses, []).map(this._prepareApiUserLocationStatusForDb));
		
		_.set(user, DaoUser.pLocationsLocations,
			_.get(user, DaoUser.pLocationsLocations, []).map(this._prepareApiLocationForDb));
		
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
	
	
	_normalizeLocationFromDb(dbLocation, maxDepth = 1, currentDepth = 0) {
		const editableLocation = {...dbLocation};
		
		_.set(editableLocation, DaoLocation.pImageUrls, JSON.parse(_.get(dbLocation, `${DaoLocation.pImageUrls}.value`, [])));
		
		_.set(editableLocation, DaoLocation.pPeople, JSON.parse(_.get(dbLocation, `${DaoLocation.pPeople}.value`)));
		
		_.set(editableLocation, DaoLocation.pAddress, JSON.parse(_.get(dbLocation, `${DaoLocation.pAddress}.value`)));
		
		
		const recurse = currentDepth < maxDepth;
		const nlfdb = (l: TLocation) => this._normalizeLocationFromDb(l, maxDepth, currentDepth + 1);
		const nufdb = (u: TUser) => this._normalizeUserFromDb(u, maxDepth, currentDepth + 1);
		
		const location = DaoLocation.shallowCopy(editableLocation);
		
		_.set(location, DaoLocation.pConnectionsNow,
			(recurse ? Object.values(DaoLocation.gFriendsNow(location)) : []).map(nufdb));
		
		_.set(location, DaoLocation.pConnectionsFuture,
			(recurse ? Object.values(DaoLocation.gFriendsFuture(location)) : []).map(nufdb));
		
		return location;
	}
	
	_prepareApiLocationForDb(location: TLocation) {
		
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
	
	
	_normalizeUserLocationStatusFromDb(dbUserLocationStatus, maxDepth = 1, currentDepth = 0) {
		return DaoUserLocationStatus.shallowCopy(dbUserLocationStatus);
	}
	
	_prepareApiUserLocationStatusForDb(userLocationStatus: TUserLocationStatus) {
		//The TUserLocationStatus only has number fields, it is already normalized
		return userLocationStatus;
	}
	
	
	_tryAddToRealm(model, object) {
		
		Logger.v(`_tryWriteToRealm(${model}, {...}) ----------------------------------------------------------------`);
		Logger.v(object);
		Logger.v(`_tryWriteToRealm(${model}, {...}) ----------------------------------------------------------------`);
		
		try {
			// Create or update the object
			realm.write(() => realm.create(model, object, true));
			
		} catch (exception) {
			Logger.v(`RealmIO _tryWriteToRealm: Failed to add ${model} to realm => ${exception}`);
		}
		
	}
	
}

const realmIO = new RealmIO();
export default realmIO;