/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import DaoUser from '../daos/DaoUser';
import {TCacheUserProfile} from '../redux-pool/cache/def/CacheDefUserProfile';
import type {TNavigator} from '../types/Types';
import type {TUser} from '../daos/DaoUser';


const nbBtAddConnection = {
	id: 'NB_BT_ID_ADD_CONNECTION',
	icon: require('../../assets/images/navbar-hand.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};
const nbBtAcceptConnection = {
	id: 'NB_BT_ID_ACCEPT_CONNECTION',
	icon: require('../../assets/images/navbar-hand.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

const nbBtAppLogo = {
	id: 'NB_BT_ID_APP_LOGO',
	icon: require('../../assets/images/primary-me.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

export default class NavbarHandlerUserProfile {

	constructor(navigator: TNavigator,
							cacheUserProfile: TCacheUserProfile,
							userProfile: ?TUser,
							showAppLogo: boolean = false) {
		this.navigator = navigator;
		this.cacheUserProfile = cacheUserProfile;
		this.userProfile = userProfile;
		this.showAppLogo = showAppLogo;
		this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
		this._onNavigatorAddConnectionPress = this._onNavigatorAddConnectionPress.bind(this);
		this._onNavigatorAcceptConnectionPress = this._onNavigatorAcceptConnectionPress.bind(this);
		this.setup = this.setup.bind(this);
		this.showButtonAddOrAcceptConnection();
	}

	showButtonAddOrAcceptConnection() {
		const {cacheUserProfile, userProfile} = this;

		if (cacheUserProfile.data == null || userProfile == null) {
			this.showNoButtons();
			return;
		}

		if (DaoUser.isSameUser(cacheUserProfile.data, userProfile)) {
			this.showNoButtons();
			return;
		}

		this.visibleButtons = [nbBtAddConnection.id, nbBtAcceptConnection.id];
		this.setup();
	}

	showNoButtons() {
		this.visibleButtons = [];
		this.setup();
	}

	setup() {
		const {navigator, cacheUserProfile, userProfile} = this;

		const rightButtons = [];

		// If the userProfile has not been set yet,
		// do not display the navigation buttons
		if (cacheUserProfile.data != null && userProfile != null) {
			const uid = DaoUser.gId(userProfile);
			const friendIds = DaoUser.gConnectionsFriendIds(cacheUserProfile.data);
			const pendingIds = DaoUser.gConnectionsPendingIds(cacheUserProfile.data);
			const requestIds = DaoUser.gConnectionsRequestIds(cacheUserProfile.data);

			if (this.visibleButtons.includes(nbBtAddConnection.id))
				if (!friendIds.includes(uid) && !pendingIds.includes(uid) && !requestIds.includes(uid))
					rightButtons.push(nbBtAddConnection);

			if (this.visibleButtons.includes(nbBtAcceptConnection.id))
				if (requestIds.includes(uid))
					rightButtons.push(nbBtAcceptConnection);
		}

		if (rightButtons.length <= 0 && this.showAppLogo)
			rightButtons.push(nbBtAppLogo);

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

		if (event.id === nbBtAddConnection.id) {
			this._onNavigatorAddConnectionPress();
			return;
		}

		if (event.id === nbBtAcceptConnection.id) {
			this._onNavigatorAcceptConnectionPress();
			return;
		}
	}

	_onNavigatorAddConnectionPress() {
		const {cacheUserProfile, userProfile} = this;
		cacheUserProfile.connAdd(userProfile)
			.then(this.setup);
	}

	_onNavigatorAcceptConnectionPress() {
		const {cacheUserProfile, userProfile} = this;
		cacheUserProfile.connAccept(userProfile)
			.then(this.setup);
	}

}