/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoUser from '../../../lib/daos/DaoUser';
import ImagePicker from '../../../lib/helpers/ImagePicker';
import Logger from '../../../lib/Logger';
import Maps from '../../../lib/data/Maps';
import React from 'react';
import Router from '../../../lib/navigation/Router';
import {AvatarFull, ListItemHeader, ListItemInfo} from '../../../comp/Misc';
import {Const, Icons} from '../../../Config';
import {FORM_API_ID_EDIT_USER_PROFILE} from '../../../lib/redux-pool/api-form/def/ApiFormDefUserProfile';
import {listItemInfoStyles} from '../../../lib/theme/Styles';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkMultiChoice, RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Snackbar} from '../../../lib/Snackbar';
import {stringReplace} from '../../../lib/HelperFunctions';
import {t} from '../../../lib/i18n/Translations';
import type {TApiFormPool} from '../../../lib/redux-pool/api-form/ApiFormPool';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
  navigator: Navigator,
  authUserProfile: Object,
  changePrivacy: Function
};


// _SettingsUserAccount *********************************************************************************
// _SettingsUserAccount *********************************************************************************

class _SettingsUserAccount extends React.Component<void, Props, void> {

  constructor(props, context) {
    super(props, context);
    this._onChangePasswordPress = this._onChangePasswordPress.bind(this);
    this._onLogoutPress = this._onLogoutPress.bind(this);
    this._onUserPicturePress = this._onUserPicturePress.bind(this);
  }

  componentWillMount() {
    const {authUserProfile} = this.props;
    this._formApiEditUserProfile().reset();
    this._formApiEditUserProfile().change(DaoUser.apiClean(authUserProfile));
  }

  componentWillUnmount() {
    // Instead of posting on back press add a navigator button to the navigator then
    // use the navigator button prop 'disabled' to disable if form is invalid
    // and on press post then dismiss, on back do not post.
    this._formApiEditUserProfile().post()
      .catch(Snackbar.showApiException);
  }

  _formApiEditUserProfile(): TApiFormPool {
    return this.props[FORM_API_ID_EDIT_USER_PROFILE];
  }

  _onChangePrivacyValue(index, value) {
    const privacyStr = DaoUser.gSettingPrivacy(this._formApiEditUserProfile().apiInput);
    this._formApiEditUserProfile().change({
      [DaoUser.pSettingPrivacy]: stringReplace(privacyStr, index, value.toString())
    });
  }

  _getPrivacyValue(posIndex) {
    return parseInt(_.get(
      this._formApiEditUserProfile().apiInput,
      `${DaoUser.pSettingPrivacy}[${posIndex}]`,
      Maps.privacy.def.id.toString()
    ), 10);
  }

  _onChangePasswordPress() {
    const {navigator} = this.props;
    Router.toModalSettingsChangePassword(navigator);
  }


  _onLogoutPress() {
    const {navigator} = this.props;
    Router.toScreenLogout(navigator);
  }

  _onUserPicturePress() {
    ImagePicker.pickImage()
      .then(response => {
        this._formApiEditUserProfile().change({
          [DaoUser.pPictureUrl]: response.uri
        });
      }).catch(err => {
      Logger.v('SettingsUserAccount _onUserPicturePress:', err);
    });
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        {this._renderProfileSection()}
        {this._renderPrivacySection()}
        {this._renderSecuritySection()}
      </ScrollView>
    );
  }

  _renderProfileSection() {
    return (
      <View>
        <AvatarFull
          source={{uri: DaoUser.gPictureUrl(this._formApiEditUserProfile().apiInput)}}
          badge={Icons.userEditAvatar}
          onPress={this._onUserPicturePress}
          defaultUri={Const.userDefaultAvatar}/>
        <View style={[styles.profileFields, listItemInfoStyles.section]}>
          <RkTextInputFromPool
            pool={this._formApiEditUserProfile()}
            field={DaoUser.pEmail}
            label={t('t_field_email')}
            keyboardType='email-address'
            icon={Icons.settingChangePassword}/>
          <RkTextInputFromPool
            pool={this._formApiEditUserProfile()}
            field={DaoUser.pPhone}
            label={t('t_field_phone')}
            keyboardType='phone-pad'
            icon={Icons.settingChangePassword}/>
          <RkTextInputFromPool
            pool={this._formApiEditUserProfile()}
            field={DaoUser.pPublicMessage}
            multiline={true}
            numberOfLines={3}
            label={t('t_field_status')}
            returnKeyType='next'
            icon={Icons.settingChangePassword}/>
        </View>
      </View>
    );
  }


  _renderPrivacySection() {
    const privacyAll = Maps.privacyOptions().map(p => ({value: p.id, ...p}));
    const privacySub = Maps.privacyOptions(['onlyMe']).map(p => ({value: p.id, ...p}));

    return (
      <View>
        <ListItemHeader name={t('t_privacy')}/>
        <View style={listItemInfoStyles.section}>
          {[
            {title: t('t_privacy_previous_location'), options: privacyAll},
            {title: t('t_privacy_current_location'), options: privacySub},
            {title: t('t_privacy_next_location'), options: privacyAll},
            {title: t('t_privacy_email'), options: privacyAll},
            {title: t('t_privacy_phone'), options: privacyAll}
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
      <View style={listItemInfoStyles.section}>
        <ListItemInfo
          title={t('t_change_password')}
          icon={Icons.settingChangePassword}
          onPress={this._onChangePasswordPress}/>
        <ListItemInfo
          title={t('t_logout')}
          icon={Icons.settingLogout}
          onPress={this._onLogoutPress}/>
      </View>
    );
  }

}

const SettingsUserAccount = poolConnect(_SettingsUserAccount,
  // mapStateToProps
  (state) => ({}),

  // mapDispatchToProps
  (dispatch) => ({}),

  // Array of pools to subscribe to
  [FORM_API_ID_EDIT_USER_PROFILE]
);
export default SettingsUserAccount;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
  root: {
    paddingBottom: 8
  },
  profileFields: {
    marginTop: 8
  }
});
