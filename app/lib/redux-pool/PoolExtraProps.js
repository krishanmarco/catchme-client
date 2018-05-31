/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 30-Mar-18 © **/
import {ReduxPoolBuilder} from '../../redux/ReduxPool';

export default class PoolExtraProps {

	constructor(poolType: string, poolDefId: string, stateProps, dispatchProps) {
		this.poolType = poolType;
		this.poolDefId = poolDefId;
		this.stateProps = stateProps;
		this.dispatchProps = dispatchProps;
		this.getPoolDef = this.getPoolDef.bind(this);
	}

	getPoolDef() {
		return ReduxPoolBuilder[this.poolType].defs[this.poolDefId];
	}

}