/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Colors as _Colors} from './lib/theme/RkTheme';



// Globals **********************************************************************************************
// Globals **********************************************************************************************

const Globals = {
  packageName: 'it.catchme'
};

export const Colors = _Colors;




// Icons ************************************************************************************************
// Icons ************************************************************************************************

const _Icons = {
  questionMark:                 {name: 'ios-help',                  type: 'ionicon',                  color: Colors.primary},
  user:                         {name: 'ios-person',                type: 'ionicon',                  color: Colors.primary},
  cup:                          {name: 'md-wine',                   type: 'ionicon',                  color: Colors.primary},
  friends:                      {name: 'ios-people',                type: 'ionicon',                  color: Colors.primary},
  info:                         {name: 'ios-information-circle',    type: 'ionicon',                  color: Colors.primary},
  female:                       {name: 'ios-female',                type: 'ionicon',                  color: Colors.primary},
  male:                         {name: 'ios-male',                  type: 'ionicon',                  color: Colors.primary},
  email:                        {name: 'email',                     type: 'entypo',                   color: Colors.primary},
  phone:                        {name: 'phone',                     type: 'entypo',                   color: Colors.primary},
  personSettings:               {name: 'account-settings-variant',  type: 'material-community',       color: Colors.black},
  bell:                         {name: 'ios-notifications',         type: 'ionicon',                  color: Colors.black},
  building:                     {name: 'location-city',             type: 'material-icons',           color: Colors.black},
  hand:                         {name: 'md-hand',                   type: 'ionicon',                  color: Colors.primary}
};

export const Icons = {
  defaultIcon:                  _Icons.questionMark,
  userProfile:                  _Icons.user,
  userLocations:                _Icons.cup,
  userFriends:                  _Icons.friends,
  userInfo:                     _Icons.info,
  genderFemale:                 _Icons.female,
  genderMale:                   _Icons.male,
  genderUnknown:                _Icons.questionMark,
  userEmail:                    _Icons.email,
  userPhone:                    _Icons.phone,
  userAccountSettings:          _Icons.personSettings,
  userNotificationSettings:     _Icons.bell,
  userAdminLocations:           _Icons.building,
  locationFollow:               _Icons.cup,
  userFollow:                   {..._Icons.hand,        color: Colors.primary},
  userBlock:                    {..._Icons.hand,        color: Colors.alertRed},

  friendRequestAccept:          {name: 'md-hand',       type: 'ionicon',      color: Colors.primary},
  friendRequestDeny:            {name: 'md-hand',       type: 'ionicon',      color: Colors.secondary},
  locationAttendanceAccept:     {name: 'logo-apple',    type: 'ionicon'},
  locationFavorites:            {name: 'logo-apple',    type: 'ionicon'},
  userLocationStatusNow:        {name: 'logo-apple',    type: 'ionicon'},
  userLocationStatusLater:      {name: 'logo-apple',    type: 'ionicon'},
  search:                       {name: 'md-search',     type: 'ionicon'},
  back:                         {name: 'logo-apple',    type: 'ionicon'},
  phone:                        {name: 'logo-apple',    type: 'ionicon'},
  email:                        {name: 'logo-apple',    type: 'ionicon'},
  settingAdminLocations:        {name: 'logo-apple',    type: 'ionicon'},
  settingAccount:               {name: 'logo-apple',    type: 'ionicon'},
  settingPrivacy:               {name: 'logo-apple',    type: 'ionicon'},
  settingChangePassword:        {name: 'logo-apple',    type: 'ionicon'},
  settingChangePhone:           {name: 'logo-apple',    type: 'ionicon'},
  settingNotifications:         {name: 'logo-apple',    type: 'ionicon'},
  settingLogout:                {name: 'logo-apple',    type: 'ionicon'},
  settingHelp:                  {name: 'logo-apple',    type: 'ionicon'},
  locationOpenTimes:            {name: 'logo-apple',    type: 'ionicon'},
  locationAdminAdd:             {name: 'logo-apple',    type: 'ionicon'},
  address:                      {name: 'logo-apple',    type: 'ionicon'},
  sad:                          {name: 'logo-apple',    type: 'ionicon'},
  addImage:                     {name: 'logo-apple',    type: 'ionicon'},
  addTiming:                    {name: 'plus',          type: 'evilicon',     color: Colors.primary},
  removeTiming:                 {name: 'minus',         type: 'evilicon',     color: Colors.alertRed},
};




