/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import type {TLocation} from './DaoLocation';
import DaoLocation from './DaoLocation';
import type {TUser} from './DaoUser';
import DaoUser from './DaoUser';
import type {TUserLocationStatus} from './DaoUserLocationStatus';
import DaoUserLocationStatus from './DaoUserLocationStatus';
import ObjectCache from '../helpers/ObjectCache';
import {denormObj, mapIdsToObjects} from '../HelperFunctions';
import type {TId} from '../types/Types';

export type TMetadata = {
	locations: Array<TLocation>,
	users: Array<TUser>,
	userLocations: Array<TUserLocationStatus>
};

export default class DaoMetadata {
	static pLocations = 'locations';
	static pUsers = 'users';
	static pUserLocations = 'userLocations';

	static shallowCopy(metadata: TMetadata): TMetadata {
		const newMetadata = {};
		_.set(newMetadata, DaoMetadata.pLocations, DaoMetadata.gLocations(metadata));
		_.set(newMetadata, DaoMetadata.pUsers, DaoMetadata.gUsers(metadata));
		_.set(newMetadata, DaoMetadata.pUserLocations, DaoMetadata.gUserLocations(metadata));
		// Private fields (_) will have to be recalculated...
		return newMetadata;
	}

	static apiClean(metadata: TMetadata): TMetadata {
		// A cleaned metadata object has no values
		return DaoMetadata.newInstance();
	}

	static newInstance(): TMetadata {
		return denormObj({
			[DaoMetadata.pLocations]: [],
			[DaoMetadata.pUsers]: [],
			[DaoMetadata.pUserLocations]: []
		});
	}

	static gLocations(metadata: TMetadata): Array<TLocation> {
		return _.get(metadata, DaoMetadata.pLocations, []);
	}

	static gUsers(metadata: TMetadata): Array<TUser> {
		return _.get(metadata, DaoMetadata.pUsers, []);
	}

	static gUserLocations(metadata: TMetadata): Array<TUserLocationStatus> {
		return _.get(metadata, DaoMetadata.pUserLocations, []);
	}


// CacheAccessors ***************************************************************************************
// CacheAccessors ***************************************************************************************

	static _gcLocations(metadata: TMetadata, lids: Array<number>, pName: string): Array<TLocation> {
		return ObjectCache.get(metadata, `_${DaoMetadata.pLocations}.${pName}`,
			() => DaoMetadata._mapLidsToLocations(metadata, lids));
	}

	static _gcUsers(metadata: TMetadata, uids: Array<number>, pName: string): Array<TUser> {
		return ObjectCache.get(metadata, `_${DaoMetadata.pUsers}.${pName}`,
			() => DaoMetadata._mapUidsToUsers(metadata, uids));
	}

	static _gcUserLocations(metadata: TMetadata, ulids: Array<number>, pName: string): Array<TUserLocationStatus> {
		return ObjectCache.get(metadata, `_${DaoMetadata.pUserLocations}.${pName}`,
			() => DaoMetadata._mapUlidstoUserLocations(metadata, ulids));
	}


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************

	static gLocationsFromIds(metadata: TMetadata, lids: Array<number>, pName: ?string): Array<TLocation> {
		return pName == null
			? DaoMetadata._mapLidsToLocations(metadata, lids)
			: DaoMetadata._gcLocations(metadata, lids, pName);
	}

	static gUsersFromIds(metadata: TMetadata, uids: Array<number>, pName: ?string): Array<TUser> {
		return pName == null
			? DaoMetadata._mapUidsToUsers(metadata, uids)
			: DaoMetadata._gcUsers(metadata, uids, pName);
	}

	static gUserLocationsFromIds(metadata: TMetadata, ulids: Array<number>, pName: ?string): Array<TUserLocationStatus> {
		return pName == null
			? DaoMetadata._mapUlidstoUserLocations(metadata, ulids)
			: DaoMetadata._gcUserLocations(metadata, ulids, pName);
	}

	static putLocation(metadata: TMetadata, locationToAdd: TLocation) {
		DaoMetadata.putObjectToArrayProperty(metadata, DaoMetadata.pLocations, locationToAdd, DaoLocation.gId);
	}

	static putUser(metadata: TMetadata, userToAdd: TUser) {
		DaoMetadata.putObjectToArrayProperty(metadata, DaoMetadata.pUsers, userToAdd, DaoUser.gId);
	}

	static putUserLocation(metadata: TMetadata, userLocationToAdd: TUserLocationStatus) {
		DaoMetadata.putObjectToArrayProperty(metadata, DaoMetadata.pUserLocations, userLocationToAdd, DaoUserLocationStatus.gId);
	}

// HelperFunctions **************************************************************************************
// HelperFunctions **************************************************************************************

	static cInvalidateObject(metadata: TMetadata, pName: string, pChildName: ?string) {
		ObjectCache.invalidate(metadata, `_${pName}${pChildName != null ? `.${pChildName}` : ''}`);
	}

	static putObjectToArrayProperty(metadata: TMetadata, pName: string, objToAdd: Object, gObjId: any => TId) {
		const objs = _.get(metadata, pName, []);
		const objAlreadyIncluded = _.some(objs, o => gObjId(o) == gObjId(objToAdd));

		if (objAlreadyIncluded)
			return;

		// Add the object and invalidate the caches
		objs.push(objToAdd);
		_.set(metadata, pName, objs);
	}

	static _mapLidsToLocations(metadata: TMetadata, lids: Array<number>): Array<TLocation> {
		return mapIdsToObjects(lids, DaoMetadata.gLocations(metadata), DaoLocation.gId);
	}

	static _mapUidsToUsers(metadata: TMetadata, uids: Array<number>): Array<TUser> {
		return mapIdsToObjects(uids, DaoMetadata.gUsers(metadata), DaoUser.gId);
	}

	static _mapUlidstoUserLocations(metadata: TMetadata, ulids: Array<number>): Array<TUserLocationStatus> {
		return mapIdsToObjects(ulids, DaoMetadata.gUserLocations(metadata), DaoUserLocationStatus.gId);
	}

}