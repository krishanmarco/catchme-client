/* eslint-disable no-undefined */
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Colors, Screens} from '../../Config';
import {Platform} from 'react-native';
import {t} from '../i18n/Translations';
import type {TNavigator} from '../types/Types';

const navbarStyle = {
  // change the text color of the title (remembered across pushes)
  navBarTextColor: Colors.white,

  // change the font size of the title
  // navBarTextFontSize: 18,

  // Changes the title font
  // navBarTextFontFamily: 'font-name',

  // change the background color of the nav bar (remembered across pushes)
  navBarBackgroundColor: Colors.primary,

  // registered component name
  // navBarCustomView: 'example.CustomTopBar',

  // center/fill
  navBarComponentAlignment: 'center',

  // navBar custom component props
  // navBarCustomViewInitialProps: {},

  // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
  navBarButtonColor: Colors.white,

  // (Android - default: true, iOS - default: false). Disables TopBar elevation shadow on Lolipop and above
  // topBarElevationShadowEnabled: false,

  // make the nav bar hidden
  // navBarHidden: false,

  // make the nav bar hidden only after the user starts to scroll
  // navBarHideOnScroll: false,

  // make the nav bar semi-translucent, works best with drawUnderNavBar:true
  // navBarTranslucent: false,

  // make the nav bar transparent, works best with drawUnderNavBar:true,
  // navBarTransparent: false,

  // hide the navigation bar bottom border (hair line). Default false
  // navBarNoBorder: false,

  // draw the screen content under the nav bar, works best with navBarTranslucent:true
  // -> drawUnderNavBar: true,

  // draw the screen content under the tab bar (the tab bar is always translucent)
  // -> drawUnderTabBar: true,

  // blur the entire nav bar, works best with drawUnderNavBar:true
  // navBarBlur: false,

  // make the screen content hide the tab bar (remembered across pushes)
  // tabBarHidden: false,

  // make the status bar hidden regardless of nav bar state
  // statusBarHidden: false,

  // text color of status bar, 'dark' / 'light' (remembered across pushes)
  // statusBarTextColorScheme: 'dark',

  // subtitle color
  // navBarSubtitleColor: 'red',

  // subtitle font, 'sans-serif-thin' for example
  // navBarSubtitleFontFamily: 'font-name',

  // subtitle font size
  // navBarSubtitleFontSize: 13,

  // Default screen color, visible before the actual react view is rendered
  screenBackgroundColor: Colors.background,

  // Sets a specific orientation to a modal and all screens pushed to it. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
  orientation: 'portrait',

  // changed the navigation bar button text color when disabled.
  // disabledButtonColor: Colors.black,

  // Static while you transition between screens. Works best with screenBackgroundColor: 'transparent'
  // rootBackgroundImageName: 'iOS: <name of image in Images.xcassets>. Android: <name of drawable>',


  // iOS only: same as statusBarTextColorScheme but does NOT remember across pushes
  // statusBarTextColorSchemeSingleScreen: 'light',

  // iOS only: hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
  // statusBarHideWithNavBar: false,

  // iOS only: blur the area under the status bar, works best with navBarHidden:true
  // statusBarBlur: false,


  // iOS only: default: false. Disable the back gesture (swipe gesture) in order to pop the top screen.
  disabledBackGesture: false,

  // iOS only: default: true. Disable simultaneous gesture recognition.
  // disabledSimultaneousGesture: true,

  // iOS only: Optional. default screen background image.
  // screenBackgroundImageName: '<name of image in Images.xcassets>',


  // iOS only: Change font size nav bar buttons (eg. the back button) (remembered across pushes)
  // navBarButtonFontSize: 20,

  // iOS only: Change font weight nav bar buttons (eg. the back button) (remembered across pushes)
  // navBarButtonFontWeight: '500',


  // iOS only: Change font size of left nav bar button
  // navBarLeftButtonFontSize: 17,

  // iOS only: Change color of left nav bar button
  // navBarLeftButtonColor: 'red',

  // iOS only: Change font weight of left nav bar button
  // navBarLeftButtonFontWeight: '400',


  // iOS only: Change font size of right nav bar button
  // navBarRightButtonFontSize: 17,

  // iOS only: Change color of right nav bar button
  // navBarRightButtonColor: 'blue',

  // iOS only: Change font weight of right nav bar button
  // navBarRightButtonFontWeight: '600',


  // iOS only: Sets shadow of the navbar, Works only when topBarElevationShadowEnabled: true
  // topBarShadowColor: 'blue',

  // iOS only: Sets shadow opacity on the navbar, Works only when topBarElevationShadowEnabled: true
  // topBarShadowOpacity: 0.5,

  // iOS only: Sets shadow offset on the navbar, Works only when topBarElevationShadowEnabled: true
  // topBarShadowOffset: 12,

  // iOS only: Sets shadow radius on the navbar, Works only when topBarElevationShadowEnabled: true
  // topBarShadowRadius: 3,


  // iOS only: Sets the preferred size for the view controller’s view.
  // preferredContentSize: { width: 500, height: 500 },

  // iOS only: Sets the presentation style for modaly presented view controllers. Supported styles are: 'formSheet', 'pageSheet', 'overFullScreen', 'overCurrentContext' and 'fullScreen'.
  // modalPresentationStyle: 'formSheet',


  // iOS only: Sets the nav bar title to be in the larger iOS 11 style
  // largeTitle: false,


  // Android only: change the background color of the bottom native navigation bar.
  // navigationBarColor: Colors.primaryDark,

  // Android only: default: false. centers the title.
  // navBarTitleTextCentered: true,

  // Android only: (Android - default: false, iOS - default: depending on navBarTitleTextCentered). centers the subTitle.
  // navBarSubTitleTextCentered: true,

  // Android only: Change the font family of textual buttons
  // navBarButtonFontFamily: 'sans-serif-thin',

  // Android only: change the color of the status bar.
  statusBarColor: Colors.primary,

  // Android only: default: false, will draw the screen underneath the statusbar. Useful togheter with statusBarColor: transparent
  // drawUnderStatusBar: false,

  // Android only: Collapsing Toolbar image
  // collapsingToolBarImage: "http://lorempixel.com/400/200/",

  // Android only: Collapsing Toolbar image. Either use a url or require a local image.
  // collapsingToolBarImage: require('../../img/topbar.jpg'),

  // Android only: Collapsing Toolbar scrim color.
  // collapsingToolBarCollapsedColor: '#0f2362',

  // Android only: Optional. Set the title to bold.
  // navBarTextFontBold: false,

  // Android only: Optional, set the navBar height in pixels.
  // navBarHeight: 70,

  // Android only: Optional, set navBar top padding in dp. Useful when StatusBar.translucent=true on Android Lollipop and above.
  // navBarTopPadding: 24,

  // Android only: Optional, set topTabs height in pixels.
  // topTabsHeight: 70,

  // Android only: Optional, set a flat border under the TopBar.
  // topBarBorderColor: 'red',

  // Android only: Optional, set the width of the border.
  // topBarBorderWidth: 5.5

};

