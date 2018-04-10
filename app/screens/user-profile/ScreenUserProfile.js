/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import React from 'react';
import UserProfile from './UserProfile';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {CACHE_MAP_ID_USER_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefUserProfiles";
import {CacheState} from "../../lib/redux-pool/cache/CacheModel";
import {NullableObjects, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";


// Const ************************************************************************************************
// Const ************************************************************************************************

export type ScreenUserProfileProps = {
	navigator: TNavigator,
	userId: number,
	[CACHE_ID_USER_PROFILE]: CacheState
};


// _ScreenUserProfile ***********************************************************************************
// _ScreenUserProfile ***********************************************************************************

class _ScreenUserProfile extends React.Component<any, ScreenUserProfileProps, any> {

	componentWillMount() {
		const {navigator, userId} = this.props;

		// Initialize the logged in user profile
		this.props[CACHE_ID_USER_PROFILE].initialize();

		// Initialize the profile of the user that is being viewed
		this.props[CACHE_MAP_ID_USER_PROFILES].initializeItem(userId)
			.then(userProfile => navigator.setTitle({title: DaoUser.gName(userProfile)}));
	}

	_authenticatedUserProfile(): TUser {
		return this.props[CACHE_ID_USER_PROFILE].data;
	}

	_userProfile() {
		const {userId} = this.props;

		if (userId === DaoUser.gId(this._authenticatedUserProfile()))
			return this._authenticatedUserProfile();

		return this.props[CACHE_MAP_ID_USER_PROFILES].get(userId);
	}

	render() {
		const {navigator} = this.props;
		return (
			<Screen>
				<NullableObjects
					objects={[this._userProfile(), this._authenticatedUserProfile()]}
					renderChild={([userProfile, authenticatedUserProfile]) => (
						<UserProfile
							navigator={navigator}
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
