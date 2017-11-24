/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import ApiClient from '../../../lib/data/ApiClient';
import {boolToString, stringReplace, stringToBool} from '../../../lib/HelperFunctions';

import {Icons} from '../../../Config';

import {View} from 'react-native';
import {RkText} from 'react-native-ui-kitten';
import StaticSectionList from '../../../comp/misc/listviews/StaticSectionList';
import {ListItemInfo} from '../../../comp/misc/ListItemsInfos';
import {RkSwitch} from '../../../comp/misc/forms/RkInputs';
import ScreenInfo from "../../../comp/misc/ScreenInfo";
import DaoUser from "../../../lib/daos/DaoUser";




// FlowProps ********************************************************************************************
// FlowProps ********************************************************************************************

type Props = {
  navigator: Navigator
};

type State = {
  friendshipRequestOn: true,
  friendActionsOn: true,
  catchmeSuggestionsOn: true
};


// Component ********************************************************************************************
// Component ********************************************************************************************

export default class SettingsUserNotifications extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onDisableAllValueChange = this._onDisableAllValueChange.bind(this);
    this._onFriendshipRequestValueChange = this._onFriendshipRequestValueChange.bind(this);
    this._onFriendActionsValueChange = this._onFriendActionsValueChange.bind(this);
    this._onCatchmeSuggestionsValueChange = this._onCatchmeSuggestionsValueChange.bind(this);
  }

  _userProfile() {
    return this.props.authenticatedUserProfile;
  }

  post(newSettings) {
    this.props.onSettingNotificationsChanged(newSettings);
  }


  _changeSettingValue(settingStr, index, newBoolVal) {
    return stringReplace(settingStr, index, boolToString(newBoolVal));
  }

  _onDisableAllValueChange(value) {
    let settingStr = DaoUser.gSettingNotifications(this._userProfile());
    settingStr = this._changeSettingValue(settingStr, 0, !value);
    settingStr = this._changeSettingValue(settingStr, 1, !value);
    settingStr = this._changeSettingValue(settingStr, 2, !value);
    this.post(settingStr);
  }

  _onFriendshipRequestValueChange(value) {
    this.post(this._changeSettingValue(DaoUser.gSettingNotifications(this._userProfile()), 0, value));
  }

  _onFriendActionsValueChange(value) {
    this.post(this._changeSettingValue(DaoUser.gSettingNotifications(this._userProfile()), 1, value));
  }

  _onCatchmeSuggestionsValueChange(value) {
    this.post(this._changeSettingValue(DaoUser.gSettingNotifications(this._userProfile()), 2, value));
  }

  render() {
    return (
        <View>
          {this._renderScreenHeader()}
          {this._renderNotificationSwitches()}
        </View>
    );
  }

  _renderScreenHeader() {
    return (
        <ScreenInfo
            imageContainerStyle={{marginTop: 64}}
            scale={550}
            height={100}
            width={150}
            image={require('../../../assets/images/splashBack.png')}
            text='Here you can tweak your notification settings'/>
    );
  }

  _renderNotificationSwitches() {
    const settingNotifications = DaoUser.gSettingNotifications(this._userProfile());
    return (
        <View style={{marginTop: 64}}>
          <RkSwitch
              title='Disable all'
              value={[
                stringToBool(settingNotifications[0]),
                stringToBool(settingNotifications[1]),
                stringToBool(settingNotifications[2])
              ].every(i => !i)}
              onValueChange={this._onDisableAllValueChange}/>
          <RkSwitch
              title='Friendship request'
              value={stringToBool(settingNotifications[0])}
              onValueChange={this._onFriendshipRequestValueChange}/>
          <RkSwitch
              title='Friend actions'
              value={stringToBool(settingNotifications[1])}
              onValueChange={this._onFriendActionsValueChange}/>
          <RkSwitch
              title='Catchme suggestions'
              value={stringToBool(settingNotifications[2])}
              onValueChange={this._onCatchmeSuggestionsValueChange}/>
        </View>
    );
  }

}
