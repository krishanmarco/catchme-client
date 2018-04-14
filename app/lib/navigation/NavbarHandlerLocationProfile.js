/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import ApiClient from "../data/ApiClient";
import DaoLocation from "../daos/DaoLocation";
import DaoUser from "../daos/DaoUser";
import Router from "./Router";
import type {TLocation} from "../daos/DaoLocation";
import type {TNavigator} from "../types/Types";
import type {TUser} from "../daos/DaoUser";


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

export default class NavbarHandlerLocationProfile {

	constructor(navigator: TNavigator, authUserProfile: TUser, locationProfile: TLocation) {
		this.navigator = navigator;
		this.authUserProfile = authUserProfile;
		this.locationProfile = locationProfile;

		this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
		this.setup();
	}

	setup() {
		const {navigator, authUserProfile, locationProfile} = this;

		// If the locationProfile has not been set yet,
		// do not display the navigation buttons
		if (locationProfile == null)
			return;

		const favoriteIds = DaoUser.gLocationsFavoriteIds(authUserProfile);
		const locationId = DaoLocation.gId(locationProfile);

		const rightButtons = [];

		if (!favoriteIds.includes(locationId))
			rightButtons.push(navbarButtonFollowLocation);

		rightButtons.push(navbarButtonAddUserLocationStatus);

		navigator.setButtons({rightButtons});
		navigator.setOnNavigatorEvent(this._onNavigatorEvent);
	}

	_onNavigatorEvent(event) {
		if (event.type !== 'NavBarButtonPress')
			return;

		const {locationProfile} = this;

		// A navigator button was pressed
		if (locationProfile == null)
			return;

		if (event.id === navbarButtonAddUserLocationStatus.id) {
			this._onNavigatorUserLocationStatusPress();
			return;
		}

		if (event.id === navbarButtonFollowLocation.id) {
			this._onNavigatorFollowLocationPress();
			return;
		}
	}

	_onNavigatorUserLocationStatusPress() {
		const {navigator, locationProfile} = this;
		Router.toModalUserLocationStatus(
			navigator,
			{locationId: DaoLocation.gId(locationProfile)}
		);
	}

	_onNavigatorFollowLocationPress() {
		const {authUserProfile, locationProfile} = this;

		// Update the UI immediately without waiting for a positive response
		DaoUser.addLocationToFavorites(authUserProfile, locationProfile);
		this.setup();

		ApiClient.userLocationsFavoritesAdd(DaoLocation.gId(locationProfile))
			.catch((error) => {
				// Operation failed, revert the UI back to it's original state
				DaoUser.removeLocationFromFavorites(locationProfile);
				this.setup();
			});
	}

}