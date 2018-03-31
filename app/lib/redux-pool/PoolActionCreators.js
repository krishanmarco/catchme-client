/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/

import {ReduxPoolBuilder} from "../../redux/ReduxPool";
import type {TDispatch} from "../types/Types";

type TPoolActionDispatchObj = {
	type: string
};

export default class PoolActionCreators {

	constructor(poolType: string, poolId: string, dispatch: TDispatch) {
		this.poolType = poolType;

		this.poolId = poolId;
		this.dispatch = dispatch;

		this.invalidate = this.invalidate.bind(this);
		this.initialize = this.initialize.bind(this);
		this.dispatch = this.dispatch.bind(this);

		this.dispatchAction = this.dispatchAction.bind(this);
		this.getDef = this.getDef.bind(this);
	}
	
	
	getDef() {
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