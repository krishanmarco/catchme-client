/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import SettingsUserAdminLocations from './SettingsUserAdminLocations';
import {CACHE_ID_USER_PROFILE} from "../../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import type {TNavigator} from "../../../lib/types/Types";
import type {TCachePool} from "../../../lib/redux-pool/cache/CachePool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
}

// _ScreenSettingsAdminLocations ************************************************************************
// _ScreenSettingsAdminLocations ************************************************************************

class _ScreenSettingsAdminLocations extends React.Component<void, Props, void> {

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
						<SettingsUserAdminLocations
							navigator={navigator}
							userProfile={userProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSettingsAdminLocations = poolConnect(_ScreenSettingsAdminLocations,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenSettingsAdminLocations;

ScreenSettingsAdminLocations.propTypes = {
	// Nothing for now
};