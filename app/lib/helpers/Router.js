/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const, Colors} from '../../Config';
import DaoLocation from '../daos/DaoLocation';
import DaoUser from "../daos/DaoUser";

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


  static toTimingModal(navigator, props) {
    navigator.showModal({
      screen: Const.NavigationComponents.ModalTiming,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {}
    });
  }


  static toModalUserLocationStatus(navigator, props) {
    navigator.showModal({
      screen: Const.NavigationComponents.ModalUserLocationStatus,
      passProps: props,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {}
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


  static toScreen(navigator, screenName) {
    navigator.push({
      screen: screenName,
      navigatorStyle: {
        navBarBackgroundColor: Colors.primary
      }
    });
  }



}