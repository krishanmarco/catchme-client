/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Linking} from 'react-native';
import {Icons, Const} from '../../Config';
import type {TypeInfoItem} from '../types/TypeInfoItem';
import DaoUser from "../daos/DaoUser";
import Router from "../helpers/Router";


export type TUserProfileInfoItems = {

};


export default class UserProfileInfoItems {

  static handleOnItemPress(pressedItemId, navigator) {
    switch (pressedItemId) {
      case UserProfileInfoItems.infoItemIdPhone:
      case UserProfileInfoItems.infoItemIdEmail:
        break;
      case UserProfileInfoItems.infoItemIdAccount:
        Router.toSettingsUserAccount(navigator);
        break;
      case UserProfileInfoItems.infoItemIdAdminLocations:
        Router.toSettingsAdminLocations(navigator);
        break;
      case UserProfileInfoItems.infoItemIdNotifications:
        Router.toSettingsUserNotifications(navigator);
        break;
      case UserProfileInfoItems.infoItemIdHelpFAQ:
        Linking.openURL('http://catchme.krishanmadan.website');
        break;
      case UserProfileInfoItems.infoItemIdHelpContactUs:
        Linking.openURL('http://catchme.krishanmadan.website');
        break;
      case UserProfileInfoItems.infoItemIdHelpTermsOfService:
        Linking.openURL('http://catchme.krishanmadan.website');
        break;
      case UserProfileInfoItems.infoItemIdHelpAppInfo:
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



  constructor(userProfile: Object) {
    this.userProfile = userProfile;
  }

  userProfile: Object;
  includeSettingsAndHelp: boolean = false;


  includeSettingsAndHelpIf(include: boolean = true): UserProfileInfoItems {
    this.includeSettingsAndHelp = include;
    return this;
  }


  build() {
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


  _buildUserDataSectionData() {
    const userDataSectionData = [];

    if (DaoUser.hasEmail(this.userProfile))
      userDataSectionData.push(this._infoItemUserEmail());

    if (DaoUser.hasPhone(this.userProfile))
      userDataSectionData.push(this._infoItemUserPhone());

    return userDataSectionData;
  }

  _buildUserSettingsSectionData() {
    return [
        this._infoItemAccount(),
        this._infoItemNotifications(),
        this._infoItemAdminLocations()
    ];
  }

  _buildUserHelpSectionData() {
    return [
        this._infoItemFAQ(),
        this._infoItemContactUs(),
        this._infoItemTermsOfService(),
        this._infoItemAppInfo(),
    ];
  }




  _infoItemUserEmail(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdEmail,
      title: DaoUser.gEmail(this.userProfile),
      icon: Icons.email
    };
  }

  _infoItemUserPhone(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdPhone,
      title: DaoUser.gPhone(this.userProfile),
      icon: Icons.phone
    };
  }

  _infoItemAccount(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdAccount,
      title: 'Account',
      icon: Icons.settingAccount
    };
  }

  _infoItemNotifications(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdNotifications,
      title: 'Notifications',
      icon: Icons.settingNotifications
    };
  }

  _infoItemAdminLocations(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdAdminLocations,
      title: 'My locations',
      icon: Icons.settingAdminLocations
    };
  }

  _infoItemFAQ(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdHelpFAQ,
      title: 'FAQ'
    };
  }

  _infoItemContactUs(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdHelpContactUs,
      title: 'Contact us'
    };
  }

  _infoItemTermsOfService(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdHelpTermsOfService,
      title: 'Terms of service'
    };
  }

  _infoItemAppInfo(): TypeInfoItem {
    return {
      id: UserProfileInfoItems.infoItemIdHelpAppInfo,
      title: 'App info.'
    };
  }


}