const navbarButtonStyle = {
  // for a textual button, provide the button title (label)
  // title: 'Edit',

  // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  // id: 'edit',

  // optional, used to locate this view in end-to-end tests
  // testID: 'e2e_rules',

  // optional, used to disable the button (appears faded and doesn't interact)
  // disabled: true,

  // optional, by default the image colors are overridden and tinted to navBarButtonColor,
  // set to true to keep the original image colors
  // disableIconTint: false,

  // optional, How the button is displayed in the Toolbar.
  // 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it.
  // 'always' - Always show this item as a button in an Action Bar.
  // 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified.
  // 'never' - Never show this item as a button in an Action Bar.
  showAsAction: 'always',

  // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
  buttonColor: Colors.white,

  // Set font size for the button (can also be used in setButtons function to set different button style programatically)
  buttonFontSize: 2,

  // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
  buttonFontWeight: '100',
};

const appStyle = {
  ...navbarStyle,

  // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
  orientation: 'portrait',

  // Optional, change badge text color. Android only
  // bottomTabBadgeTextColor: 'red',

  // Optional, change badge background color. Android only
  // bottomTabBadgeBackgroundColor: 'green',

  // Change the back button default arrow image with provided image. iOS only
  // backButtonImage: require('./pathToImage.png'),

  // Hide back button title. Default is false. If `backButtonTitle` provided so it will take into account and the `backButtonTitle` value will show. iOS only
  hideBackButtonTitle: true,

  /** Expected in tabStyle below *********************************************************************************/
  /** Expected in tabStyle below *********************************************************************************/

  // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
  initialTabIndex: 0,

  // make the tab bar hidden
  // tabBarHidden: false,

  // change the color of the tab icons and text (also unselected)
  tabBarButtonColor: 'black',

  // change the color of the selected tab icon and text (only selected)
  tabBarSelectedButtonColor: Colors.primary,

  // change the background color of the tab bar
  tabBarBackgroundColor: Colors.background,

  // change the translucent of the tab bar to false
  // tabBarTranslucent: false,

  // change the tab font family
  // tabBarTextFontFamily: 'Avenir-Medium',

  // iOS only. change the color of tab text
  tabBarLabelColor: Colors.black,

  // iOS only. change the color of the selected tab text
  tabBarSelectedLabelColor: Colors.primary,

  // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
  // forceTitlesDisplay: true,

  // Remove default tab bar top shadow (hairline)
  // tabBarHideShadow: true,
};

