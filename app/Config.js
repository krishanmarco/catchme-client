/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable key-spacing */
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
	questionMark:			  	{name: 'ios-help',  					 					type: 'ionicon'},
	user: 								{name: 'ios-person',  									type: 'ionicon'},
	friends: 							{name: 'ios-people',  									type: 'ionicon'},
	info: 								{name: 'ios-information-circle',				type: 'ionicon'},
	female: 							{name: 'ios-female',  					 				type: 'ionicon'},
	male: 								{name: 'ios-male',  					 					type: 'ionicon'},
	bell: 								{name: 'ios-notifications',  						type: 'ionicon'},
	chat: 								{name: 'ios-chatbubbles',  							type: 'ionicon'},
	lock: 								{name: 'ios-lock', 											type: 'ionicon'},
	help: 								{name: 'ios-help-circle-outline', 			type: 'ionicon'},
	cup: 									{name: 'md-wine',  					 						type: 'ionicon'},
	hand: 								{name: 'md-hand',  					 						type: 'ionicon'},
	images: 							{name: 'md-images',  										type: 'ionicon'},
	search: 							{name: 'md-search',  										type: 'ionicon'},
	back: 								{name: 'md-arrow-round-back', 					type: 'ionicon'},
	google: 						 	{name: 'logo-googleplus',  							type: 'ionicon'},
	facebook: 						{name: 'logo-facebook', 							 	type: 'ionicon'},
	email: 								{name: 'email',  					 							type: 'entypo'},
	phone: 								{name: 'phone',  												type: 'entypo'},
	personSettings: 			{name: 'account-settings-variant', 			type: 'material-community'},
	timerSandEmpty: 			{name: 'timer-sand-empty',  						type: 'material-community'},
	timerSand: 						{name: 'timer-sand',  									type: 'material-community'},
	timings: 							{name: 'calendar-clock',  					 		type: 'material-community'},
	logout: 							{name: 'exit-to-app',										type: 'material-community'},
	building: 						{name: 'location-city',  					 			type: 'material-icons'},
	pen: 									{name: 'mode-edit',  										type: 'material-icons'},
	bin: 									{name: 'delete',  					 						type: 'material-icons'},
	mapSigns: 						{name: 'map-signs',  					 					type: 'font-awesome'},
	save: 								{name: 'save',  					 							type: 'font-awesome'},
	plus: 								{name: 'add-circle-outline',						type: 'evilicons'},
	star: 								{name: 'star', 		 					 						type: 'evilicons'},
};


export const Icons = {
	defaultIcon: 	 										{..._Icons.questionMark, 					color: Colors.primary},

	genderFemale:  										{..._Icons.female,  							color: Colors.primary},
	genderMale:  											{..._Icons.male,  								color: Colors.primary},
	genderUnknown:  									{..._Icons.questionMark, 					color: Colors.primary},

	userProfile:  										{..._Icons.user,  								color: Colors.primary},
	userLocationStatuses:  						{..._Icons.cup,  									color: Colors.primary},
	userLocationFavorites: 						{..._Icons.star,  								color: Colors.primary},
	userFriends: 											{..._Icons.friends,  							color: Colors.primary},
	userInfo: 												{..._Icons.info,  								color: Colors.primary},
	userPhone: 												{..._Icons.phone,  								color: Colors.primary},
	userEmail: 												{..._Icons.email,  								color: Colors.primary},
	userAccountSettings: 							{..._Icons.personSettings, 				color: Colors.primary},
	userNotificationSettings: 				{..._Icons.bell,  								color: Colors.primary},
	userEditAvatar: 									{..._Icons.pen,										color: Colors.primary},
	userFollow:  						 					{..._Icons.hand,  								color: Colors.primary},
	userBlock:  						 					{..._Icons.hand,  								color: Colors.alertRed},
	userAdminLocations:  							{..._Icons.building,  						color: Colors.primary},

	changePasswordBack:  							{..._Icons.back,  								color: Colors.primary},

	locationProfile:  								{..._Icons.building, 							color: Colors.primary},
	locationImages:  									{..._Icons.images,  							color: Colors.primary},
	locationPersonNow:  							{..._Icons.timerSandEmpty,  			color: Colors.primary},
	locationPersonFuture: 						{..._Icons.timerSand, 						color: Colors.primary},
	locationChat:  						 				{..._Icons.chat, 								  color: Colors.primary},
	locationInfo:  						 				{..._Icons.info,  								color: Colors.primary},
	locationPhone:  									{..._Icons.phone,  								color: Colors.primary},
	locationEmail:  									{..._Icons.email,  								color: Colors.primary},
	locationTimings:  								{..._Icons.timings,  							color: Colors.primary},
	locationMap:  										{..._Icons.mapSigns,  						color: Colors.primary},
	locationEditAvatar:  							{..._Icons.pen,										color: Colors.primary},
	locationEditAddress: 							{..._Icons.pen,										color: Colors.white},
	locationSave:  										{..._Icons.save,  								color: Colors.primary},
	locationFollow:  									{..._Icons.star,  								color: Colors.primary},
	locationUnfollow:  								{..._Icons.star,  								color: Colors.alertRed},

	statusEdit:  											{..._Icons.pen,  									color: Colors.neutralOrange},
	statusDelete:  										{..._Icons.bin,  									color: Colors.alertRed},

	galleryAddImage:  								{..._Icons.plus,  								color: Colors.primary},

	settingAddContacts:  							{..._Icons.friends,  							color: Colors.primary},
	settingChangePassword: 						{..._Icons.lock,  								color: Colors.primary},
	settingChangePhone: 							{..._Icons.phone, 							  color: Colors.primary},
	settingNotifications: 						{..._Icons.bell, 									color: Colors.primary},
	settingLogout:  									{..._Icons.logout, 								color: Colors.primary},
	settingHelp:  										{..._Icons.help, 									color: Colors.primary},
	settingAdminAddLocation: 					{..._Icons.plus,  								color: Colors.primary},

	searchBar:  											{..._Icons.search,  							color: Colors.primary},

	loginFacebook: 										{..._Icons.facebook,  						color: Colors.facebook},
	loginGoogle:  										{..._Icons.google,  							color: Colors.google},

	reputationJoe:  									{..._Icons.star,  								color: Colors.primary},
	reputationDude:  									{..._Icons.star,  								color: Colors.primary},
	reputationHero:  									{..._Icons.star,  								color: Colors.primary},
	reputationVip:  									{..._Icons.star,  								color: Colors.primary},
	reputationCatcher:  							{..._Icons.star,  								color: Colors.primary}

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
	loggingEnabled: true,

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
