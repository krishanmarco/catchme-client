/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import CacheMapDef from '../CacheMapDef';
import {usersProfileActions} from '../../PoolHelper';
import type {TCacheMapDef} from '../CacheMapDef';
import type {TThunk} from '../../../types/Types';
import type {TUser} from '../../../daos/DaoUser';

export const CACHE_MAP_ID_USERS = 'CACHE_MAP_ID_USERS';

// Declare cache-map definition
class CacheMapDefUsers extends CacheMapDef {

	constructor() {
		super(CACHE_MAP_ID_USERS);
		this.buildDataSet = this.buildDataSet.bind(this);
	}

	async buildDataSet(thunk: TThunk, uid: number, extraParams: Object): Promise<TUser> {
		const cacheMapActionCreator = usersProfileActions(thunk);
		return await cacheMapActionCreator.itemExists(uid, false)
			? cacheMapActionCreator.initializeItem(uid)
			: ApiClient.usersGetUid(uid);
	}

}

// Declare cache-map sub-type
export type TCacheMapUsers = TCacheMapDef<TUser>;

const cacheMapUsers: TCacheMapUsers = new CacheMapDefUsers();
export default cacheMapUsers;
