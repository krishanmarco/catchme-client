/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/

export class SearchDataState {

	constructor(poolDefId: string) {

		// Unique pId that identifies this pool out of all the
		// possible objects in objectPoolReducerInitState.searchData
		this.poolDefId = poolDefId;

		// boolean that indicates whether there is currently
		// a query in progress
		this.loading = false;

		// Guard that stops the suggestion queries
		this.stopSuggestLoop = false;

		// Current search string
		this.searchQuery = '';

		// Suggest seed (number) that should be incremented
		// on each search so the next one doesn't return the
		// same results
		this.suggestSeed = 0;

		// The currently displayed list
		this.list = [];

		// The list that was previously returned
		// before this.list was filtered
		this.searchList = [];

		// The list that was previously returned
		// by the ws for searches
		this.suggestList = [];

	}

}

// SearchData state-mutators (Reducer cases)
export function mutatorSearchDataConcatSuggestList(action, subState: SearchDataState): SearchDataState {
	return {
		loading: false,
		suggestSeed: subState.suggestSeed + 1,
		stopSuggestLoop: subState.suggestList.length === action.suggestList.length,
		suggestList: action.suggestList,
		list: action.list
	};
}

export function mutatorSearchDataSetSearchList(action, subState: SearchDataState): SearchDataState {
	return {
		loading: false,
		searchList: action.searchList,
		list: action.list
	};
}

export function mutatorSearchDataSetSearchQuery(action, subState: SearchDataState): SearchDataState {
	return {
		searchQuery: action.searchQuery
	};
}

export function mutatorSearchDataSetLoading(action, subState: SearchDataState): SearchDataState {
	return {
		loading: true
	};
}
