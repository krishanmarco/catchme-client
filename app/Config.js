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
	questionMark: {name: 'ios-help', type: 'ionicon', color: Colors.primary},
	user: {name: 'ios-person', type: 'ionicon', color: Colors.primary},
	cup: {name: 'md-wine', type: 'ionicon', color: Colors.primary},
	friends: {name: 'ios-people', type: 'ionicon', color: Colors.primary},
	info: {name: 'ios-information-circle', type: 'ionicon', color: Colors.primary},
	female: {name: 'ios-female', type: 'ionicon', color: Colors.primary},
	male: {name: 'ios-male', type: 'ionicon', color: Colors.primary},
	email: {name: 'email', type: 'entypo', color: Colors.primary},
	phone: {name: 'phone', type: 'entypo', color: Colors.primary},
	personSettings: {name: 'account-settings-variant', type: 'material-community', color: Colors.primary},
	bell: {name: 'ios-notifications', type: 'ionicon', color: Colors.primary},
	building: {name: 'location-city', type: 'material-icons', color: Colors.primary},
	hand: {name: 'md-hand', type: 'ionicon', color: Colors.primary},
	images: {name: 'md-images', type: 'ionicon', color: Colors.primary},
	timeNow: {name: 'timer-sand-empty', type: 'material-community', color: Colors.primary},
	timeFuture: {name: 'timer-sand', type: 'material-community', color: Colors.primary},
	chat: {name: 'ios-chatbubbles', type: 'ionicon', color: Colors.primary},
	timings: {name: 'calendar-clock', type: 'material-community', color: Colors.primary},
	mapSigns: {name: 'map-signs', type: 'font-awesome', color: Colors.primary},
	pen: {name: 'pencil', type: 'material-community', color: Colors.primary},
	penEdit: {name: 'edit', type: 'material-icons', color: Colors.neutralOrange},
	bin: {name: 'delete', type: 'material-icons', color: Colors.alertRed},
	save: {name: 'save', type: 'fontawesome', color: Colors.alertRed},
	plus: {name: 'plus', type: 'evilicons', color: Colors.primary},
};

export const FontIcons = {
	google: String.fromCharCode(61856),
	facebook: String.fromCharCode(61594),
};

export const Icons = {
	defaultIcon: _Icons.questionMark,
	userProfile: _Icons.user,
	userLocations: _Icons.cup,
	userFriends: _Icons.friends,
	userInfo: _Icons.info,
	genderFemale: _Icons.female,
	genderMale: _Icons.male,
	genderUnknown: _Icons.questionMark,
	userPhone: _Icons.phone,
	userEmail: _Icons.email,
	userAccountSettings: _Icons.personSettings,
	userNotificationSettings: _Icons.bell,
	userEditAvatar: _Icons.bell,
	locationFollow: _Icons.cup,
	userFollow: {..._Icons.hand, color: Colors.primary},
	userBlock: {..._Icons.hand, color: Colors.alertRed},
	userAdminLocations: _Icons.building,
	locationProfile: _Icons.building,
	locationImages: _Icons.images,
	locationPersonNow: _Icons.timeNow,
	locationPersonFuture: _Icons.timeFuture,
	locationChat: _Icons.chat,
	locationInfo: _Icons.info,
	locationPhone: _Icons.phone,
	locationEmail: _Icons.email,
	locationTimings: _Icons.timings,
	locationMap: _Icons.mapSigns,
	locationEditAvatar: _Icons.pen,
	locationSave: _Icons.save,
	statusEdit: _Icons.penEdit,
	statusDelete: _Icons.bin,
	galleryAddImage: _Icons.plus,


	friendRequestAccept: {name: 'md-hand', type: 'ionicon', color: Colors.primary},
	friendRequestDeny: {name: 'md-hand', type: 'ionicon', color: Colors.secondary},
	locationAttendanceAccept: {name: 'logo-apple', type: 'ionicon'},
	locationFavorites: {name: 'logo-apple', type: 'ionicon'},
	userLocationStatusNow: {name: 'logo-apple', type: 'ionicon'},
	userLocationStatusLater: {name: 'logo-apple', type: 'ionicon'},
	search: {name: 'md-search', type: 'ionicon'},
	back: {name: 'logo-apple', type: 'ionicon'},
	phone: {name: 'logo-apple', type: 'ionicon'},
	email: {name: 'logo-apple', type: 'ionicon'},
	settingAdminLocations: {name: 'logo-apple', type: 'ionicon'},
	settingAccount: {name: 'logo-apple', type: 'ionicon'},
	settingPrivacy: {name: 'logo-apple', type: 'ionicon'},
	settingChangePassword: {name: 'logo-apple', type: 'ionicon'},
	settingChangePhone: {name: 'logo-apple', type: 'ionicon'},
	settingNotifications: {name: 'logo-apple', type: 'ionicon'},
	settingLogout: {name: 'logo-apple', type: 'ionicon'},
	settingHelp: {name: 'logo-apple', type: 'ionicon'},
	locationOpenTimes: {name: 'logo-apple', type: 'ionicon'},
	locationAdminAdd: {name: 'logo-apple', type: 'ionicon'},
	address: {name: 'logo-apple', type: 'ionicon'},
	sad: {name: 'logo-apple', type: 'ionicon'},
	addImage: {name: 'logo-apple', type: 'ionicon'},
	addTiming: {name: 'plus', type: 'evilicon', color: Colors.primary},
	removeTiming: {name: 'minus', type: 'evilicon', color: Colors.alertRed},
	save: {name: 'save', type: 'fontawesome', color: Colors.alertRed},
};


