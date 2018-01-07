/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Navigation} from 'react-native-navigation';

import {Colors, Const} from './Config';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import ReduxReducer from './redux/Reducers';

import DaoUser from "./lib/daos/DaoUser";
import ApiClient from './lib/data/ApiClient';
import ApiAuthentication from './lib/data/ApiAuthentication';
import firebase from './lib/data/Firebase';

import ScreenLocationProfile from './screens/location-profile/ScreenLocationProfile';
import ScreenEditLocation from './screens/location-edit/ScreenEditLocation';
import ScreenUserProfile from './screens/user-profile/ScreenUserProfile';
import ScreenFeed from './screens/feed/ScreenFeed';
import ScreenFeaturedAds from './screens/featured-ads/ScreenFeaturedAds';
import ScreenSearch from './screens/search/ScreenSearch';

import ScreenSettingsUserAccount from './screens/settings/user-account/ScreenSettingsUserAccount';
import ScreenSettingsAdminLocations from './screens/settings/user-admin-locations/ScreenSettingsAdminLocations';
import ScreenSettingsUserNotifications from './screens/settings/user-notifications/ScreenSettingsUserNotifications';
import ScreenHelpAppInfo from './screens/help/app-info/ScreenHelpAppInfo';
import ScreenLogout from './screens/settings/logout/ScreenLogout';
import ScreenAddContacts from './screens/settings/add-contacts/ScreenAddContacts';

import ModalTiming from './screens/timing/ModalTiming';
import ModalAddressPicker from './screens/address-picker/ModalAddressPicker';
import ModalUserLocationStatus from './screens/user-location-status/ModalUserLocationStatus';

import CameraWrapper from './comp/misc/camera/CameraWrapper';
import type {TUser} from "./lib/daos/DaoUser";


export default function run(authenticatedUser: TUser) {

  // Must be the first statement
  // The user is logged in and cannot be null
  ApiAuthentication.update(DaoUser.gId(authenticatedUser), DaoUser.gApiKey(authenticatedUser));


  ApiClient.userFirebaseJwt()
      .then(jwt => {
        console.log(`AppAuthenticated _: Received firebase jwt ${jwt}`);
        return firebase.auth().signInWithCustomToken(jwt)
      })
      .catch(exception => {
        console.log("AppAuthenticated _: Failed to login to firebase: ", exception);
      });




  const store = createStore(ReduxReducer, applyMiddleware(ReduxThunk, promiseMiddleware()));

  [

    {name: Const.NavigationComponents.ScreenUserProfile, getComponent: () => ScreenUserProfile},
    {name: Const.NavigationComponents.ScreenLocationProfile, getComponent: () => ScreenLocationProfile},
    {name: Const.NavigationComponents.ScreenSearch, getComponent: () => ScreenSearch},
    {name: Const.NavigationComponents.ScreenFeed, getComponent: () => ScreenFeed},
    {name: Const.NavigationComponents.ScreenFeaturedAds, getComponent: () => ScreenFeaturedAds},

    {name: Const.NavigationComponents.ScreenEditLocation, getComponent: () => ScreenEditLocation},

    {name: Const.NavigationComponents.ModalCamera, getComponent: () => CameraWrapper},
    {name: Const.NavigationComponents.ModalTiming, getComponent: () => ModalTiming},
    {name: Const.NavigationComponents.ModalAddressPicker, getComponent: () => ModalAddressPicker},
    {name: Const.NavigationComponents.ModalUserLocationStatus, getComponent: () => ModalUserLocationStatus},

    {name: Const.NavigationComponents.ScreenSettingsUserAccount, getComponent: () => ScreenSettingsUserAccount},
    {name: Const.NavigationComponents.ScreenSettingsAdminLocations, getComponent: () => ScreenSettingsAdminLocations},
    {name: Const.NavigationComponents.ScreenSettingsUserNotifications, getComponent: () => ScreenSettingsUserNotifications},
    {name: Const.NavigationComponents.ScreenLogout, getComponent: () => ScreenLogout},
    {name: Const.NavigationComponents.ScreenAddContacts, getComponent: () => ScreenAddContacts},
    {name: Const.NavigationComponents.ScreenHelpAppInfo, getComponent: () => ScreenHelpAppInfo}

  ].map(route => Navigation.registerComponent(route.name, route.getComponent, store, Provider));




  Navigation.startTabBasedApp({
    tabs: [
      {
        icon: require('./assets/icons/americanExpressIcon.png'),
        selectedIcon: require('./assets/icons/masterCardIcon.png'),
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
        icon: require('./assets/icons/americanExpressIcon.png'),
        selectedIcon: require('./assets/icons/masterCardIcon.png'),
        screen: Const.NavigationComponents.ScreenSearch,
        title: 'Search',
        navigatorStyle: {}
      },
      {
        icon: require('./assets/icons/americanExpressIcon.png'),
        selectedIcon: require('./assets/icons/masterCardIcon.png'),
        screen: Const.NavigationComponents.ScreenFeed,
        title: 'Feed',
        navigatorStyle: {}
      },
      {
        icon: require('./assets/icons/americanExpressIcon.png'),
        selectedIcon: require('./assets/icons/masterCardIcon.png'),
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