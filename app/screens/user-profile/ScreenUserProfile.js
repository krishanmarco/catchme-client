/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import NavbarHandlerAppLogo from "../../lib/navigation/NavbarHandlerAppLogo";
import React from 'react';
import UserProfile from './UserProfile';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {CACHE_MAP_ID_USER_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefUserProfiles";
import {CacheState} from "../../lib/redux-pool/cache/CacheModel";
import {NullableObjects, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import type {TCacheMapPool} from "../../lib/redux-pool/cache-map/CacheMapPool";
import type {TCachePool} from "../../lib/redux-pool/cache/CachePool";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";

// Const ************************************************************************************************
// Const ************************************************************************************************

export type ScreenUserProfileProps = {
	navigator: TNavigator,
	userId: number,
	showAppLogo: boolean,
	[CACHE_ID_USER_PROFILE]: CacheState
};

const defaultProps = {
	showAppLogo: false
};

// _ScreenUserProfile ***********************************************************************************
// _ScreenUserProfile ***********************************************************************************

class _ScreenUserProfile extends React.Component<void, ScreenUserProfileProps, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._renderUserProfile = this._renderUserProfile.bind(this);

		const {showAppLogo, navigator} = this.props;
		this.navbarHandler = new NavbarHandlerAppLogo(navigator, showAppLogo);
	}

	componentWillMount() {
		const {navigator, userId} = this.props;

		// Initialize the logged in user profile
		this._cacheUserProfile().initialize();

		// Initialize the profile of the user that is being viewed
		this._cacheMapUserProfiles().initializeItem(userId)
			.then(userProfile => navigator.setTitle({title: DaoUser.gName(userProfile)}));
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_cacheMapUserProfiles(): TCacheMapPool {
		return this.props[CACHE_MAP_ID_USER_PROFILES];
	}

	_userProfile() {
		const {userId} = this.props;

		const authUser: TUser = this._cacheUserProfile().data;
		if (userId === DaoUser.gId(authUser))
			return authUser;

		return this._cacheMapUserProfiles().get(userId);
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._userProfile(), this._cacheUserProfile().data]}
					renderChild={this._renderUserProfile}/>
			</Screen>
		);
	}

	_renderUserProfile([userProfile, authUserProfile]) {
		const {navigator} = this.props;
		return (
			<UserProfile
				navigator={navigator}
				userProfile={userProfile}
				authUserProfile={authUserProfile}/>
		);
	}

}

const ScreenUserProfile = poolConnect(_ScreenUserProfile,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenUserProfile;