// Urls *************************************************************************************************
// Urls *************************************************************************************************

export const Urls = {
	api: 'http://www.catchme.krishanmadan.website/api',
	apiImages: 'http://www.catchme.krishanmadan.website/img'
};


// Screens **********************************************************************************************
// Screens **********************************************************************************************

export const Screens = {
	ScreenLocationProfile: `${Globals.packageName}.ScreenLocationProfile`,
	ScreenUserProfile: `${Globals.packageName}.ScreenUserProfile`,
	ScreenFeed: `${Globals.packageName}.ScreenUserFeed`,
	ScreenSearch: `${Globals.packageName}.ScreenSearch`,
	ScreenLogin: `${Globals.packageName}.ScreenLogin`,
	ScreenRegister: `${Globals.packageName}.ScreenRegister`,
	ScreenRecoverPassword: `${Globals.packageName}.ScreenRecoverPassword`,
	ScreenAddressPicker: `${Globals.packageName}.ScreenAddressPicker`,
	ScreenSettingsUserAccount: `${Globals.packageName}.ScreenSettingsUserAccount`,
	ScreenSettingsAdminLocations: `${Globals.packageName}.ScreenSettingsAdminLocations`,
	ScreenSettingsUserNotifications: `${Globals.packageName}.ScreenSettingsUserNotifications`,
	ScreenSettingsChangePassword: `${Globals.packageName}.ScreenSettingsChangePassword`,
	ScreenAddContacts: `${Globals.packageName}.ScreenAddContacts`,
	ScreenLogout: `${Globals.packageName}.ScreenLogout`,
	ScreenEditLocation: `${Globals.packageName}.ScreenEditLocation`,
	ScreenNewLocation: `${Globals.packageName}.ScreenNewLocation`,
	ScreenFeaturedAds: `${Globals.packageName}.ScreenFeaturedAds`,
	ScreenHelpAppInfo: `${Globals.packageName}.ScreenHelpAppInfo`,
	ScreenCamera: `${Globals.packageName}.ScreenCamera`,
	ScreenTimings: `${Globals.packageName}.ScreenTimings`,
	ScreenUserLocationStatus: `${Globals.packageName}.ScreenUserLocationStatus`
};


// ActionHandlerActions *********************************************************************************
// ActionHandlerActions *********************************************************************************

export const ActionHandlerActions = {
	FriendshipRequestAccept: 'FriendshipRequestAccept',
	FriendshipRequestDeny: 'FriendshipRequestDeny',
	AttendanceConfirm: 'AttendanceConfirm',
	LocationFollow: 'LocationFollow',
	GoToLocationProfile: 'GoToLocationProfile',
	GoToUserProfile: 'GoToUserProfile',
};


// Const ************************************************************************************************
// Const ************************************************************************************************

export const Const = {
	devMode: true,
	loggingEnabled: false,

	dismissModalConfig: {animationType: 'slide-down'},

	googlePlacesKey: 'AIzaSyBiqqmxejdNoFPGl-sxBdQazETzNLkcVwA',
	googlePlacesDebounceTimeMs: 500,

	apiAuthRSAN: 'd466e1dafbba9fc2db029277d5349e4605f29661958aee8e67146892397412d630582952d054b767c8afb96dbfdc35e1cf0cd446c1f0cfda4a8f66a8422d7f152ad580d751b191423a4c8ddca4b7c860344d410555ed25cbf4e8e41aba9874ed92cb17205d347d788a1a48a1239cb731eebe0fe914f8363cf0e5fdf324d799c1',
	apiAuthRSAE: '10001',

	apiMax401: 5,

	dataProviderCacheTTLSec: 0, 				// 5 * 60,

	imagesCachingPolicy: 'reload',			// One of ['default', 'reload', 'force-cache', 'only-if-cached']

	defaultOnEndReachedThreshold: 0.5,

	clockSize: 230,

	firebaseConfig: {
		apiKey: 'AIzaSyAou7dzdwfMFwmMqcxSs09I9RPohvr2jlI',
		databaseURL: 'https://catch-me-179514.firebaseio.com'
	},

	chatPaginationSize: 20,
	firebasePaginationSize: 10,

	userDefaultAvatar: `${Urls.apiImages}/avatar-placeholder.png`,
	userDefaultPrivacySettings: '22222',
	userDefaultNotificationsSettings: '111',

	locationNewId: -1,
	locationDefaultAvatar: `${Urls.apiImages}/avatar-placeholder.png`,
	locationInitialRegion: {latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.02, longitudeDelta: 0.02},

	userLocationStatusDefaultLaterStartHrs: 22,
	userLocationStatusDefaultStayHrs: 2

};
