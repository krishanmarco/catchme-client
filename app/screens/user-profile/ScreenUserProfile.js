/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import PropTypes from 'prop-types';
import React from 'react';
import UserProfile from './UserProfile';
import {poolConnect} from '../../redux/ReduxPool';
import {NullableObjects, Screen} from "../../comp/Misc";
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {CACHE_MAP_ID_USER_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefUserProfiles";

// _ScreenUserProfile ***********************************************************************************
// _ScreenUserProfile ***********************************************************************************

class _ScreenUserProfile extends React.Component {

	constructor(props, context) {
		super(props, context);
	}


	componentWillMount() {

		// Initialize the logged in user profile
		this.props[CACHE_ID_USER_PROFILE].initialize();

		// Initialize the profile of the user that is being viewed
		this.props[CACHE_MAP_ID_USER_PROFILES].initializeItem(this.props.userId)
			.then(userProfile => this.props.navigator.setTitle({title: DaoUser.gName(userProfile)}));

	}

	_authenticatedUserProfile() {
		return this.props[CACHE_ID_USER_PROFILE].data;
	}

	_userProfile() {
		if (this.props.userId === DaoUser.gId(this._authenticatedUserProfile()))
			return this._authenticatedUserProfile();

		return this.props[CACHE_MAP_ID_USER_PROFILES].get(this.props.userId);
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._userProfile(), this._authenticatedUserProfile()]}
					renderChild={([userProfile, authenticatedUserProfile]) => (
						<UserProfile
							navigator={this.props.navigator}
							userProfile={userProfile}
							authenticatedUserProfile={authenticatedUserProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenUserProfile = poolConnect(_ScreenUserProfile,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenUserProfile;

ScreenUserProfile.propTypes = {
	userId: PropTypes.number.isRequired
};