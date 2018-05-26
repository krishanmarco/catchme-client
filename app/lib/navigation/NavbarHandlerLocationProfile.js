/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import ApiClient from '../data/ApiClient';
import DaoLocation from '../daos/DaoLocation';
import DaoUser from '../daos/DaoUser';
import Logger from '../Logger';
import Router from './Router';
import {Snackbar} from '../Snackbar';
import {TCacheUserProfile} from '../redux-pool/cache/def/CacheDefUserProfile';
import {Validate} from '../helpers/Validator';
import type {TLocation} from '../daos/DaoLocation';
import type {TNavigator} from '../types/Types';

const nbBtULS = {
	id: 'NB_BT_ID_ULS',
	icon: require('../../assets/images/navbar-bar.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

const nbBtFollowLocation = {
	id: 'NB_BT_ID_FOLLOW_LOCATION',
	icon: require('../../assets/images/navbar-star.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

const nbBtAddLocationImage = {
	id: 'NB_BT_ID_ADD_LOCATION_IMAGE',
	icon: require('../../assets/images/navbar-camera.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

export default class NavbarHandlerLocationProfile {

	constructor(navigator: TNavigator,
							cacheUserProfile: TCacheUserProfile,
							locationProfile: ?TLocation) {
		this.navigator = navigator;
		this.cacheUserProfile = cacheUserProfile;
		this.locationProfile = locationProfile;
		this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
		this._onCaptureImage = this._onCaptureImage.bind(this);
		this._onNavigatorUserLocationStatusPress = this._onNavigatorUserLocationStatusPress.bind(this);
		this._onNavigatorFollowLocationPress = this._onNavigatorFollowLocationPress.bind(this);
		this._onNavigatorLocationAddImagePress = this._onNavigatorLocationAddImagePress.bind(this);
		this.setup = this.setup.bind(this);
		this.showButtonFollow();
	}

	showButtonFollow() {
		this.visibleButtons = [nbBtFollowLocation.id];
		this.setup();
	}

	showButtonAddStatus() {
		this.visibleButtons = [nbBtULS.id];
		this.setup();
	}

	showButtonAddLocationImage(onGalleryImageAdded) {
		this.visibleButtons = [nbBtAddLocationImage.id];
		this.onGalleryImageAdded = onGalleryImageAdded;
		this.setup();
	}

	showNoButtons() {
		this.visibleButtons = [];
		this.setup();
	}


	setup() {
		const {navigator, cacheUserProfile, locationProfile} = this;

		// If the locationProfile has not been set yet,
		// do not display the navigation buttons
		if (locationProfile == null)
			return;

		const favoriteIds = DaoUser.gLocationsFavoriteIds(cacheUserProfile.data);
		const lid = DaoLocation.gId(locationProfile);

		const rightButtons = [];

		if (this.visibleButtons.includes(nbBtFollowLocation.id)) {
			if (!favoriteIds.includes(lid))
				rightButtons.push(nbBtFollowLocation);
		}

		if (this.visibleButtons.includes(nbBtULS.id)) {
			rightButtons.push(nbBtULS);
		}

		if (this.visibleButtons.includes(nbBtAddLocationImage.id)) {
			rightButtons.push(nbBtAddLocationImage);
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

		if (event.id === nbBtULS.id) {
			this._onNavigatorUserLocationStatusPress();
			return;
		}

		if (event.id === nbBtFollowLocation.id) {
			this._onNavigatorFollowLocationPress();
			return;
		}

		if (event.id === nbBtAddLocationImage.id) {
			this._onNavigatorLocationAddImagePress();
			return;
		}
	}

	_onNavigatorUserLocationStatusPress() {
		const {navigator, locationProfile} = this;

		// Create a new UserLocationStatus
		Router.toModalUserLocationStatus(
			navigator,
			{locationId: DaoLocation.gId(locationProfile)},
			DaoLocation.gName(locationProfile)
		);
	}

	_onNavigatorFollowLocationPress() {
		const {cacheUserProfile, locationProfile} = this;
		cacheUserProfile.followLocation(locationProfile)
			.then(this.setup);
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
			.catch(err => {
				Logger.v('NavbarHandlerLocationProfile _onCaptureImage:', err);
				Snackbar.showErrorStr(Validate.mapErrorCodeToMessage(err));
			});
	}

}