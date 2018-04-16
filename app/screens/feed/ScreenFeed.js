/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Context from '../../lib/Context';
import Feed from './Feed';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import type {TNavigator} from "../../lib/types/Types";
import type {TCacheDefUserProfile} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import type {TCachePool} from "../../lib/redux-pool/cache/CachePool";
import NavbarHandlerAppLogo from "../../lib/navigation/NavbarHandlerAppLogo";
// todo refactor proptypes

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	showAppLogo: boolean
};

type State = {
	// Nothing for now
};

const defaultProps = {
	showAppLogo: false
};

// _ScreenFeed ******************************************************************************************
// _ScreenFeed ******************************************************************************************

class _ScreenFeed extends React.Component<void, Props, State> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);

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
					objects={[this._cacheUserProfile().data, Context.getFirebaseUser()]}
					renderChild={([userProfile]) => (
						<Feed
							userProfile={userProfile}
							navigator={this.props.navigator}/>
					)}/>
			</Screen>
		);
	}
	
}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenFeed = poolConnect(_ScreenFeed,
	// mapStateToProps
	(state) => ({}),
	
	// mapDispatchToProps
	(dispatch) => ({}),
	
	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenFeed;