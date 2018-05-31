/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import FeaturedAds from './FeaturedAds';
import NavbarHandlerAppLogo from '../../lib/navigation/NavbarHandlerAppLogo';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TCachePool} from '../../lib/redux-pool/cache/CachePool';
import type {TNavigator} from '../../lib/types/Types';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	showAppLogo: boolean
}

const defaultProps = {
	showAppLogo: false
};

// _ScreenFeaturedAds ***********************************************************************************
// _ScreenFeaturedAds ***********************************************************************************

class _ScreenFeaturedAds extends React.Component<void, Props, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._renderFeaturedAds = this._renderFeaturedAds.bind(this);

		const {showAppLogo, navigator} = this.props;
		this.navbarHandler = new NavbarHandlerAppLogo(navigator, showAppLogo);
	}

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
					renderChild={this._renderFeaturedAds}/>
			</Screen>
		);
	}

	_renderFeaturedAds([authUserProfile]) {
		const {navigator} = this.props;
		return (
			<FeaturedAds
				navigator={navigator}
				userProfile={authUserProfile}/>
		);
	}

}

const ScreenFeaturedAds = poolConnect(_ScreenFeaturedAds,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenFeaturedAds;
