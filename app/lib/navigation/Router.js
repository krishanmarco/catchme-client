/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Colors, Screens} from '../../Config';
import type {TNavigator} from "../types/Types";


const navbarStyle = {
	navBarBackgroundColor: Colors.primary,
	statusBarColor: Colors.primary,
	navBarButtonColor: Colors.white,
	navBarTextColor: Colors.white,
	screenBackgroundColor: Colors.background,
};

const screenOptions = {
	animated: true,
	animationType: 'fade',
	navigatorStyle: navbarStyle,
};

const fullScreenOptions = {
	animated: true,
	animationType: 'slide-up',
	navigatorStyle: {navBarHidden: true},
};


export default class Router {
	static navbarStyle = navbarStyle;

	static toScreenRegister(navigator: TNavigator) {
		navigator.push({
			title: 'Register',
			screen: Screens.ScreenRegister,
			...screenOptions
		});
	}

	static toScreenLogin(navigator: TNavigator) {
		navigator.push({
			title: 'Catchme',
			screen: Screens.ScreenLogin,
			...screenOptions
		});
	}

	static toScreenRecoverPassword(navigator: TNavigator) {
		navigator.push({
			title: 'Recover password',
			screen: Screens.ScreenRecoverPassword,
			...screenOptions
		});
	}

	static toScreenAddContacts(navigator: TNavigator) {
		navigator.push({
			title: 'My Contacts',
			screen: Screens.ScreenAddContacts,
			...screenOptions
		});
	}

	static toScreenLogout(navigator: TNavigator) {
		navigator.push({
			title: 'Logout',
			screen: Screens.ScreenLogout,
			...screenOptions
		});
	}

	static toScreenSettingsUserAccount(navigator: TNavigator) {
		navigator.push({
			title: 'Account',
			screen: Screens.ScreenSettingsUserAccount,
			...screenOptions
		});
	}

	static toScreenSettingsAdminLocations(navigator: TNavigator) {
		navigator.push({
			title: 'My Locations',
			screen: Screens.ScreenSettingsAdminLocations,
			...screenOptions
		});
	}

	static toScreenSettingsUserNotifications(navigator: TNavigator) {
		navigator.push({
			title: 'Notifications',
			screen: Screens.ScreenSettingsUserNotifications,
			...screenOptions
		});
	}

	static toScreenSettingsChangePassword(navigator: TNavigator) {
		navigator.push({
			title: 'Change password',
			screen: Screens.ScreenSettingsChangePassword,
			...screenOptions
		});
	}

	static toScreenNewLocation(navigator: TNavigator) {
		navigator.push({
			title: 'New Location',
			screen: Screens.ScreenNewLocation,
			...screenOptions
		});
	}

	static toScreenHelpAppInfo(navigator: TNavigator) {
		navigator.push({
			title: 'Catchme',
			screen: Screens.ScreenHelpAppInfo,
			...screenOptions
		});
	}

	static toScreenEditLocation(navigator: TNavigator, props, title) {
		navigator.push({
			title,
			screen: Screens.ScreenEditLocation,
			passProps: props,
			...screenOptions
		});
	}

	static toModalLocationProfile(navigator: TNavigator, props, title) {
		navigator.showModal({
			title,
			screen: Screens.ScreenLocationProfile,
			passProps: props,
			...screenOptions
		});
	}

	static toModalUserProfile(navigator: TNavigator, props, title) {
		navigator.showModal({
			title,
			screen: Screens.ScreenUserProfile,
			passProps: props,
			...screenOptions
		});
	}

	static toModalUserLocationStatus(navigator: TNavigator, props, title) {
		navigator.showModal({
			title,
			screen: Screens.ScreenUserLocationStatus,
			passProps: props,
			...screenOptions
		});
	}
	
	static toModalCamera(navigator: TNavigator, props) {
		navigator.showModal({
			screen: Screens.ScreenCamera,
			passProps: props,
			...fullScreenOptions
		});
	}

	static toModalTimings(navigator: TNavigator, props) {
		navigator.showModal({
			screen: Screens.ScreenTimings,
			passProps: props,
			...fullScreenOptions
		});
	}

	static toModalAddressPicker(navigator: TNavigator, props) {
		navigator.showModal({
			screen: Screens.ScreenAddressPicker,
			passProps: props,
			...fullScreenOptions
		});
	}


}