const defaultScreenOptions = {
  // unique ID registered with Navigation.registerScreen
  // screen: 'example.ScreenThree',

  // navigation bar title of the pushed screen (optional)
  // title: undefined,

  // navigation bar subtitle of the pushed screen (optional)
  // subtitle: undefined,

  // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
  // titleImage: require('../../img/my_image.png'),

  // Object that will be passed as props to the pushed screen (optional)
  // passProps: {},

  // does the push have transition animation or does it happen immediately (optional)
  animated: true,

  // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
  animationType: 'fade',

  // override the back button title (optional)
  backButtonTitle: undefined,

  // hide the back button altogether (optional)
  backButtonHidden: false,

  // override the navigator style for the pushed screen (optional)
  // navigatorStyle: {},

  // override the nav buttons for the pushed screen (optional)
  // navigatorButtons: {},


  // Peek and pop: react ref or node id (optional)
  // previewView: undefined,

  // Peek and pop: set preview height, defaults to full height (optional)
  // previewHeight: undefined,

  // Peek and pop: commit to push preview controller to the navigation stack (optional)
  // previewCommit: true,

  // Peek and pop: action presses can be detected with the `PreviewActionPress` event on the commited screen.
  // previewActions: [{id: '', title: '', style: undefined, actions: []}],
};

const screenOptions = {
  ...defaultScreenOptions,
  navigatorStyle: navbarStyle,
};

const fullScreenOptions = {
  ...defaultScreenOptions,
  navigatorStyle: {
    ...navbarStyle,

    // make the screen content hide the tab bar (remembered across pushes)
    tabBarHidden: true,

    // make the status bar hidden regardless of nav bar state
    statusBarHidden: true,
  }
};

const modalScreenOptions = {
  ...defaultScreenOptions,
  navigatorStyle: {
    ...navbarStyle,

    // make the nav bar hidden
    navBarHidden: true,

    // iOS only: hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
    statusBarHideWithNavBar: true,

    // iOS only: blur the area under the status bar, works best with navBarHidden:true
    statusBarBlur: true,

  },
};


export default class Router {
  static appStyle = appStyle;
  static navbarStyle = navbarStyle;
  static navbarButtonStyle = navbarButtonStyle;
  static tabIdxUserProfile = 0;
  static tabIdxSearch = 1;
  static tabIdxFeed = 2;
  static tabIdxFeaturedAds = 3;

  /** Screens -> Push <-> Pop */
  static _push(navigator: TNavigator, params: Object) {
    navigator.push(params);
  }

  /** Screens -> Push <-> Pop */
  static _pop(navigator: TNavigator, options: Object) {
    navigator.pop({...defaultScreenOptions, ...options});
  }

  /** Modals -> Show <-> Dismiss */
  static _show(navigator: TNavigator, params: Object) {
    navigator.showModal(params);
  }

  /** Modals -> Show <-> Dismiss */
  static _dismiss(navigator: TNavigator, options: Object) {
    navigator.dismissModal({...defaultScreenOptions, ...options});
  }

  /** Modal with Screen fallback -> Open <-> Close */
  static _open(navigator: TNavigator, params: Object) {
    if (Platform.OS === 'ios')
      Router._push(navigator, params);
    else Router._show(navigator, params);
  }

