/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from './DaoLocation';
import DaoUser from './DaoUser';
import DaoUserLocationStatus from './DaoUserLocationStatus';
import {Const} from '../../Config';
import {denormObj, mapIdsToObjects} from '../HelperFunctions';
import type {TId} from '../types/Types';
import type {TLocation} from './DaoLocation';
import type {TUser} from './DaoUser';
import type {TUserLocationStatus} from './DaoUserLocationStatus';

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


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************

	static gLocationsFromIds(metadata: TMetadata, lids: Array<number>): Array<TLocation> {
		return mapIdsToObjects(lids, DaoMetadata.gLocations(metadata), DaoLocation.gId);
	}

	static gUsersFromIds(metadata: TMetadata, uids: Array<number>): Array<TUser> {
		return mapIdsToObjects(uids, DaoMetadata.gUsers(metadata), DaoUser.gId);
	}

	static gUserLocationsFromIds(metadata: TMetadata, ulids: Array<number>): Array<TUserLocationStatus> {
		return mapIdsToObjects(ulids, DaoMetadata.gUserLocations(metadata), DaoUserLocationStatus.gId);
	}


// HelperFunctions **************************************************************************************
// HelperFunctions **************************************************************************************

	static putObjectToArrayProperty(metadata: TMetadata, pName: string, objToAdd: Object, gObjId: Object => TId) {
		const objs = _.get(metadata, pName, []);
		const objAlreadyIncluded = _.some(objs, o => gObjId(o) == gObjId(objToAdd));

		if (objAlreadyIncluded)
			return;

		objs.push(objToAdd);
		_.set(metadata, pName, objs);
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

}