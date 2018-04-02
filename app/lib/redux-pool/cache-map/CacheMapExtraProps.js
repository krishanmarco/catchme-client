/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 02-Apr-18 © **/


export default class CacheMapExtraProps {
	
	constructor(poolId, pool, stateProps, dispatchProps) {
		this.poolId = poolId;
		this.pool = pool;
		this.stateProps = stateProps;
		this.dispatchProps = dispatchProps;
		this.get = this.get.bind(this);
	}
	
	
	
	get(itemId, extraParams) {
		const {stateProps, dispatchProps} = this;
		
		if (!(itemId in stateProps.data)) {
			dispatchProps.initializeItem(itemId, extraParams);
			return null;
		}
		
		return stateProps.data[itemId].data;
	}
	
	
	
}