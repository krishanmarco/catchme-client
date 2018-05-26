/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import LocationProfile from './LocationProfile';
import NavbarHandlerLocationProfile from '../../lib/navigation/NavbarHandlerLocationProfile';
import React from 'react';
import {CACHE_ID_USER_PROFILE, TCacheUserProfile} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {CACHE_MAP_ID_LOCATION_PROFILES} from '../../lib/redux-pool/cache-map/def/CacheMapDefLocationProfiles';
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TCacheMapPool} from '../../lib/redux-pool/cache-map/CacheMapPool';
import type {TLocation} from '../../lib/daos/DaoLocation';
import type {TNavigator} from '../../lib/types/Types';


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationId: number,

};

type State = {
	// Nothing for now
};


// _ScreenLocationProfile *******************************************************************************
// _ScreenLocationProfile *******************************************************************************

class _ScreenLocationProfile extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onGalleryImageAdded = this._onGalleryImageAdded.bind(this);
		this._renderLocationProfile = this._renderLocationProfile.bind(this);
		this._reinitializeNavigator();
	}

	componentWillReceiveProps(nextProps) {
		this._reinitializeNavigator(nextProps);
	}

	componentWillMount() {
		const {navigator, locationId} = this.props;

		this._cacheUserProfile().initialize();

		this._cacheMapLocationProfiles().initializeItem(locationId)
			.then(locationProfile => navigator.setTitle({title: DaoLocation.gName(locationProfile)}));
	}

	_reinitializeNavigator(props = this.props) {
		const {navigator} = props;
		this.navbarHandler = new NavbarHandlerLocationProfile(
			navigator,
			this._cacheUserProfile(props),
			this._locationProfile(props)
		);
	}

	_locationProfile(props = this.props): ?TLocation {
		const {locationId} = props;
		return this._cacheMapLocationProfiles().get(locationId);
	}

	_cacheUserProfile(props = this.props): TCacheUserProfile {
		return props[CACHE_ID_USER_PROFILE];
	}

	_cacheMapLocationProfiles(props = this.props): TCacheMapPool {
		return props[CACHE_MAP_ID_LOCATION_PROFILES];
	}

	_onGalleryImageAdded() {
		const {locationId} = this.props;
		this._cacheMapLocationProfiles().invalidateItem(locationId);
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._locationProfile(), this._cacheUserProfile().data]}
					renderChild={this._renderLocationProfile}/>
			</Screen>
		);
	}

	_renderLocationProfile([locationProfile, authUserProfile]) {
		const {navigator} = this.props;
		return (
			<LocationProfile
				navigator={navigator}
				navbarHandler={this.navbarHandler}
				locationProfile={locationProfile}
				authUserProfile={authUserProfile}
				onGalleryImageAdded={this._onGalleryImageAdded}/>
		);
	}

}

const ScreenLocationProfile = poolConnect(_ScreenLocationProfile,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenLocationProfile;
