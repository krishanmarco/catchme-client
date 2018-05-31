/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './lib/data/ApiAuthentication';
import CameraWrapper from './comp/misc/camera/CameraWrapper';
import Context from './lib/Context';
import DaoUser from './lib/daos/DaoUser';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReduxReducer from './redux/Reducers';
import ReduxThunk from 'redux-thunk';
import Router from './lib/navigation/Router';
import ScreenAddContacts from './screens/settings/add-contacts/ScreenAddContacts';
import ScreenAddressPicker from './screens/address-picker/ScreenAddressPicker';
import ScreenEditLocation from './screens/location-edit/ScreenEditLocation';
import ScreenFeaturedAds from './screens/featured-ads/ScreenFeaturedAds';
import ScreenFeed from './screens/feed/ScreenFeed';
import ScreenHelpAppInfo from './screens/help/app-info/ScreenHelpAppInfo';
import ScreenLocationProfile from './screens/location-profile/ScreenLocationProfile';
import ScreenLogout from './screens/settings/logout/ScreenLogout';
import ScreenNewLocation from './screens/location-edit/ScreenNewLocation';
import ScreenSearch from './screens/search/ScreenSearch';
import ScreenSettingsAdminLocations from './screens/settings/user-admin-locations/ScreenSettingsAdminLocations';
import ScreenSettingsChangePassword from './screens/settings/change-password/ScreenSettingsChangePassword';
import ScreenSettingsUserAccount from './screens/settings/user-account/ScreenSettingsUserAccount';
import ScreenSettingsUserNotifications from './screens/settings/user-notifications/ScreenSettingsUserNotifications';
import ScreenTimings from './screens/timing/ScreenTimings';
import ScreenUserLocationStatus from './screens/user-location-status/ScreenUserLocationStatus';
import ScreenUserProfile from './screens/user-profile/ScreenUserProfile';
import {applyMiddleware, createStore} from 'redux';
import {Colors, Screens} from './Config';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {t} from './lib/i18n/Translations';
import type {TUser} from './lib/daos/DaoUser';


export default async function initializeAuthenticatedApp(authUser: TUser) {

	// Set the api keys before starting the app
	await ApiAuthentication.update(DaoUser.gId(authUser), DaoUser.gApiKey(authUser));
	start(authUser);
}


function start(authUser: TUser) {

	const store = createStore(ReduxReducer, applyMiddleware(ReduxThunk, promiseMiddleware()));

	[
		{name: Screens.ScreenUserProfile, getComponent: () => ScreenUserProfile},
		{name: Screens.ScreenLocationProfile, getComponent: () => ScreenLocationProfile},
		{name: Screens.ScreenSearch, getComponent: () => ScreenSearch},
		{name: Screens.ScreenFeed, getComponent: () => ScreenFeed},
		{name: Screens.ScreenFeaturedAds, getComponent: () => ScreenFeaturedAds},
		{name: Screens.ScreenEditLocation, getComponent: () => ScreenEditLocation},
		{name: Screens.ScreenNewLocation, getComponent: () => ScreenNewLocation},
		{name: Screens.ScreenCamera, getComponent: () => CameraWrapper},
		{name: Screens.ScreenTimings, getComponent: () => ScreenTimings},
		{name: Screens.ScreenAddressPicker, getComponent: () => ScreenAddressPicker},
		{name: Screens.ScreenUserLocationStatus, getComponent: () => ScreenUserLocationStatus},
		{name: Screens.ScreenSettingsUserAccount, getComponent: () => ScreenSettingsUserAccount},
		{name: Screens.ScreenSettingsAdminLocations, getComponent: () => ScreenSettingsAdminLocations},
		{name: Screens.ScreenSettingsUserNotifications, getComponent: () => ScreenSettingsUserNotifications},
		{name: Screens.ScreenSettingsChangePassword, getComponent: () => ScreenSettingsChangePassword},
		{name: Screens.ScreenLogout, getComponent: () => ScreenLogout},
		{name: Screens.ScreenAddContacts, getComponent: () => ScreenAddContacts},
		{name: Screens.ScreenHelpAppInfo, getComponent: () => ScreenHelpAppInfo}

	].forEach(route => Navigation.registerComponent(route.name, route.getComponent, store, Provider));



	const tabs = [
		{
			title: t('t_catchme'),
			screen: Screens.ScreenUserProfile,
			icon: require('./assets/images/black-user.png'),
			selectedIcon: require('./assets/images/primary-user.png'),
			passProps: {showAppLogo: true, userId: DaoUser.gId(authUser)}
		},
		{
			title: t('t_search'),
			screen: Screens.ScreenSearch,
			icon: require('./assets/images/black-search.png'),
			selectedIcon: require('./assets/images/primary-search.png'),
			passProps: {showAppLogo: true}
		}
	];

	if (Context.isFirebaseEnabled()) {
		tabs.push({
			title: t('t_feed'),
			screen: Screens.ScreenFeed,
			icon: require('./assets/images/black-feed.png'),
			selectedIcon: require('./assets/images/primary-feed.png'),
			passProps: {showAppLogo: true}
		});

		tabs.push({
			title: t('t_featured'),
			screen: Screens.ScreenFeaturedAds,
			icon: require('./assets/images/black-featured.png'),
			selectedIcon: require('./assets/images/primary-featured.png'),
			passProps: {showAppLogo: true}
		});
	}

	Navigation.startTabBasedApp({
		tabs,
		tabsStyle: {
			initialTabIndex: 0,
			tabBarButtonColor: Colors.black,
			tabBarSelectedButtonColor: Colors.primary,
		},
		appStyle: {
			initialTabIndex: 0,
			tabBarButtonColor: Colors.black,
			tabBarSelectedButtonColor: Colors.primary,
			...Router.navbarStyle
		},
	});

}