/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import SettingsUserAdminLocations from './SettingsUserAdminLocations';
import {CACHE_ID_USER_PROFILE} from '../../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {NullableObjects, Screen} from '../../../comp/Misc';
import {poolConnect} from '../../../redux/ReduxPool';
import type {TCachePool} from '../../../lib/redux-pool/cache/CachePool';
import type {TNavigator} from '../../../lib/types/Types';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
}

// _ScreenSettingsAdminLocations ************************************************************************
// _ScreenSettingsAdminLocations ************************************************************************
// todo ui the {Add a new Location} screen is cropped on small screen devices
class _ScreenSettingsAdminLocations extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._renderSettingsUserAdminLocations = this._renderSettingsUserAdminLocations.bind(this);
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
					renderChild={this._renderSettingsUserAdminLocations}/>
			</Screen>
		);
	}

	_renderSettingsUserAdminLocations([userProfile]) {
		const {navigator} = this.props;
		return (
			<SettingsUserAdminLocations
				navigator={navigator}
				userProfile={userProfile}/>
		);
	}

}

const ScreenSettingsAdminLocations = poolConnect(_ScreenSettingsAdminLocations,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenSettingsAdminLocations;
