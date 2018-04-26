/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/
import SearchDataActionCreator from "./SearchDataActionCreator";
import SearchDataDefLocations, {SEARCH_DATA_ID_LOCATIONS} from "./def/SearchDataDefLocations";
import SearchDataDefUsers, {SEARCH_DATA_ID_USERS} from "./def/SearchDataDefUsers";
import {
	mutatorSearchDataConcatSuggestList,
	mutatorSearchDataSetLoading,
	mutatorSearchDataSetSearchList,
	mutatorSearchDataSetSearchQuery, SearchDataState
} from "./SearchDataModel";
import type {TPool} from "../Pool";


// Define result of poolConnect for this pool
export type TSearchDataPool = SearchDataActionCreator & SearchDataState;


// Define all Actions (There should for each ACTION)
export const POOL_ACTION_SEARCH_DATA_CONCAT_SUGGEST_LIST = 'POOL_ACTION_SEARCH_DATA_CONCAT_SUGGEST_LIST';
export const POOL_ACTION_SEARCH_DATA_SEARCH_LIST = 'POOL_ACTION_SEARCH_DATA_SEARCH_LIST';
export const POOL_ACTION_SEARCH_DATA_SET_SEARCH_QUERY = 'POOL_ACTION_SEARCH_DATA_SET_SEARCH_QUERY';
export const POOL_ACTION_SEARCH_DATA_SET_LOADING = 'POOL_ACTION_SEARCH_DATA_SET_LOADING';


const SearchDataPool: TPool = {

	mutators: {
		[POOL_ACTION_SEARCH_DATA_CONCAT_SUGGEST_LIST]: mutatorSearchDataConcatSuggestList,
		[POOL_ACTION_SEARCH_DATA_SEARCH_LIST]: mutatorSearchDataSetSearchList,
		[POOL_ACTION_SEARCH_DATA_SET_SEARCH_QUERY]: mutatorSearchDataSetSearchQuery,
		[POOL_ACTION_SEARCH_DATA_SET_LOADING]: mutatorSearchDataSetLoading
	},

	connectParams: {
		getDefaultActionCreator: (poolId, dispatch) => new SearchDataActionCreator(poolId, dispatch)
	},

	defs: {
		[SEARCH_DATA_ID_USERS]: SearchDataDefUsers,
		[SEARCH_DATA_ID_LOCATIONS]: SearchDataDefLocations,

	}

};
export default SearchDataPool;
