/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/

import {ReduxPoolBuilder} from "../../redux/ReduxPool";
import type {TDispatch} from "../types/Types";

type TPoolActionDispatchObj = {
	type: string
};

export default class PoolActionCreator {

	constructor(poolType: string, poolDefId: string, dispatch: TDispatch) {
		this.poolType = poolType;
		this.poolId = poolDefId;
		
		this.dispatch = dispatch.bind(this);
		
		this.dispatchAction = this.dispatchAction.bind(this);
		this.getPoolDef = this.getPoolDef.bind(this);
	}
	
	
	getPoolDef() {
		return ReduxPoolBuilder[this.poolType].defs[this.poolId];
	}


	dispatchAction(object: TPoolActionDispatchObj) {
		const {dispatch} = this;
		
		return dispatch({
			poolType: this.poolType,
			poolId: this.poolId,
			...object
		});
	}


}