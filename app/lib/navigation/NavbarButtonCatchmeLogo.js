/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 14-Apr-18 © **/
import type {TNavigator} from "../types/Types";

const navbarButtonCatchmeLogo = {
	id: 'NAVBAR_BUTTON_ID_CATCHME_LOGO',
	icon: require('../../assets/images/meLogo.png'),
	buttonFontSize: 2,
	buttonFontWeight: '100',
};

export default class NavbarButtonCatchmeLogo {

	static setup(navigator: TNavigator, showAppLogo: boolean = false) {

		const rightButtons = [];

		if (showAppLogo)
			rightButtons.push(navbarButtonCatchmeLogo);

		navigator.setButtons({rightButtons});
	}

}