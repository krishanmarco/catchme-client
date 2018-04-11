/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import ApiClient from "../../../data/ApiClient";
import DaoLocation from "../../../daos/DaoLocation";
import SearchDataDef from "../SearchDataDef";
import type {TLocation} from "../../../daos/DaoLocation";
import type {TSearchDataDef} from "../SearchDataDef";

export const SEARCH_DATA_ID_LOCATIONS = 'searchDataIdLocations';

// Declare search-data definition
class SearchDataDefLocations extends SearchDataDef<TLocation> {

	constructor() {
		super(SEARCH_DATA_ID_LOCATIONS);
		this.suggestApiCall = this.suggestApiCall.bind(this);
		this.searchApiCall = this.searchApiCall.bind(this);
		this.uniqueFilter = this.uniqueFilter.bind(this);
	}

	suggestApiCall(seed: number): Promise<TLocation> {
		return ApiClient.suggestSeedLocations(seed);
	}

	searchApiCall(query: string): Promise<TLocation> {
		return ApiClient.searchQueryLocations(query);
	}

	uniqueFilter(location: TLocation) {
		return DaoLocation.gId(location);
	}

}

// Declare search-data sub-type
export type TSearchDataDefLocations = TSearchDataDef<TLocation>;

const searchDataDefLocations: TSearchDataDefLocations = new SearchDataDefLocations();
export default searchDataDefLocations;
