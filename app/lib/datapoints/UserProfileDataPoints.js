/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {t} from "../i18n/Translations";
import DaoUser from "../daos/DaoUser";
import Router from "../navigation/Router";
import {Icons} from '../../Config';
import {Linking} from 'react-native';
import type {TDataPoint, TSectionListDataPointSections} from '../types/Types';
import type {TUser} from "../daos/DaoUser";


export default class UserProfileDataPoints {

	static handleOnItemPress(pressedItemId: string, userProfile: TUser, navigator) {
		switch (pressedItemId) {
			case UserProfileDataPoints.infoItemIdPhone:
			case UserProfileDataPoints.infoItemIdEmail:
				break;
			case UserProfileDataPoints.infoItemIdAccount:
				Router.toModalSettingsUserAccount(navigator);
				break;
			case UserProfileDataPoints.infoItemIdNotifications:
				Router.toModalSettingsUserNotifications(navigator);
				break;
			case UserProfileDataPoints.infoItemIdAdminLocations:
				Router.toModalSettingsAdminLocations(navigator);
				break;
			case UserProfileDataPoints.infoItemIdAddContacts:
				Router.toScreenAddContacts(navigator);
				break;
			case UserProfileDataPoints.infoItemIdHelpFAQ:
				Linking.openURL('http://catchme.krishanmadan.website');
				break;
			case UserProfileDataPoints.infoItemIdHelpContactUs:
				Linking.openURL('http://catchme.krishanmadan.website');
				break;
			case UserProfileDataPoints.infoItemIdHelpTermsOfService:
				Linking.openURL('http://catchme.krishanmadan.website');
				break;
			case UserProfileDataPoints.infoItemIdHelpAppInfo:
				Router.toScreenHelpAppInfo(navigator);
				break;
		}
	}


	static infoItemIdPhone = 'infoItemIdPhone';
	static infoItemIdEmail = 'infoItemIdEmail';
	static infoItemIdAccount = 'infoItemIdAccount';
	static infoItemIdNotifications = 'infoItemIdNotifications';
	static infoItemIdAdminLocations = 'infoItemIdAdminLocations';
	static infoItemIdAddContacts= 'inforItemIdAddContacts';
	static infoItemIdHelpFAQ = 'infoItemIdHelpFAQ';
	static infoItemIdHelpContactUs = 'infoItemIdHelpContactUs';
	static infoItemIdHelpTermsOfService = 'infoItemIdHelpTermsOfService';
	static infoItemIdHelpAppInfo = 'infoItemIdHelpAppInfo';



	constructor(userProfile: TUser) {
		this.userProfile = userProfile;
	}

	userProfile: TUser;
	includeSettingsAndHelp: boolean = false;


	includeSettingsAndHelpIf(include: boolean = true): UserProfileDataPoints {
		this.includeSettingsAndHelp = include;
		return this;
	}


	build(): Array<TSectionListDataPointSections> {
		const userInfoSections = [];

		const userDataSectionData = this._buildUserDataSectionData();
		if (userDataSectionData.length > 0)
			userInfoSections.push({title: t('t_user_info').toUpperCase(), data: userDataSectionData});


		if (this.includeSettingsAndHelp) {
			userInfoSections.push({title: t('t_your_account').toUpperCase(), data: this._buildUserSettingsSectionData()});
			userInfoSections.push({title: ' ', data: this._buildUserHelpSectionData()});
		}

		return userInfoSections;
	}


	_buildUserDataSectionData(): Array<TDataPoint> {
		const userDataSectionData = [];

		if (DaoUser.hasPhone(this.userProfile))
			userDataSectionData.push(this._infoItemUserPhone());

		if (DaoUser.hasEmail(this.userProfile))
			userDataSectionData.push(this._infoItemUserEmail());

		return userDataSectionData;
	}

	_buildUserSettingsSectionData(): Array<TDataPoint> {
		return [
			this._infoItemAccount(),
			this._infoItemNotifications(),
			this._infoItemAdminLocations(),
      this._infoItemAddContacts()
		];
	}

	_buildUserHelpSectionData(): Array<TDataPoint> {
		return [
			this._infoItemFAQ(),
			this._infoItemContactUs(),
			this._infoItemTermsOfService(),
			this._infoItemAppInfo(),
		];
	}




	_infoItemUserPhone(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdPhone,
			title: DaoUser.gPhone(this.userProfile),
			icon: Icons.userPhone
		};
	}

	_infoItemUserEmail(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdEmail,
			title: DaoUser.gEmail(this.userProfile),
			icon: Icons.userEmail
		};
	}

	_infoItemAccount(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdAccount,
			title: t('t_account'),
			icon: Icons.userAccountSettings
		};
	}

	_infoItemNotifications(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdNotifications,
			title: t('t_notifications'),
			icon: Icons.userNotificationSettings
		};
	}

	_infoItemAdminLocations(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdAdminLocations,
			title: t('t_my_locations'),
			icon: Icons.userAdminLocations
		};
	}

	_infoItemAddContacts(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdAddContacts,
			title: t('t_add_contacts'),
			icon: Icons.settingAddContacts
		};
	}

	_infoItemFAQ(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdHelpFAQ,
			title: t('t_faq')
		};
	}

	_infoItemContactUs(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdHelpContactUs,
			title: t('t_contact_us')
		};
	}

	_infoItemTermsOfService(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdHelpTermsOfService,
			title: t('t_tos')
		};
	}

	_infoItemAppInfo(): TDataPoint {
		return {
			id: UserProfileDataPoints.infoItemIdHelpAppInfo,
			title: t('t_app_info')
		};
	}


}

