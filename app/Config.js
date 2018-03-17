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
	statusEdit: _Icons.penEdit,
	statusDelete: _Icons.bin,

	
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
		ScreenSettingsChangePassword: `${Globals.packageName}.ScreenSettingsChangePassword`,
		
		ScreenAddContacts: `${Globals.packageName}.ScreenAddContacts`,
		ScreenLogout: `${Globals.packageName}.ScreenLogout`,
		
		ScreenEditLocation: `${Globals.packageName}.ScreenEditLocation`,
		ScreenNewLocation: `${Globals.packageName}.ScreenNewLocation`,

		
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

	DaoLocation: {
		// todo: add to server + change to location
		defaultAvatar: 'http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png'
	},
	
	FirebaseDataPool: {
		loadMoreItems: 10,
	},
	
	FeaturedAdsList: {
		loadMoreItems: 10,
	},
	
	
	
	UserLocationStatus: {
		defaultLaterStartHrs: 22,
		defaultStayHrs: 2
	},
	
	
	
	ActionHandler: {
		actions: {
			FriendshipRequestAccept: 'FriendshipRequestAccept',
			FriendshipRequestDeny: 'FriendshipRequestDeny',
			AttendanceConfirm: 'AttendanceConfirm',
			LocationFollow: 'LocationFollow',
			GoToLocationProfile: 'GoToLocationProfile',
			GoToUserProfile: 'GoToUserProfile',
		}
	},


	LocationMap: {
		initialRegion: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.02,
			longitudeDelta: 0.02
		}
	}
	
};

export default {
	Colors,
	Icons,
	Urls,
	Const
};