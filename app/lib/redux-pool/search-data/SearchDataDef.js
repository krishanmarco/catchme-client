/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {SearchDataState} from './SearchDataModel';

export type TSearchDataDef<TSearchListObject> = {

	// Unique search-data-id that this definition represents
	searchDataId: string,

	// Initial state of this search-data
	initState: () => SearchDataState,

	// Function to get suggested data, the functions parameter is a seed
	suggestApiCall: (number) => Promise<TSearchListObject>,

	// Function to search for some data, the functions parameter is the search string
	searchApiCall: (string) => Promise<TSearchListObject>,

	// Function to map each TSearchListObject to its unique-id
	uniqueFilter: (TSearchListObject) => string

};


export default class SearchDataDef {

	constructor(searchDataId: string) {
		this.searchDataId = searchDataId;
		this.initState = this.initState.bind(this);
	}

	initState(): SearchDataState {
		return new SearchDataState(this.searchDataId);
	}

}