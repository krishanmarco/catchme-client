/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from '../../../data/ApiClient';
import DaoUser from '../../../daos/DaoUser';
import SearchDataDef from '../SearchDataDef';
import type {TSearchDataDef} from '../SearchDataDef';
import type {TUser} from '../../../daos/DaoUser';

export const SEARCH_DATA_ID_USERS = 'searchDataIdUsers';

// Declare search-data definition
class SearchDataDefUsers extends SearchDataDef<TUser> {

	constructor() {
		super(SEARCH_DATA_ID_USERS);
		this.suggestApiCall = this.suggestApiCall.bind(this);
		this.searchApiCall = this.searchApiCall.bind(this);
		this.uniqueFilter = this.uniqueFilter.bind(this);
	}

	suggestApiCall(seed: number): Promise<TUser> {
		return ApiClient.suggestSeedUsers(seed);
	}

	searchApiCall(query: string): Promise<TUser> {
		return ApiClient.searchQueryUsers(query);
	}

	uniqueFilter(user: TUser) {
		return DaoUser.gId(user);
	}

}

// Declare search-data sub-type
export type TSearchDataDefUsers = TSearchDataDef<TUser>;

const searchDataDefUsers: TSearchDataDefUsers = new SearchDataDefUsers();
export default searchDataDefUsers;
