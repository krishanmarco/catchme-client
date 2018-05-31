/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../../lib/daos/DaoUser';
import NavbarHandlerUserProfile from '../../lib/navigation/NavbarHandlerUserProfile';
import React from 'react';
import UserProfile from './UserProfile';
import {CACHE_ID_USER_PROFILE} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {CACHE_MAP_ID_USER_PROFILES} from '../../lib/redux-pool/cache-map/def/CacheMapDefUserProfiles';
import {CacheState} from '../../lib/redux-pool/cache/CacheModel';
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TCacheMapPool} from '../../lib/redux-pool/cache-map/CacheMapPool';
import type {TCacheUserProfile} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import type {TNavigator} from '../../lib/types/Types';
import type {TUser} from '../../lib/daos/DaoUser';

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
		this._reinitializeNavigator();
	}

	componentWillReceiveProps(nextProps) {
		this._reinitializeNavigator(nextProps);
	}

	componentWillMount() {
		const {navigator, userId} = this.props;

		// Initialize the logged in user profile
		this._cacheUserProfile().initialize();

		// Initialize the profile of the user that is being viewed
		this._cacheMapUserProfiles().initializeItem(userId)
			.then(userProfile => navigator.setTitle({title: DaoUser.gName(userProfile)}));
	}

	_reinitializeNavigator(props = this.props) {
		const {navigator, showAppLogo} = this.props;
		this.navbarHandler = new NavbarHandlerUserProfile(
			navigator,
			this._cacheUserProfile(props),
			this._userProfile(props),
			showAppLogo
		);
	}

	_cacheUserProfile(props = this.props): TCacheUserProfile {
		return props[CACHE_ID_USER_PROFILE];
	}

	_userProfile(props = this.props): ?TUser {
		const {userId} = props;

		if (this._isSameUser(props))
			return this._cacheUserProfile(props).data;

		return this._cacheMapUserProfiles(props).get(userId);
	}

	_cacheMapUserProfiles(props = this.props): TCacheMapPool {
		return this.props[CACHE_MAP_ID_USER_PROFILES];
	}

	_isSameUser(props = this.props) {
		const {userId} = props;
		return DaoUser.gId(this._cacheUserProfile().data) === userId;
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
				navbarHandler={this.navbarHandler}
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
