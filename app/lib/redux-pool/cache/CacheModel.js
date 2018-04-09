/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/

export class CacheState {
	
	constructor(cacheId) {
		
		// Unique pId that identifies this cache out of all the
		// possible objects in objectPoolReducerInitState.cache
		this.cacheId = cacheId;
		
		// @Nullable
		// The actual data that this cache caches. If null the cache should request/build
		// the data again, else it should return it without requesting it again
		this.data = null;
		
		// This should be true only when an data is being requsted/built/...
		// and should be set to false right after
		this.loading = false;
		
		// If one API request for this cache has already been sent out but has not finished
		// yet then this object will be set to the promise returned by the API request.
		// If another request for this same cache then comes through, rather than sending out
		// a duplicate API request, this promise is returned, when the first request is completed
		// even the second request will be fulfilled
		this.loadingPromise = null;
	}
	
}

// CacheModel state-mutators (Reducer cases)
export function mutatorCacheModelInitializeData(action, subState: CacheState): CacheState {
	return {
		data: null,
		loading: true,
		loadingPromise: action.loadingPromise
	};
}

export function mutatorCacheModelSetData(action, subState: CacheState): CacheState {
	return {
		data: action.data,
		loading: false,
		loadingPromise: null
	};
}

export function mutatorCacheModelInvalidateData(action, subState: CacheState): CacheState {
	return {
		data: null,
		loading: false,
		loadingPromise: null
	};
}
