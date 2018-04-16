/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import _ from "lodash";
import PoolActionCreator from "../PoolActionCreator";
import {
	POOL_ACTION_SEARCH_DATA_CONCAT_SUGGEST_LIST,
	POOL_ACTION_SEARCH_DATA_SEARCH_LIST,
	POOL_ACTION_SEARCH_DATA_SET_LOADING,
	POOL_ACTION_SEARCH_DATA_SET_SEARCH_QUERY
} from "./SearchDataPool";
import {POOL_TYPE_SEARCH_DATA} from "../../../redux/ReduxPool";
import {SearchDataState} from "./SearchDataModel";
import type {TDispatch} from "../../types/Types";


export default class SearchDataActionCreator extends PoolActionCreator {

	constructor(poolDefId: string, dispatch: TDispatch) {
		super(POOL_TYPE_SEARCH_DATA, poolDefId, dispatch);
		this.search = this.search.bind(this);
		this.suggest = this.suggest.bind(this);
		this.setSearchQuery = this.setSearchQuery.bind(this);
	}

	suggest() {
		const {dispatch, dispatchAction} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			const {loading, suggestSeed}: SearchDataState = this.getPoolState(getState);

			if (loading)
				return;

			dispatchAction({type: POOL_ACTION_SEARCH_DATA_SET_LOADING});

			// Run the suggestion api call
			pool.suggestApiCall(suggestSeed)
				.then(resultSuggestList => {
					const {suggestList, searchList}: SearchDataState = this.getPoolState(getState);

					// The new suggest list is the old suggestList + the new received data
					const newSuggestList = _.uniqBy(suggestList.concat(resultSuggestList), pool.uniqueFilter);

					// The new display list is the old searchList + the new suggestList
					const newList = _.uniqBy(searchList.concat(newSuggestList), pool.uniqueFilter);


					dispatchAction({
						type: POOL_ACTION_SEARCH_DATA_CONCAT_SUGGEST_LIST,
						suggestList: newSuggestList,
						list: newList
					});

				});
		});
	}

	search() {
		const {dispatch, dispatchAction} = this;
		const pool = this.getPoolDef();

		return dispatch((dispatch, getState) => {
			const {searchQuery}: SearchDataState = this.getPoolState(getState);


			if (!searchQuery || searchQuery.length <= 0)
				return;

			// Always search, even if something is already fetching
			dispatchAction({type: POOL_ACTION_SEARCH_DATA_SET_LOADING});

			// Run the search api call
			pool.searchApiCall(searchQuery)
				.then(resultSearchList => {
					const {suggestList, searchList}: SearchDataState = this.getPoolState(getState);

					// The new search list is only what was returned as new data
					const newSearchList = _.uniqBy(resultSearchList, pool.uniqueFilter);

					// The new display list is the new searchList + the old suggestList
					const newList = _.uniqBy(searchList.concat(suggestList), pool.uniqueFilter);

					dispatchAction({
						type: POOL_ACTION_SEARCH_DATA_SEARCH_LIST,
						searchList: newSearchList,
						list: newList
					});

				});
		});
	}

	setSearchQuery(searchQuery: string) {
		const {dispatchAction} = this;
		return dispatchAction({
			type: POOL_ACTION_SEARCH_DATA_SET_SEARCH_QUERY,
			searchQuery
		});
	}


}