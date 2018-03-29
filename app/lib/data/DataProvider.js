/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from './ApiClient';
import Context from '../Context';
import Logger from "../Logger";
import RealmIO from './RealmIO';
import {Const} from '../../Config';
import {seconds} from '../HelperFunctions';


class DataProvider {


	usersGetUidProfile(uid) {
		return this._getCachedObjectById(
			// Cached user object (nullable)
			RealmIO.getUserById(uid),

			// Api request to get user object (if not cached)
			() => ApiClient.usersGetUidProfile(uid),

			// Callback to save user object to cache
			user => RealmIO.addUser(user)
		);
	}


	locationsGetLidProfile(lid) {
		return this._getCachedObjectById(
			// Cached location object (nullable)
			RealmIO.getLocationById(lid),

			// Api request to get location object (if not cached)
			() => ApiClient.locationsGetLidProfile(lid),

			// Callback to save user object to cache
			location => RealmIO.addLocation(location)
		);
	}


	_getCachedObjectById(realmObject, apiRequest, saveToRealm) {

		return Context.isOnline()
			.then(online => {

				if (!realmObject) {

					// No cache and device offline, generate exception
					if (!online)
						return this._cacheException(`valid=${realmObject} online=${online}`);

					// No cache and device online, generate miss
					return this._cacheMiss(apiRequest, saveToRealm, `valid=${realmObject} online=${online}`);
				}


				// There is a cached element with this pId, extract the insert time
				const {insertTs, ...cache} = realmObject;
				const cacheIsValid = this._cacheValid(insertTs);

				if (!cacheIsValid) {

					// Invalid cache and device online, generate miss
					if (online)
						return this._cacheMiss(apiRequest, saveToRealm, `valid=${cacheIsValid} online=${online}`);


					// Invalid cache and device offline, generate hit
				}

				// (Invalid cache and device offline) or (valid cache), generate hit
				return this._cacheHit(cache, `valid=${cacheIsValid} online=${online}`);
			});
	}


	_cacheValid(insertTs) {
		return seconds() - insertTs < Const.DataProvider.cacheTTLSec;
	}

	_cacheException(reason) {
		Logger.v(`DataProvider _cacheException: EXCEPTION => ${reason}`);
		return Promise.reject(0);
	}

	_cacheMiss(apiRequest, saveToRealm, reason) {
		Logger.v(`DataProvider _cacheMiss: MISS => ${reason}`);
		return this._runApiRequest(apiRequest, saveToRealm);
	}

	_cacheHit(cache, reason) {
		Logger.v(`DataProvider _cacheHit: HIT => ${reason}`);
		return Promise.resolve(cache);
	}


	_runApiRequest(apiRequest, saveToRealm) {
		return apiRequest()
			.then(object => {
				const userForReturn = JSON.parse(JSON.stringify(object));
				saveToRealm({insertTs: seconds(), ...object});
				return userForReturn;
			});
	}


}


const dataProvider = new DataProvider();
export default dataProvider;
