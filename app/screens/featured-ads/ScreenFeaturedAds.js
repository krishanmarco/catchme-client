/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import FeaturedAds from './FeaturedAds';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import type {TCachePool} from "../../lib/redux-pool/cache/CachePool";
// todo proptypes


// _ScreenFeaturedAds ***********************************************************************************
// _ScreenFeaturedAds ***********************************************************************************

class _ScreenFeaturedAds extends React.Component {

	componentWillMount() {
		this._cacheUserProfile().initialize();
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._cacheUserProfile().data]}
					renderChild={([authenticatedUserProfile]) => (
						<FeaturedAds
							navigator={this.props.navigator}
							userProfile={authenticatedUserProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenFeaturedAds = poolConnect(_ScreenFeaturedAds,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);

export default ScreenFeaturedAds;
