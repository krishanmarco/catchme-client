/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import SettingsUserAccount from './SettingsUserAccount';
import {CACHE_ID_USER_PROFILE} from '../../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {NullableObjects, Screen} from '../../../comp/Misc';
import {poolConnect} from '../../../redux/ReduxPool';
import type {TCachePool} from '../../../lib/redux-pool/cache/CachePool';
import type {TNavigator} from '../../../lib/types/Types';

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator
};

// _ScreenSettingsUserAccount ***************************************************************************
// _ScreenSettingsUserAccount ***************************************************************************

class _ScreenSettingsUserAccount extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._renderSettingsUserAccount =this._renderSettingsUserAccount.bind(this);
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
					renderChild={this._renderSettingsUserAccount}/>
			</Screen>
		);
	}

	_renderSettingsUserAccount([authUserProfile]) {
		const {navigator} = this.props;
		return (
			<SettingsUserAccount
				navigator={navigator}
				authUserProfile={authUserProfile}/>
		);
	}

}

const ScreenSettingsUserAccount = poolConnect(_ScreenSettingsUserAccount,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenSettingsUserAccount;
