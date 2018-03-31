/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 20-Mar-18 © **/
import {CacheState} from "./CacheModel";
import type {TDispatch, TGetState} from "../../types/Types";


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
	}

	initState(): CacheState {
		return new CacheState(this.cacheId);
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