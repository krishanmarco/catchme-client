/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import type {TDispatch, TGetState} from "../../types/Types";
import type {TReduxPoolCacheMap} from "../../types/ReduxPoolTypes";


export type TCacheMapDef<TCacheMapObject> = {

	// Unique cache-map-id that this definition represents
	cacheMapId: string,

	// Initial state of this cache-map
	initState: () => TReduxPoolCacheMap,

	// Refresh or get data associated to this cache-map
	buildDataSet: () => TCacheMapObject

};


export default class CacheMapDef {

	constructor(cacheMapId) {
		this.cacheMapId = cacheMapId;
	}

	bindAction(dispatch: TDispatch, getState: TGetState) {
		this.dispatch = dispatch;
		this.getState = getState;
	}

	unBindAction() {
		this.dispatch = null;
		this.getState = null;
	}

}