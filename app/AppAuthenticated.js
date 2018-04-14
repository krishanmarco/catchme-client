/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './lib/data/ApiAuthentication';
import ApiClient from './lib/data/ApiClient';
import CameraWrapper from './comp/misc/camera/CameraWrapper';
import Context from './lib/Context';
import DaoUser from "./lib/daos/DaoUser";
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReduxReducer from './redux/Reducers';
import ReduxThunk from 'redux-thunk';
import Router from "./lib/navigation/Router";
import ScreenAddContacts from './screens/settings/add-contacts/ScreenAddContacts';
import ScreenAddressPicker from './screens/address-picker/ScreenAddressPicker';
import ScreenEditLocation from './screens/location-edit/ScreenEditLocation';
import ScreenFeaturedAds from './screens/featured-ads/ScreenFeaturedAds';
import ScreenFeed from './screens/feed/ScreenFeed';
import ScreenHelpAppInfo from './screens/help/app-info/ScreenHelpAppInfo';
import ScreenLocationProfile from './screens/location-profile/ScreenLocationProfile';
import ScreenLogout from './screens/settings/logout/ScreenLogout';
import ScreenNewLocation from "./screens/location-edit/ScreenNewLocation";
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
import type {TUser} from "./lib/daos/DaoUser";


export default function initializeAuthenticatedApp(authUser: TUser) {

	// Set the api keys before starting the app
	// Make sure update is called before authenticateFirebase
	ApiAuthentication.update(DaoUser.gId(authUser), DaoUser.gApiKey(authUser));

	return ApiClient.authenticateFirebase()
		.finally(() => start(authUser));
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
			title: 'Catchme',
			screen: Screens.ScreenUserProfile,
			icon: require('./assets/icons/iosPerson.png'),
			selectedIcon: require('./assets/icons/iosPerson.png'),
			passProps: {showAppLogo: true, userId: DaoUser.gId(authUser)}
		},
		{
			title: 'Search',
			screen: Screens.ScreenSearch,
			icon: require('./assets/icons/search.png'),
			selectedIcon: require('./assets/icons/search.png'),
			passProps: {showAppLogo: true}
		}
	];

	if (Context.isFirebaseEnabled()) {
		tabs.push({
			title: 'Feed',
			screen: Screens.ScreenFeed,
			icon: require('./assets/icons/feed.png'),
			selectedIcon: require('./assets/icons/feed.png'),
			passProps: {showAppLogo: true}
		});

		tabs.push({
			title: 'Featured',
			screen: Screens.ScreenFeaturedAds,
			icon: require('./assets/icons/spotlight.png'),
			selectedIcon: require('./assets/icons/spotlight.png'),
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