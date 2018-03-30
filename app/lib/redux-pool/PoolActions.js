/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/


import {POOL_TYPE_CACHE} from "../../redux/ReduxPool";

type TPoolActionDispatchObj = {
	type: string
};

export default class PoolActions {

	constructor(poolType, poolId, pool, dispatch) {
		this.poolType = poolType;

		this.poolId = poolId;
		this.pool = pool;
		this.dispatch = dispatch;

		this.invalidate = this.invalidate.bind(this);
		this.initialize = this.initialize.bind(this);
		this.dispatch = this.dispatch.bind(this);

		this.dispatchAction = this.dispatchAction.bind(this);
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