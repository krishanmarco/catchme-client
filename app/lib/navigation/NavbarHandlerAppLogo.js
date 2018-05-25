/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import type {TNavigator} from '../types/Types';

const navbarBtAppLogo = {
	id: 'NAVBAR_BUTTON_ID_APP_LOGO',
	icon: require('../../assets/images/primary-me.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

export default class NavbarHandlerAppLogo {

	constructor(navigator: TNavigator, showAppLogo: boolean = false) {
		this.navigator = navigator;
		this.showAppLogo = showAppLogo;
		this.setup();
	}

	setup() {
		const {navigator, showAppLogo} = this;

		const rightButtons = [];

		if (showAppLogo)
			rightButtons.push(navbarBtAppLogo);

		navigator.setButtons({rightButtons});
	}

}