/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from './ApiClient';
import Context from '../Context';
import Logger from "../Logger";
import StorageIO from './StorageIO';
import {Const} from '../../Config';
import {seconds} from '../HelperFunctions';


class DataProvider {


	usersGetUidProfile(uid: number) {
		return this._getCachedObjectById(
			// Cached user object (nullable)
			null,		// todo

			// Api request to get user object (if not cached)
			() => ApiClient.usersGetUidProfile(uid),

			// Callback to save user object to cache
			user => {} // todo
		);
	}


	locationsGetLidProfile(lid: number) {
		return this._getCachedObjectById(
			// Cached location object (nullable)
			null,	// todo

			// Api request to get location object (if not cached)
			() => ApiClient.locationsGetLidProfile(lid),

			// Callback to save user object to cache
			location => {} // todo
		);
	}


	_getCachedObjectById(object, apiRequest, saveToStorage) {

		return Context.isOnline()
			.then(online => {

				if (!object) {

					// No cache and device offline, generate exception
					if (!online)
						return this._cacheException(`valid=${object} online=${online}`);

					// No cache and device online, generate miss
					return this._cacheMiss(apiRequest, saveToStorage, `valid=${object} online=${online}`);
				}


				// There is a cached element with this pId, extract the insert time
				const {insertTs, ...cache} = object;
				const cacheIsValid = this._cacheValid(insertTs);

				if (!cacheIsValid) {

					// Invalid cache and device online, generate miss
					if (online)
						return this._cacheMiss(apiRequest, saveToStorage, `valid=${cacheIsValid} online=${online}`);


					// Invalid cache and device offline, generate hit
				}

				// (Invalid cache and device offline) or (valid cache), generate hit
				return this._cacheHit(cache, `valid=${cacheIsValid} online=${online}`);
			});
	}


	_cacheValid(insertTs) {
		return seconds() - insertTs < Const.dataProviderCacheTTLSec;
	}

	_cacheException(reason) {
		Logger.v(`DataProvider _cacheException: EXCEPTION => ${reason}`);
		return Promise.reject(0);
	}

	_cacheMiss(apiRequest, saveToStorage, reason) {
		Logger.v(`DataProvider _cacheMiss: MISS => ${reason}`);
		return this._runApiRequest(apiRequest, saveToStorage);
	}

	_cacheHit(cache, reason) {
		Logger.v(`DataProvider _cacheHit: HIT => ${reason}`);
		return Promise.resolve(cache);
	}


	_runApiRequest(apiRequest, saveToStorage) {
		return apiRequest()
			.then(object => {
				const userForReturn = JSON.parse(JSON.stringify(object));
				saveToStorage({insertTs: seconds(), ...object});
				return userForReturn;
			});
	}


}


const dataProvider = new DataProvider();
export default dataProvider;