  /** Modal with Screen fallback -> Open <-> Close */
  static _close(navigator: TNavigator, options: ?Object) {
    if (Platform.OS === 'ios')
      Router._pop(navigator, options);
    else Router._dismiss(navigator, options);
  }

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
    Router._push(navigator, {
      ...screenOptions,
      title: t('t_catchme'),
      screen: Screens.ScreenLogin
    });
  }

  static toScreenLogout(navigator: TNavigator) {
    Router._push(navigator, {
      ...screenOptions,
      title: t('t_logout'),
      screen: Screens.ScreenLogout
    });
  }

  static toScreenNewLocation(navigator: TNavigator) {
    Router._push(navigator, {
      ...screenOptions,
      title: t('t_new_location'),
      screen: Screens.ScreenNewLocation
    });
  }

  static toScreenHelpAppInfo(navigator: TNavigator) {
    Router._push(navigator, {
      ...screenOptions,
      title: t('t_catchme'),
      screen: Screens.ScreenHelpAppInfo
    });
  }

  static toScreenEditLocation(navigator: TNavigator, props, title) {
    Router._push(navigator, {
      ...screenOptions,
      title,
      screen: Screens.ScreenEditLocation,
      passProps: props
    });
  }

  static toScreenAddContacts(navigator: TNavigator) {
    Router._push(navigator, {
      ...fullScreenOptions,
      title: t('t_my_contacts'),
      screen: Screens.ScreenAddContacts
    });
  }

  static toModalSettingsUserAccount(navigator: TNavigator) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title: t('t_account'),
      screen: Screens.ScreenSettingsUserAccount
    });
  }

  static toModalSettingsUserNotifications(navigator: TNavigator) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title: t('t_notifications'),
      screen: Screens.ScreenSettingsUserNotifications
    });
  }

  static toModalSettingsAdminLocations(navigator: TNavigator) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title: t('t_my_locations'),
      screen: Screens.ScreenSettingsAdminLocations
    });
  }

  static toModalLocationProfile(navigator: TNavigator, props, title) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title,
      screen: Screens.ScreenLocationProfile,
      passProps: props
    });
  }

  static toModalUserProfile(navigator: TNavigator, props, title) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title,
      screen: Screens.ScreenUserProfile,
      passProps: props
    });
  }

  static toModalUserLocationStatus(navigator: TNavigator, props, title) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title,
      screen: Screens.ScreenUserLocationStatus,
      passProps: props
    });
  }

  static toModalSettingsChangePassword(navigator: TNavigator) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title: t('t_change_password'),
      screen: Screens.ScreenSettingsChangePassword
    });
  }

  static toModalTimings(navigator: TNavigator, props, title: string) {
    Router._open(navigator, {
      ...fullScreenOptions,
      title,
      screen: Screens.ScreenTimings,
      passProps: props
    });
  }


  static toModalRegister(navigator: TNavigator) {
    Router._open(navigator, {
      ...modalScreenOptions,
      screen: Screens.ScreenRegister
    });
  }


  static toModalRecoverPassword(navigator: TNavigator) {
    Router._open(navigator, {
      ...modalScreenOptions,
      screen: Screens.ScreenRecoverPassword
    });
  }

  static toModalAddressPicker(navigator: TNavigator, props) {
    Router._show(navigator, {
      ...modalScreenOptions,
      screen: Screens.ScreenAddressPicker,
      passProps: props
    });
  }

  static toModalCamera(navigator: TNavigator, props) {
    Router._show(navigator, {
      ...modalScreenOptions,
      screen: Screens.ScreenCamera,
      passProps: props
    });
  }

  static closeUserLocationStatus(navigator: TNavigator) {
    Router._close(navigator);
  }

  static closeSettingsChangePassword(navigator: TNavigator) {
    Router._close(navigator);
  }

  static closeRegister(navigator: TNavigator) {
    Router._close(navigator);
  }

  static closeRecoverPassword(navigator: TNavigator) {
    Router._close(navigator);
  }

  static closeTimings(navigator: TNavigator) {
    Router._close(navigator);
  }

  static closeAddressPicker(navigator: TNavigator) {
    Router._dismiss(navigator, {animationType: 'slide-down'});
  }

  static closeModalCamera(navigator: TNavigator) {
    Router._dismiss(navigator);
  }

}
