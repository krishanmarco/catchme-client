/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import CacheMapDef from '../CacheMapDef';
import type {TCacheMapDef} from '../CacheMapDef';
import type {TUser} from '../../../daos/DaoUser';
import type {TThunk} from "../../../types/Types";
import CacheMapActionCreator from "../CacheMapActionCreator";
import {CACHE_MAP_ID_USER_PROFILES} from "./CacheMapDefUserProfiles";

export const CACHE_MAP_ID_USERS = 'CACHE_MAP_ID_USERS';

// Declare cache-map definition
class CacheMapDefUsers extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_USERS);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	async buildDataSet(thunk: TThunk, uid: number, extraParams: Object): Promise<TUser> {
		const cacheMapActionCreator = new CacheMapActionCreator(CACHE_MAP_ID_USER_PROFILES, thunk.dispatch);// todo check PoolHelper collision
		return await cacheMapActionCreator.itemExists(uid, false)
			? cacheMapActionCreator.initializeItem(uid)
			: ApiClient.usersGetUid(uid);
	}

}

// Declare cache-map sub-type
export type TCacheMapUsers = TCacheMapDef<TUser>;

const cacheMapUsers: TCacheMapUsers = new CacheMapDefUsers();
export default cacheMapUsers;
