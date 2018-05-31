/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {CacheMapState} from './CacheMapModel';
import type {TThunk} from '../../types/Types';


export type TCacheMapDef<TCacheMapObject> = {

	// Unique cache-map-id that this definition represents
	cacheMapId: string,

	// Initial state of this cache-map
	initState: () => CacheMapState,

	// Refresh or get data associated to this cache-map
	buildDataSet: (TThunk, string|number, Object) => TCacheMapObject

};


export default class CacheMapDef {

	constructor(cacheMapId) {
		this.cacheMapId = cacheMapId;
		this.initState = this.initState.bind(this);
	}

	initState(): CacheMapState {
		return new CacheMapState(this.cacheMapId);
	}

}