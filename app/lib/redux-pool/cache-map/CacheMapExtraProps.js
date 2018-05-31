/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 02-Apr-18 © **/
import CacheMapActionCreator from './CacheMapActionCreator';
import PoolExtraProps from '../PoolExtraProps';
import {CacheMapState} from './CacheMapModel';
import {POOL_TYPE_CACHE_MAP} from '../../../redux/ReduxPool';

export default class CacheMapExtraProps extends PoolExtraProps {
	
	constructor(poolTypeDef, stateProps: CacheMapState, dispatchProps: CacheMapActionCreator) {
		super(POOL_TYPE_CACHE_MAP, poolTypeDef, stateProps, dispatchProps);
		this.get = this.get.bind(this);
	}

	get(itemId, extraParams) {
		const {stateProps, dispatchProps} = this;

		if (!(itemId in stateProps.data) || stateProps.data[itemId] == null) {
			dispatchProps.initializeItem(itemId, extraParams);
			return null;
		}
		
		return stateProps.data[itemId].data;
	}
	

}