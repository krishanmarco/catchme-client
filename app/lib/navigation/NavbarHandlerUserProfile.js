/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import DaoUser from '../daos/DaoUser';
import {TCacheUserProfile} from '../redux-pool/cache/def/CacheDefUserProfile';
import type {TNavigator} from '../types/Types';
import type {TUser} from '../daos/DaoUser';


const navbarButtonAddConnection = {
	id: 'NAVBAR_BUTTON_ID_ADD_CONNECTION',
	icon: require('../../assets/images/navbar-hand.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};
const navbarButtonAcceptConnection = {
	id: 'NAVBAR_BUTTON_ID_ACCEPT_CONNECTION',
	icon: require('../../assets/images/navbar-hand.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

export default class NavbarHandlerUserProfile {

	constructor() {
		this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
		this._onNavigatorAddConnectionPress = this._onNavigatorAddConnectionPress.bind(this);
		this._onNavigatorAcceptConnectionPress = this._onNavigatorAcceptConnectionPress.bind(this);
		this.showButtonAddOrAcceptConnection();
	}

	initialize(navigator: TNavigator, cacheUserProfile: TCacheUserProfile, userProfile: TUser) {
		this.navigator = navigator;
		this.cacheUserProfile = cacheUserProfile;
		this.userProfile = userProfile;
	}

	showButtonAddOrAcceptConnection() {
		const {cacheUserProfile, userProfile} = this;

		if (DaoUser.gId(cacheUserProfile.data) == DaoUser.gId(userProfile))
			return;

		this.visibleButtons = [navbarButtonAddConnection.id, navbarButtonAcceptConnection.id];
		this.setup();
	}

	showNoButtons() {
		this.visibleButtons = [];
		this.setup();
	}

	setup() {
		const {navigator, cacheUserProfile, userProfile} = this;

		// If the userProfile has not been set yet,
		// do not display the navigation buttons
		if (userProfile == null)
			return;

		const uid = DaoUser.gId(userProfile);
		const friendIds = DaoUser.gConnectionFriendIds(cacheUserProfile.data);
		const pendingIds = DaoUser.gConnectionPendingIds(cacheUserProfile.data);
		const requestIds = DaoUser.gConnectionRequestIds(cacheUserProfile.data);

		const rightButtons = [];

		if (this.visibleButtons.includes(navbarButtonAddConnection.id))
			if (!friendIds.includes(uid) && !pendingIds.includes(uid) && !requestIds.includes(uid))
				rightButtons.push(navbarButtonAddConnection);

		if (this.visibleButtons.includes(navbarButtonAcceptConnection.id))
			if (requestIds.includes(uid))
				rightButtons.push(navbarButtonAcceptConnection);

		navigator.setButtons({rightButtons});
		navigator.setOnNavigatorEvent(this._onNavigatorEvent);
	}

	_onNavigatorEvent(event) {
		if (event.type !== 'NavBarButtonPress')
			return;

		const {userProfile} = this;

		// A navigator button was pressed
		if (userProfile == null)
			return;

		if (event.id === navbarButtonAddConnection.id) {
			this._onNavigatorAddConnectionPress();
			return;
		}

		if (event.id === navbarButtonAcceptConnection.id) {
			this._onNavigatorAcceptConnectionPress();
			return;
		}
	}

	_onNavigatorAddConnectionPress() {
		const {cacheUserProfile, userProfile} = this;
		cacheUserProfile.addUserToFriends(userProfile)
			.then(success => this.setup());
	}

	_onNavigatorAcceptConnectionPress() {
		const {cacheUserProfile, userProfile} = this;
		cacheUserProfile.acceptUserFriendship(userProfile)
			.then(success => this.setup());
	}

}