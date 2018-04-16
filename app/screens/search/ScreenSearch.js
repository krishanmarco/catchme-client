/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import NavbarHandlerAppLogo from "../../lib/navigation/NavbarHandlerAppLogo";
import React from 'react';
import Search from './Search';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TCachePool} from "../../lib/redux-pool/cache/CachePool";
import type {TNavigator} from "../../lib/types/Types";

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator,
	showAppLogo: boolean
};

const defaultProps = {
	showAppLogo: false
};

// _ScreenSearch ****************************************************************************************
// _ScreenSearch ****************************************************************************************

class _ScreenSearch extends React.Component<void, Props, void> {
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
		const {navigator} = this.props;
		return (
			<Screen>
				<NullableObjects
					objects={[this._cacheUserProfile().data]}
					renderChild={([userProfile]) => (
						<Search
							navigator={navigator}
							userProfile={userProfile}/>
					)}/>
			</Screen>
		);
	}

}

const ScreenSearch = poolConnect(_ScreenSearch,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenSearch;
