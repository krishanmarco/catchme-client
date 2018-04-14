/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoLocation from "../../lib/daos/DaoLocation";
import DaoUser from "../../lib/daos/DaoUser";
import LocationProfile from './LocationProfile';
import React from 'react';
import Router from "../../lib/navigation/Router";
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {CACHE_MAP_ID_LOCATION_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefLocationProfiles";
import {CacheMapState} from "../../lib/redux-pool/cache-map/CacheMapModel";
import {CacheState} from "../../lib/redux-pool/cache/CacheModel";
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TNavigator} from "../../lib/types/Types";
import NavbarHandlerLocationProfile from "../../lib/navigation/NavbarHandlerLocationProfile";
import type {TCacheMapPool} from "../../lib/redux-pool/cache-map/CacheMapPool";
import type {TCachePool} from "../../lib/redux-pool/cache/CachePool";


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
		this._setupNavigator();
	}

	_setupNavigator() {
		const {navigator} = this.props;
		const locationProfile = this._locationProfile();
		const authUserProfile = this._cacheUserProfile().data;

		this.navbarHandler = new NavbarHandlerLocationProfile(
			navigator,
			authUserProfile,
			locationProfile
		);
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_cacheMapLocationProfiles(): TCacheMapPool {
		return this.props[CACHE_MAP_ID_LOCATION_PROFILES];
	}

	_locationProfile(): ?TLocation {
		const {locationId} = this.props;
		return this._cacheMapLocationProfiles().get(locationId);
	}

	_onGalleryImageAdded() {
		const {locationId} = this.props;
		this._cacheMapLocationProfiles().invalidateItem(locationId);
	}


	componentWillReceiveProps(nextProps) {
		this._setupNavigator();
	}

	componentWillMount() {
		const {navigator, locationId} = this.props;

		this._cacheUserProfile().initialize();

		this._cacheMapLocationProfiles().initializeItem(locationId)
			.then(locationProfile => navigator.setTitle({title: DaoLocation.gName(locationProfile)}));
	}


	render() {
		const {navigator} = this.props;
		return (
			<Screen>
				<NullableObjects
					objects={[this._locationProfile(), this._cacheUserProfile().data]}
					renderChild={([locationProfile, authenticatedUserProfile]) => (
						<LocationProfile
							navigator={navigator}
							navbarHandler={this.navbarHandler}
							locationProfile={locationProfile}
							authenticatedUserProfile={authenticatedUserProfile}
							onGalleryImageAdded={this._onGalleryImageAdded}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenLocationProfile = poolConnect(_ScreenLocationProfile,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenLocationProfile;
