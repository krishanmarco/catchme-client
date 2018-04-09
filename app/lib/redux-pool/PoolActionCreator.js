/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/

import {POOL_TYPE_CACHE, ReduxPoolBuilder} from "../../redux/ReduxPool";
import type {TDispatch, TGetState} from "../types/Types";

type TPoolActionDispatchObj = {
	type: string
};

export default class PoolActionCreator {

	constructor(poolType: string, poolDefId: string, dispatch: TDispatch) {
		this.poolType = poolType;
		this.poolId = poolDefId;
		this.dispatch = dispatch.bind(this);
		this.getPoolDef = this.getPoolDef.bind(this);
		this.getPoolState = this.getPoolState.bind(this);
		this.dispatchAction = this.dispatchAction.bind(this);
		this.dispatchPromiseAction = this.dispatchPromiseAction.bind(this);
	}
	
	
	getPoolDef() {
		return ReduxPoolBuilder[this.poolType].defs[this.poolId];
	}

	getPoolState(getState: TGetState) {
		return getState().reduxPoolReducer[this.poolType][this.poolId];
	}

	dispatchAction(object: TPoolActionDispatchObj) {
		const {dispatch, poolType, poolId} = this;
		return dispatch({poolType, poolId, ...object});
	}

	dispatchPromiseAction(object: TPoolActionDispatchObj, promise: Promise) {
		return this.dispatchAction({payload: promise, ...object}).then(({value}) => value);
	}


}