/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Linking} from 'react-native';
import {Icons} from '../../Config';
import type {TUser} from "../daos/DaoUser";
import DaoUser from "../daos/DaoUser";
import Router from "../helpers/Router";
import type {TDataPoint, TSectionListDataPointSections} from '../types/Types';


export default class UserProfileDataPoints {

  static handleOnItemPress(pressedItemId: string, userProfile: TUser, navigator) {
    switch (pressedItemId) {
      case UserProfileDataPoints.infoItemIdPhone:
      case UserProfileDataPoints.infoItemIdEmail:
        break;
      case UserProfileDataPoints.infoItemIdAccount:
        Router.toSettingsUserAccount(navigator);
        break;
      case UserProfileDataPoints.infoItemIdAdminLocations:
        Router.toSettingsAdminLocations(navigator);
        break;
      case UserProfileDataPoints.infoItemIdNotifications:
        Router.toSettingsUserNotifications(navigator);
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
      userInfoSections.push({title: 'USER INFO', data: userDataSectionData});


    if (this.includeSettingsAndHelp) {
      userInfoSections.push({title: 'SETTINGS', data: this._buildUserSettingsSectionData()});
      userInfoSections.push({title: ' ', data: this._buildUserHelpSectionData()});
    }

    return userInfoSections;
  }


  _buildUserDataSectionData(): Array<TDataPoint> {
    const userDataSectionData = [];

    if (DaoUser.hasEmail(this.userProfile))
      userDataSectionData.push(this._infoItemUserEmail());

    if (DaoUser.hasPhone(this.userProfile))
      userDataSectionData.push(this._infoItemUserPhone());

    return userDataSectionData;
  }

  _buildUserSettingsSectionData(): Array<TDataPoint> {
    return [
        this._infoItemAccount(),
        this._infoItemNotifications(),
        this._infoItemAdminLocations()
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




  _infoItemUserEmail(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdEmail,
      title: DaoUser.gEmail(this.userProfile),
      icon: Icons.email
    };
  }

  _infoItemUserPhone(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdPhone,
      title: DaoUser.gPhone(this.userProfile),
      icon: Icons.phone
    };
  }

  _infoItemAccount(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdAccount,
      title: 'Account',
      icon: Icons.settingAccount
    };
  }

  _infoItemNotifications(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdNotifications,
      title: 'Notifications',
      icon: Icons.settingNotifications
    };
  }

  _infoItemAdminLocations(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdAdminLocations,
      title: 'My locations',
      icon: Icons.settingAdminLocations
    };
  }

  _infoItemFAQ(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdHelpFAQ,
      title: 'FAQ'
    };
  }

  _infoItemContactUs(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdHelpContactUs,
      title: 'Contact us'
    };
  }

  _infoItemTermsOfService(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdHelpTermsOfService,
      title: 'Terms of service'
    };
  }

  _infoItemAppInfo(): TDataPoint {
    return {
      id: UserProfileDataPoints.infoItemIdHelpAppInfo,
      title: 'App info.'
    };
  }


}


