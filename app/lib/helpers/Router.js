/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../daos/DaoLocation';
import DaoUser from "../daos/DaoUser";
import {Colors, Screens} from '../../Config';
import type {TModalUserLocationStatusProps} from "../../screens/user-location-status/ScreenModalUserLocationStatus";
import type {TUser} from "../daos/DaoUser";
import type {TNavigator} from "../types/Types";

export default class Router {
  static NAV_BUTTON_SET_USER_LOCATION_STATUS = 'NAV_BUTTON_SET_USER_LOCATION_STATUS';
  static NAV_BUTTON_FOLLOW_LOCATION = 'NAV_BUTTON_ID_FOLLOW_LOCATION';

  static toLocationProfile(navigator: TNavigator, location) {
    Router.toLocationProfileById(navigator, DaoLocation.gId(location), DaoLocation.gName(location));
  }

  static toLocationProfileById(navigator: TNavigator, locationId, title = null) {
    navigator.showModal({
      screen: Screens.ScreenLocationProfile,
      title,
      passProps: {locationId},
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary,
        navBarButtonColor: Colors.white
      },
    });
  }


  static toUserProfile(navigator: TNavigator, user: TUser) {
    Router.toUserProfileById(navigator, DaoUser.gId(user), DaoUser.gName(user));
  }

  static toUserProfileById(navigator: TNavigator, userId: number, title = null) {
    navigator.showModal({
      screen: Screens.ScreenUserProfile,
      title,
      passProps: {userId},
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary,
        navBarButtonColor: Colors.white
      }
    });

  }


  static toCameraModal(navigator: TNavigator, props) {
    navigator.showModal({
      screen: Screens.ModalCamera,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {
        navBarHidden: true,
      }
    });
  }


  static toTimingModal(navigator: TNavigator, title, props) {
    navigator.showModal({
      screen: Screens.ModalTiming,
      title,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {}
    });
  }


  static toModalUserLocationStatus(navigator: TNavigator, props: TModalUserLocationStatusProps) {
    navigator.showModal({
      screen: Screens.ModalUserLocationStatus,
      passProps: props,
      animated: true,
      animationType: 'slide-up'
    });
  }


  static toAddressPickerModal(navigator: TNavigator, props) {
    navigator.showModal({
      screen: Screens.ScreenAddressPicker,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {
        navBarHidden: true,
      }
    });
  }

  static toRegister(navigator: TNavigator) {
    navigator.push({
      screen: Screens.ScreenRegister,
      navigatorStyle: {
        navBarHidden: true,
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toLogin(navigator) {
    navigator.push({
      screen: Screens.ScreenLogin,
      navigatorStyle: {
        navBarHidden: true,
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toRecoverPassword(navigator) {
    navigator.push({
      screen: Screens.ScreenRecoverPassword,
      navigatorStyle: {
        navBarHidden: true,
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toAddContactsScreen(navigator) {
    navigator.push({
      screen: Screens.ScreenAddContacts,
      title: 'My Contacts',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toLogoutScreen(navigator) {
    navigator.push({
      screen: Screens.ScreenLogout,
      title: 'Logout',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toSettingsUserAccount(navigator) {
    navigator.push({
      screen: Screens.ScreenSettingsUserAccount,
      title: 'Account',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toSettingsAdminLocations(navigator) {
    navigator.push({
      screen: Screens.ScreenSettingsAdminLocations,
      title: 'My Locations',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toSettingsUserNotifications(navigator) {
    navigator.push({
      screen: Screens.ScreenSettingsUserNotifications,
      title: 'Notifications',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toSettingsChangePassword(navigator, screenName) {
    navigator.push({
      screen: Screens.ScreenSettingsChangePassword,
      title: 'Change password',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toScreenEditLocation(navigator, locationId) {
    navigator.push({
      screen: Screens.ScreenEditLocation,
      title: 'My Locations',
      passProps: {locationId},
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toScreenNewLocation(navigator: TNavigator) {
    navigator.push({
      screen: Screens.ScreenNewLocation,
      title: 'New Location',
      passProps: {},
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toScreenHelpAppInfo(navigator: TNavigator) {
    navigator.push({
      screen: Screens.ScreenHelpAppInfo,
      title: 'Catchme',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


}