/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {CacheState} from "./CacheModel";


export type TCacheDef<TCacheObject> = {

	// Unique cache-id that this definition represents
	cacheId: string,

	// Initial state of this cache
	initState: () => CacheState,

	// Refresh or get data associated to this cache
	buildDataSet: () => TCacheObject

};


export default class CacheDef {

	constructor(cacheId) {
		this.cacheId = cacheId;
		this.initState = this.initState.bind(this);
	}

	initState(): CacheState {
		return new CacheState(this.cacheId);
	}

}