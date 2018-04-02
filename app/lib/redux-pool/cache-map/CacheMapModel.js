/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 31-Mar-18 © **/


export class CacheMapState {
	
	constructor(cacheId) {
		
		// Unique pId that identifies this cache out of all the
		// possible objects in objectPoolReducerInitState.cache
		this.cacheId = cacheId;
		
		this.data = {};
	}
	
}


// CacheMapModel state-mutators (Reducer cases)
export function mutatorCacheMapModelInitData(action, subState: CacheMapState): CacheMapState {
	return Object.assign(subState.data, {
		[action.itemId]: Object.assign(new CacheMapState(action.itemId), {
			data: null,
			loading: true,
			loadingPromise: action.loadingPromise
		})
	});
}

export function mutatorCacheMapModelSetData(action, subState: CacheMapState): CacheMapState {
	return Object.assign(subState.data, {
		[action.itemId]: Object.assign(new CacheMapState(action.itemId), {
			data: action.data,
			loading: false,
			loadingPromise: null
		})
	});
}

export function mutatorCacheMapModelInvalidateData(action, subState: CacheMapState): CacheMapState {
	delete subState.data[action.itemId];
	return subState;
}

export function mutatorCacheMapModelInvalidateAllData(action, subState: CacheMapState): CacheMapState {
	return {};
}