// Urls *************************************************************************************************
// Urls *************************************************************************************************

export const Urls = {
  api: 'http://www.catchme.krishanmadan.website/api',
  apiImages: 'http://www.catchme.krishanmadan.website/api/images'
};




// Constants ********************************************************************************************
// Constants ********************************************************************************************

export const Const = {

  packageName: Globals.packageName,


  NavigationComponents: {
    ScreenLocationProfile: `${Globals.packageName}.ScreenLocationProfile`,
    ScreenUserProfile: `${Globals.packageName}.ScreenUserProfile`,
    ScreenFeed: `${Globals.packageName}.ScreenUserFeed`,
    ScreenSearch: `${Globals.packageName}.ScreenSearch`,

    ScreenLogin: `${Globals.packageName}.ScreenLogin`,
    ScreenRegister: `${Globals.packageName}.ScreenRegister`,
    ScreenRecoverPassword: `${Globals.packageName}.ScreenRecoverPassword`,


    ModalCamera: `${Globals.packageName}.ModalCamera`,
    ModalTiming: `${Globals.packageName}.ModalTiming`,
    ModalAddressPicker: `${Globals.packageName}.ModalAddressPicker`,
    ModalUserLocationStatus: `${Globals.packageName}.ModalUserLocationStatus`,


    ScreenSettingsUserAccount: `${Globals.packageName}.ScreenSettingsUserAccount`,
    ScreenSettingsAdminLocations: `${Globals.packageName}.ScreenSettingsAdminLocations`,
    ScreenSettingsUserNotifications: `${Globals.packageName}.ScreenSettingsUserNotifications`,

    ScreenAddContacts: `${Globals.packageName}.ScreenAddContacts`,
    ScreenLogout: `${Globals.packageName}.ScreenLogout`,

    ScreenEditLocation: `${Globals.packageName}.ScreenEditLocation`,

    ScreenSettingsChangePassword: `${Globals.packageName}.ScreenSettingsChangePassword`,  // todo

    ScreenFeaturedAds: `${Globals.packageName}.ScreenFeaturedAds`,
    ScreenHelpAppInfo: `${Globals.packageName}.ScreenHelpAppInfo`,
  },

  GooglePlacesApi: {
    key: 'AIzaSyBiqqmxejdNoFPGl-sxBdQazETzNLkcVwA',
    debounceTimeMs: 500
  },

  ApiAuthentication: {
    RSA_N: 'd466e1dafbba9fc2db029277d5349e4605f29661958aee8e67146892397412d630582952d054b767c8afb96dbfdc35e1cf0cd446c1f0cfda4a8f66a8422d7f152ad580d751b191423a4c8ddca4b7c860344d410555ed25cbf4e8e41aba9874ed92cb17205d347d788a1a48a1239cb731eebe0fe914f8363cf0e5fdf324d799c1',
    RSA_E: '10001'
  },

  ApiClient: {
    maxApi401: 5
  },

  DataProvider: {
    cacheTTLSec: 0  // 5 * 60,
  },

  ImageURISource: {

    // One of ['default', 'reload', 'force-cache', 'only-if-cached']
    cachingPolicy: 'default'
  },


  Firebase: {
    apiKey: "AIzaSyAou7dzdwfMFwmMqcxSs09I9RPohvr2jlI",
    databaseURL: "https://catch-me-179514.firebaseio.com",
  },

  Chat: {
    loadMoreItems: 20,
    unknownUserFallback: {_id: -1, name: '', avatar: 'https://lorempixel.com/640/480/?2702'}
  },



  DaoUser: {
    defaultPrivacySettings: '22222',
    defaultNotificationSettings: '111'
  },


  FirebaseDataPool: {
    loadMoreItems: 10,
  },

  FeaturedAdsList: {
    loadMoreItems: 10,
  },



  UserLocationStatus: {
    defaultTonightStartHrs: 22,
    defaultStayHrs: 2
  },



  FeedHandler: {
    actions: {
      FriendshipRequestAccept: 'FriendshipRequestAccept',
      FriendshipRequestDeny: 'FriendshipRequestDeny',
      AttendanceConfirm: 'AttendanceConfirm',
      LocationFollow: 'LocationFollow',
      GoToLocationProfile: 'GoToLocationProfile',
      GoToUserProfile: 'GoToUserProfile',
    }
  },

};

export default {
  Colors,
  Icons,
  Urls,
  Const
};