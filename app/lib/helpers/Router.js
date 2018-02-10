/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const, Colors} from '../../Config';
import DaoLocation from '../daos/DaoLocation';
import DaoUser from "../daos/DaoUser";
import type {TModalUserLocationStatusProps} from "../../screens/user-location-status/ScreenModalUserLocationStatus";

export default class Router {
  static NAV_BUTTON_SET_USER_LOCATION_STATUS = 'NAV_BUTTON_SET_USER_LOCATION_STATUS';
  static NAV_BUTTON_FOLLOW_LOCATION = 'NAV_BUTTON_ID_FOLLOW_LOCATION';

  static toLocationProfile(navigator, location) {
    Router.toLocationProfileById(navigator, DaoLocation.gId(location), DaoLocation.gName(location));
  }

  static toLocationProfileById(navigator, locationId, title = undefined) {
    navigator.showModal({
      screen: Const.NavigationComponents.ScreenLocationProfile,
      title: title,
      passProps: {locationId: locationId},
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary,
        navBarButtonColor: Colors.white
      },
    });
  }


  static toUserProfile(navigator, user) {
    Router.toUserProfileById(navigator, DaoUser.gId(user), DaoUser.gName(user));
  }

  static toUserProfileById(navigator, userId, title = undefined) {

    navigator.showModal({
      screen: Const.NavigationComponents.ScreenUserProfile,
      title: title,
      passProps: {userId: userId},
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary,
        navBarButtonColor: Colors.white
      }
    });

  }


  static toCameraModal(navigator, props) {
    navigator.showModal({
      screen: Const.NavigationComponents.ModalCamera,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {
        navBarHidden: true,
      }
    });
  }


  static toTimingModal(navigator, title, props) {
    navigator.showModal({
      screen: Const.NavigationComponents.ModalTiming,
      title: title,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {}
    });
  }


  static toModalUserLocationStatus(navigator, props: TModalUserLocationStatusProps) {
    navigator.showModal({
      screen: Const.NavigationComponents.ModalUserLocationStatus,
      passProps: props,
      animated: true,
      animationType: 'slide-up'
    });
  }


  static toAddressPickerModal(navigator, props) {
    navigator.showModal({
      screen: Const.NavigationComponents.ModalAddressPicker,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {
        navBarHidden: true,
      }
    });
  }

  static toRegister(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenRegister,
      navigatorStyle: {
        navBarHidden: true,
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toLogin(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenLogin,
      navigatorStyle: {
        navBarHidden: true,
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toRecoverPassword(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenRecoverPassword,
      navigatorStyle: {
        navBarHidden: true,
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  // static toScreen(navigator, screenName) {
  //   navigator.push({
  //     screen: screenName,
  //     navigatorStyle: {
  //       navBarBackgroundColor: Colors.primary
  //     }
  //   });
  // }


  static toAddContactsScreen(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenAddContacts,
      title: 'My Contacts',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toLogoutScreen(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenLogout,
      title: 'Logout',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toSettingsUserAccount(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenSettingsUserAccount,
      title: 'Account',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toSettingsAdminLocations(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenSettingsAdminLocations,
      title: 'My Locations',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toSettingsUserNotifications(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenSettingsUserNotifications,
      title: 'Notifications',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


  static toSettingsChangePassword(navigator, screenName) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenSettingsChangePassword,
      title: 'Change password',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toScreenEditLocation(navigator, locationId = -1) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenEditLocation,
      title: 'My Locations',
      passProps: {locationId: locationId},
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }

  static toScreenHelpAppInfo(navigator) {
    navigator.push({
      screen: Const.NavigationComponents.ScreenHelpAppInfo,
      title: 'Catchme',
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }


}