/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './lib/data/ApiAuthentication';
import ApiClient from './lib/data/ApiClient';

import CameraWrapper from './comp/misc/camera/CameraWrapper';

import DaoUser from "./lib/daos/DaoUser";
import firebase from './lib/data/Firebase';
import Logger from "./lib/Logger";
import ModalAddressPicker from './screens/address-picker/ModalAddressPicker';
import ModalTiming from './screens/timing/ModalTiming';

import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReduxReducer from './redux/Reducers';
import ReduxThunk from 'redux-thunk';

import ScreenAddContacts from './screens/settings/add-contacts/ScreenAddContacts';
import ScreenEditLocation from './screens/location-edit/ScreenEditLocation';
import ScreenFeaturedAds from './screens/featured-ads/ScreenFeaturedAds';
import ScreenFeed from './screens/feed/ScreenFeed';
import ScreenHelpAppInfo from './screens/help/app-info/ScreenHelpAppInfo';
import ScreenLocationProfile from './screens/location-profile/ScreenLocationProfile';

import ScreenLogout from './screens/settings/logout/ScreenLogout';
import ScreenModalUserLocationStatus from './screens/user-location-status/ScreenModalUserLocationStatus';
import ScreenSearch from './screens/search/ScreenSearch';
import ScreenSettingsAdminLocations from './screens/settings/user-admin-locations/ScreenSettingsAdminLocations';
import ScreenSettingsChangePassword from './screens/settings/change-password/ScreenSettingsChangePassword';
import ScreenSettingsUserAccount from './screens/settings/user-account/ScreenSettingsUserAccount';
import ScreenSettingsUserNotifications from './screens/settings/user-notifications/ScreenSettingsUserNotifications';

import ScreenUserProfile from './screens/user-profile/ScreenUserProfile';
import {applyMiddleware, createStore} from 'redux';
import {Colors, Const} from './Config';

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import type {TUser} from "./lib/daos/DaoUser";
import ScreenNewLocation from "./screens/location-edit/ScreenNewLocation";


export default function initializeAuthenticatedApp(authUser: TUser) {

	// Set the api keys before starting the app
	// Make sure update is called before authenticateFirebase
	ApiAuthentication.update(DaoUser.gId(authUser), DaoUser.gApiKey(authUser));

	return ApiClient.authenticateFirebase()
		.then(() => start(authUser))
		.catch(error => {
			// todo: handle error
		});

}


function start(authenticatedUser: TUser) {

	const store = createStore(ReduxReducer, applyMiddleware(ReduxThunk, promiseMiddleware()));

	[
		{name: Const.NavigationComponents.ScreenUserProfile, getComponent: () => ScreenUserProfile},
		{name: Const.NavigationComponents.ScreenLocationProfile, getComponent: () => ScreenLocationProfile},
		{name: Const.NavigationComponents.ScreenSearch, getComponent: () => ScreenSearch},
		{name: Const.NavigationComponents.ScreenFeed, getComponent: () => ScreenFeed},
		{name: Const.NavigationComponents.ScreenFeaturedAds, getComponent: () => ScreenFeaturedAds},

		{name: Const.NavigationComponents.ScreenEditLocation, getComponent: () => ScreenEditLocation},
		{name: Const.NavigationComponents.ScreenNewLocation, getComponent: () => ScreenNewLocation},

		{name: Const.NavigationComponents.ModalCamera, getComponent: () => CameraWrapper},
		{name: Const.NavigationComponents.ModalTiming, getComponent: () => ModalTiming},
		{name: Const.NavigationComponents.ModalAddressPicker, getComponent: () => ModalAddressPicker},
		{name: Const.NavigationComponents.ModalUserLocationStatus, getComponent: () => ScreenModalUserLocationStatus},

		{name: Const.NavigationComponents.ScreenSettingsUserAccount, getComponent: () => ScreenSettingsUserAccount},
		{name: Const.NavigationComponents.ScreenSettingsAdminLocations, getComponent: () => ScreenSettingsAdminLocations},
		{
			name: Const.NavigationComponents.ScreenSettingsUserNotifications,
			getComponent: () => ScreenSettingsUserNotifications
		},
		{name: Const.NavigationComponents.ScreenSettingsChangePassword, getComponent: () => ScreenSettingsChangePassword},
		{name: Const.NavigationComponents.ScreenLogout, getComponent: () => ScreenLogout},
		{name: Const.NavigationComponents.ScreenAddContacts, getComponent: () => ScreenAddContacts},
		{name: Const.NavigationComponents.ScreenHelpAppInfo, getComponent: () => ScreenHelpAppInfo}

	].map(route => Navigation.registerComponent(route.name, route.getComponent, store, Provider));


	Navigation.startTabBasedApp({
		tabs: [
			{
				icon: require('./assets/icons/iosPerson.png'),
				selectedIcon: require('./assets/icons/iosPerson.png'),
				screen: Const.NavigationComponents.ScreenUserProfile,
				passProps: {userId: DaoUser.gId(authenticatedUser)},
				title: 'Catchme',
				navigatorStyle: {},
				/*navigatorButtons: {
					leftButtons: [
						{
							id: 'NAV_BUTTON_ID_CATCHME_LOGO',
							icon: require('./assets/images/screenLoginBackground.png'),
						}
					]
				}*/
			},
			{
				icon: require('./assets/icons/search.png'),
				selectedIcon: require('./assets/icons/search.png'),
				screen: Const.NavigationComponents.ScreenSearch,
				title: 'Search',
				navigatorStyle: {}
			},
			{
				icon: require('./assets/icons/feed.png'),
				selectedIcon: require('./assets/icons/feed.png'),
				screen: Const.NavigationComponents.ScreenFeed,
				title: 'Feed',
				navigatorStyle: {}
			},
			{
				icon: require('./assets/icons/spotlight.png'),
				selectedIcon: require('./assets/icons/spotlight.png'),
				screen: Const.NavigationComponents.ScreenFeaturedAds,
				title: 'Featured',
				navigatorStyle: {}
			}
		],
		tabsStyle: {
			initialTabIndex: 0,
			tabBarButtonColor: Colors.black,
			tabBarSelectedButtonColor: Colors.primary,
		},
		appStyle: {
			initialTabIndex: 0,
			tabBarButtonColor: Colors.black,
			tabBarSelectedButtonColor: Colors.primary,

			statusBarColor: Colors.primary,
			screenBackgroundColor: Colors.background,

			navBarBackgroundColor: Colors.primary,
			navBarButtonColor: Colors.white,
			navBarTextColor: Colors.white,
		},
	});


}