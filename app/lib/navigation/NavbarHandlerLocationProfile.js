/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import ApiClient from "../data/ApiClient";
import DaoLocation from "../daos/DaoLocation";
import DaoUser from "../daos/DaoUser";
import ImageURISourceAuth from "../data/ImageURISourceAuth";
import Logger from "../Logger";
import Router from "./Router";
import type {TLocation} from "../daos/DaoLocation";
import type {TNavigator} from "../types/Types";
import type {TUser} from "../daos/DaoUser";


const navbarButtonAddUserLocationStatus = {
	id: 'NAVBAR_BUTTON_ID_USER_LOCATION_STATUS',
	icon: require('../../assets/images/timerSandFull.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

const navbarButtonFollowLocation = {
	id: 'NAVBAR_BUTTON_ID_FOLLOW_LOCATION',
	icon: require('../../assets/images/cocktailGlass.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

const navbarButtonAddLocationImage = {
	id: 'NAVBAR_BUTTON_ID_ADD_LOCATION_IMAGE',
	icon: require('../../assets/images/search.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

export default class NavbarHandlerLocationProfile {

	constructor(navigator: TNavigator, authUserProfile: TUser, locationProfile: TLocation) {
		this.navigator = navigator;
		this.authUserProfile = authUserProfile;
		this.locationProfile = locationProfile;
		this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
		this._onCaptureImage = this._onCaptureImage.bind(this);
		this.showButtonFollow();
	}

	showButtonFollow() {
		this.visibleButtons = [navbarButtonFollowLocation.id];
		this.setup();
	}

	showButtonAddStatus() {
		this.visibleButtons = [navbarButtonAddUserLocationStatus.id];
		this.setup();
	}

	showButtonAddLocationImage(onGalleryImageAdded) {
		this.visibleButtons = [navbarButtonAddLocationImage.id];
		this.onGalleryImageAdded = onGalleryImageAdded;
		this.setup();
	}

	showNoButtons() {
		this.visibleButtons = [];
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

		if (this.visibleButtons.includes(navbarButtonFollowLocation.id)) {
			if (!favoriteIds.includes(locationId))
				rightButtons.push(navbarButtonFollowLocation);
		}

		if (this.visibleButtons.includes(navbarButtonAddUserLocationStatus.id)) {
			rightButtons.push(navbarButtonAddUserLocationStatus);
		}

		if (this.visibleButtons.includes(navbarButtonAddLocationImage.id)) {
			rightButtons.push(navbarButtonAddLocationImage);
		}

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

		if (event.id === navbarButtonAddLocationImage.id) {
			this._onNavigatorLocationAddImagePress();
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

	_onNavigatorLocationAddImagePress() {
		const {navigator, _onCaptureImage} = this;
		Router.toModalCamera(navigator, {onCaptureImage: _onCaptureImage});
	}

	_onCaptureImage(data) {
		const {locationProfile} = this;

		ApiClient.mediaAddTypeIdItemId(0, DaoLocation.gId(locationProfile), data.path)
			.then(addedUrl => {
				// Add the uploaded image to this locations images
				const images = DaoLocation.gImageUrls(locationProfile);
				images.push(addedUrl);
				this.onGalleryImageAdded(addedUrl);
			})
			.catch(error => {
				Logger.v('NavbarHandlerLocationProfile _onCaptureImage', error);
			});
	}

}