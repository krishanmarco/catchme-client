/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import _ from 'lodash';
import {poolConnect, FORM_API_ID_EDIT_USER_PROFILE} from '../../../redux/ReduxPool';
import {Icons, Const} from '../../../Config';

import {View, ScrollView, Text, StyleSheet} from 'react-native';

import {RkStyleSheet} from 'react-native-ui-kitten';
import ListItemHeader from '../../../comp/misc/ListItemHeader';
import {ListItemInfo} from '../../../comp/misc/ListItemsInfos';
import {RkTextInputFromPool, RkMultiChoice} from '../../../comp/misc/forms/RkInputs';
import DaoUser from "../../../lib/daos/DaoUser";
import Router from "../../../lib/helpers/Router";
import {AvatarCircle} from "../../../comp/misc/Avatars";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const settingsUserAccountInitState = {
  // Nothing for now
};


export function settingsUserAccountReducer(state = settingsUserAccountInitState, action) {
  switch (action.type) {
      // Nothing for now
  }

  return state;
}


// FlowProps ********************************************************************************************
// FlowProps ********************************************************************************************

type Props = {
  navigator: Navigator,
  authenticatedUserProfile: Object,
  changePrivacy: Function
};

type State = {
  // Nothing for now
}



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class SettingsUserAccountPresentational extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onChangePasswordPress = this._onChangePasswordPress.bind(this);
    this._onRecoverPasswordPress = this._onRecoverPasswordPress.bind(this);
    this._onLogoutPress = this._onLogoutPress.bind(this);
    this._onAddContactsPress = this._onAddContactsPress.bind(this);
    this._onUserPicturePress = this._onUserPicturePress.bind(this);
  }

  componentWillMount() {
    // We now have access to a user profile
    // Initialize the redux pool form by setting all its values

    this._formApiEditUserProfile().change({
      [DaoUser.pSettingPrivacy]: DaoUser.gSettingPrivacy(this._userProfile()),
      [DaoUser.pPictureUrl]: DaoUser.gPictureUrl(this._userProfile()),
      [DaoUser.pPhone]: DaoUser.gPhone(this._userProfile()),
      [DaoUser.pEmail]: DaoUser.gEmail(this._userProfile()),
      [DaoUser.pPublicMessage]: DaoUser.gPublicMessage(this._userProfile()),
    });
  }

  componentWillUnmount() {
    // this._formApiEditUserProfile().post();
  }

  _navigator() { return this.props.navigator; }
  _userProfile() { return this.props.authenticatedUserProfile; }
  _formApiEditUserProfile() { return this.props[FORM_API_ID_EDIT_USER_PROFILE]; }


  _onChangePrivacyValue(index, value) {
    let privacyStr = DaoUser.gSettingPrivacy(this._formApiEditUserProfile().apiInput);
    privacyStr = privacyStr.split('');
    privacyStr[index] = value;
    privacyStr = privacyStr.join('');
    this._formApiEditUserProfile().change({[DaoUser.pSettingPrivacy]: privacyStr});
  }

  _getPrivacyValue(posIndex) {
    const field = `${DaoUser.pSettingPrivacy}[${posIndex}]`;
    return _.get(this._formApiEditUserProfile().apiInput, field, 1);
  }

  _onChangePasswordPress() {
    Router.toScreen(this._navigator(), Const.NavigationComponents.ScreenSettingsChangePassword);
  }

  _onRecoverPasswordPress() {
    Router.toScreen(this._navigator(), Const.NavigationComponents.ScreenRecoverPassword);
  }

  _onLogoutPress() {
    Router.toScreen(this._navigator(), Const.NavigationComponents.ScreenLogout);
  }

  _onAddContactsPress() {
    Router.toScreen(this._navigator(), Const.NavigationComponents.ScreenAddContacts);
  }

  _onUserPicturePress() {
    // todo: open picker and upload then update
  }


  render() {
    return (
        <ScrollView style={{flex: 1}}>
          {this._renderProfileSection()}
          {this._renderPrivacySection()}
          {this._renderSecuritySection()}
          {this._renderLogoutSection()}
        </ScrollView>
    );
  }

  _renderProfileSection() {
    return (
        <View>
          <ListItemHeader name='Profile'/>
          <View style={Styles.content}>
            <View style={{alignItems: 'center'}}>
              <AvatarCircle
                  badge={Icons.settingChangePassword}
                  rkType='big'
                  uri={DaoUser.gPictureUrl(this._userProfile())}
                  onPress={this._onUserPicturePress}/>
            </View>
            <RkTextInputFromPool
                pool={this._formApiEditUserProfile()}
                field={DaoUser.pEmail}
                rkType='row'
                label='Email'
                keyboardType='email-address'
                icon={Icons.settingChangePassword}/>
            <RkTextInputFromPool
                pool={this._formApiEditUserProfile()}
                field={DaoUser.pPhone}
                rkType='row'
                label='Phone'
                keyboardType='phone-pad'
                icon={Icons.settingChangePassword}/>
            <RkTextInputFromPool
                pool={this._formApiEditUserProfile()}
                field={DaoUser.pPublicMessage}
                rkType='row'
                multline
                numberOfLines={3}
                label='Status'
                returnKeyType='next'
                icon={Icons.settingChangePassword}/>
          </View>
        </View>
    );
  }


  _renderPrivacySection() {
    return (
        <View>
          <ListItemHeader name='Privacy'/>
          <View style={Styles.content}>
            {[
              {title: 'My previous location', options: Const.SettingsUserAccount.privacyMeFriendsEveryone},
              {title: 'My current location', options: Const.SettingsUserAccount.privacyFriendsEveryone},
              {title: 'My next location', options: Const.SettingsUserAccount.privacyMeFriendsEveryone},
              {title: 'My email', options: Const.SettingsUserAccount.privacyMeFriendsEveryone},
              {title: 'My phone number', options: Const.SettingsUserAccount.privacyMeFriendsEveryone}
            ].map((data, key) => (
                <RkMultiChoice
                    key={key}
                    {...data}
                    selectedValue={this._getPrivacyValue(key)}
                    onValueChange={value => this._onChangePrivacyValue(key, value)}/>
            ))}
          </View>
        </View>
    );
  }


  _renderSecuritySection() {
    return (
        <View>
          <ListItemHeader name='Security'/>
          <View style={Styles.content}>
            <ListItemInfo
                title='Change Password'
                icon={Icons.settingChangePassword}
                onPress={this._onChangePasswordPress}/>
            <ListItemInfo
                title='Recover Password'
                icon={Icons.settingChangePassword}
                onPress={this._onRecoverPasswordPress}/>
          </View>
        </View>
    );
  }


  _renderLogoutSection() {
    return (
        <View>
          <ListItemHeader/>
          <View style={Styles.content}>
            <ListItemInfo
                title='Add contacts'
                icon={Icons.settingChangePassword}
                onPress={this._onAddContactsPress}/>
            <ListItemInfo
                title='Logout'
                icon={Icons.settingLogout}
                onPress={this._onLogoutPress}/>
          </View>
        </View>
    );
  }

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const SettingsUserAccount = poolConnect(
    // Presentational Component
    SettingsUserAccountPresentational,

    // mapStateToProps
    (state) => state.settingsUserAccountReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_EDIT_USER_PROFILE]
);

export default SettingsUserAccount;



// Styles ***********************************************************************************************
// Styles ***********************************************************************************************

const Styles = RkStyleSheet.create(theme => ({
  content: {
    paddingHorizontal: 4,
  },
}));