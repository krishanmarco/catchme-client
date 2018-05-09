/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Colors, Screens} from '../../Config';
import {t} from "../i18n/Translations";
import type {TNavigator} from "../types/Types";


const navbarStyle = {
	navBarBackgroundColor: Colors.primary,
	statusBarColor: Colors.primary,
	navBarButtonColor: Colors.white,
	navBarTextColor: Colors.white,
	screenBackgroundColor: Colors.background,
};

const defaultOptions = {
	animated: true,
	animationType: 'fade',
};

const screenOptions = {
	...defaultOptions,
	navigatorStyle: navbarStyle,
};

const fullScreenOptions = {
	...defaultOptions,
	navigatorStyle: {navBarHidden: true},
};


export default class Router {
	static navbarStyle = navbarStyle;
	static tabIdxUserProfile = 0;
	static tabIdxSearch = 1;
	static tabIdxFeed = 2;
	static tabIdxFeaturedAds = 3;

	static toUserProfileTab(navigator: TNavigator) {
		navigator.switchToTab({
			tabIndex: Router.tabIdxUserProfile,
			passProps: {initialPage: 1}
		});
	}

	static toSearchTab(navigator: TNavigator) {
		navigator.switchToTab({tabIndex: Router.tabIdxSearch});
	}

	static toFeedTab(navigator: TNavigator) {
		navigator.switchToTab({tabIndex: Router.tabIdxFeed});
	}

	static toFeaturedAdsTab(navigator: TNavigator) {
		navigator.switchToTab({tabIndex: Router.tabIdxFeaturedAds});
	}

	static toScreenLogin(navigator: TNavigator) {
		navigator.push({
			title: t('t_catchme'),
			screen: Screens.ScreenLogin,
			...screenOptions
		});
	}

	static toScreenAddContacts(navigator: TNavigator) {
		navigator.push({
			title: t('t_my_contacts'),
			screen: Screens.ScreenAddContacts,
			...screenOptions
		});
	}

	static toScreenLogout(navigator: TNavigator) {
		navigator.push({
			title: t('t_logout'),
			screen: Screens.ScreenLogout,
			...screenOptions
		});
	}

	static toScreenNewLocation(navigator: TNavigator) {
		navigator.push({
			title: t('t_new_location'),
			screen: Screens.ScreenNewLocation,
			...screenOptions
		});
	}

	static toScreenHelpAppInfo(navigator: TNavigator) {
		navigator.push({
			title: t('t_catchme'),
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

	static toModalSettingsUserAccount(navigator: TNavigator) {
		navigator.showModal({
			title: t('t_account'),
			screen: Screens.ScreenSettingsUserAccount,
			...screenOptions
		});
	}

	static toModalSettingsUserNotifications(navigator: TNavigator) {
		navigator.showModal({
			title: t('t_notifications'),
			screen: Screens.ScreenSettingsUserNotifications,
			...screenOptions
		});
	}

	static toModalSettingsAdminLocations(navigator: TNavigator) {
		navigator.showModal({
			title: t('t_my_locations'),
			screen: Screens.ScreenSettingsAdminLocations,
			...screenOptions
		});
	}

	static toModalSettingsChangePassword(navigator: TNavigator) {
		navigator.showModal({
			title: t('t_change_password'),
			screen: Screens.ScreenSettingsChangePassword,
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

	static toModalRegister(navigator: TNavigator) {
		navigator.showModal({
			screen: Screens.ScreenRegister,
			...fullScreenOptions
		});
	}

	static toModalRecoverPassword(navigator: TNavigator) {
		navigator.showModal({
			screen: Screens.ScreenRecoverPassword,
			...fullScreenOptions
		});
	}


}