/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import SettingsUserNotifications from './SettingsUserNotifications';
import {CACHE_ID_USER_PROFILE} from "../../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';

// _ScreenSettingsUserNotifications *********************************************************************
// _ScreenSettingsUserNotifications *********************************************************************

class _ScreenSettingsUserNotifications extends React.Component {

	componentWillMount() {
		// Fetch the authenticated users profile and then set
		// the users profile data into the user-profile form handler
		return this.props[CACHE_ID_USER_PROFILE].initialize();
	}


	_authenticatedUserProfile() {
		return this.props[CACHE_ID_USER_PROFILE].data;
	}


	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._authenticatedUserProfile()]}
					renderChild={([authenticatedUserProfile]) => (
						<SettingsUserNotifications
							navigator={this.props.navigator}
							authenticatedUserProfile={authenticatedUserProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSettingsUserNotifications = poolConnect(_ScreenSettingsUserNotifications,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenSettingsUserNotifications;

ScreenSettingsUserNotifications.propTypes = {
	// Nothing for now
};