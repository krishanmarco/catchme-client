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


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationId: number,

};

type State = {
	// Nothing for now
};


const navbarButtonAddUserLocationStatus = {
	id: 'NAVBAR_BUTTON_ID_USER_LOCATION_STATUS',
	icon: require('../../assets/icons/timerSandFull.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

const navbarButtonFollowLocation = {
	id: 'NAVBAR_BUTTON_ID_FOLLOW_LOCATION',
	icon: require('../../assets/icons/cocktailGlass.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};


// _ScreenLocationProfile *******************************************************************************
// _ScreenLocationProfile *******************************************************************************

class _ScreenLocationProfile extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
		this._setupNavigator();
	}

	componentWillReceiveProps(nextProps) {
		this._setupNavigator();
	}

	_setupNavigator() {
		const {navigator} = this.props;

		// If the locationProfile has not been set yet,
		// do not display the navigation buttons
		const locationProfile = this._locationProfile();
		if (locationProfile == null)
			return;

		const rightButtons = [];

		const favoriteIds = DaoUser.gLocationsFavoriteIds(this._cacheUserProfile().data);
		if (!favoriteIds.includes(DaoLocation.gId(this._locationProfile())))
			rightButtons.push(navbarButtonFollowLocation);

		rightButtons.push(navbarButtonAddUserLocationStatus);

		navigator.setButtons({rightButtons});
		navigator.setOnNavigatorEvent(this._onNavigatorEvent);
	}

	_onNavigatorEvent(event) {
		if (event.type !== 'NavBarButtonPress')
			return;

		// A navigator button was pressed
		const locationProfile = this._locationProfile();
		if (locationProfile == null)
			return;

		if (event.id === navbarButtonAddUserLocationStatus.id) {
			this._onNavigatorUserLocationStatusPress(locationProfile);
			return;
		}

		if (event.id === navbarButtonFollowLocation.id) {
			this._onNavigatorFollowLocationPress(locationProfile);
			return;
		}
	}

	_onNavigatorUserLocationStatusPress(locationProfile: TLocation) {
		const {navigator} = this.props;
		Router.toModalUserLocationStatus(navigator, {locationId: DaoLocation.gId(locationProfile)});
	}

	_onNavigatorFollowLocationPress(locationProfile: TLocation) {
		// Update the UI immediately without waiting for a positive response
		DaoUser.addLocationToFavorites(this._cacheUserProfile().data, locationProfile);
		this._setupNavigator();

		ApiClient.userLocationsFavoritesAdd(DaoLocation.gId(locationProfile))
			.catch((error) => {
				// Operation failed, revert the UI back to it's original state
				DaoUser.removeLocationFromFavorites(this._locationProfile());
				this._setupNavigator();
			});
	}


	componentWillMount() {
		const {navigator, locationId} = this.props;

		this._cacheUserProfile().initialize();

		this._cacheMapLocationProfiles().initializeItem(locationId)
			.then(locationProfile => navigator.setTitle({title: DaoLocation.gName(locationProfile)}));
	}

	_cacheUserProfile(): CacheState {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_cacheMapLocationProfiles(): CacheMapState {
		return this.props[CACHE_MAP_ID_LOCATION_PROFILES];
	}

	_locationProfile(): ?TLocation {
		const {locationId} = this.props;
		return this._cacheMapLocationProfiles().get(locationId);
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
							locationProfile={locationProfile}
							authenticatedUserProfile={authenticatedUserProfile}/>
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
