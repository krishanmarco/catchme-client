import {seconds} from "../../HelperFunctions";
import {Const} from "../../../Config";

/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/


export class CacheMapState {
	
	constructor(cacheId) {
		
		// Unique pId that identifies this cache out of all the
		// possible objects in objectPoolReducerInitState.cache
		this.cacheId = cacheId;

		// The initial data is null
		this.data = {};

		// Only the mutator should set loading to true (on init state)
		this.loading = false;
		this.loadingPromise = null;

		// When an item is inserted it is tagged with
		// an insert timestamp so we can know how old
		// it is when we retrieve it
		this.expiryTs = -1;
	}
	
}


// CacheMapModel state-mutators (Reducer cases)
export function mutatorCacheMapModelInitData(action, subState: CacheMapState): CacheMapState {
	subState.data = Object.assign(subState.data, {
		[action.itemId]: Object.assign(new CacheMapState(action.itemId), {
			loading: true,
			loadingPromise: action.loadingPromise
		})
	});
	return subState;
}

export function mutatorCacheMapModelSetData(action, subState: CacheMapState): CacheMapState {
	subState.data = Object.assign(subState.data, {
		[action.itemId]: Object.assign(new CacheMapState(action.itemId), {
			data: {...action.data},
			loading: false,
			loadingPromise: null,
			expiryTs: seconds() + Const.defaultDataCacheTTLSec
		})
	});
	return subState;
}

export function mutatorCacheMapModelInvalidateData(action, subState: CacheMapState): CacheMapState {
	delete subState.data[action.itemId];
	return subState;
}

export function mutatorCacheMapModelInvalidateAllData(action, subState: CacheMapState): CacheMapState {
	return new CacheMapState(action.cacheId);
}
