/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import ApiClient from '../../../lib/data/ApiClient';
import {boolToString, stringToBool} from '../../../lib/HelperFunctions';

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
    this.state = this._getStateValuesFromUserProfile(props.userProfile);
  }


  _getStateValuesFromUserProfile(userProfile) {
    return {
      friendshipRequestOn: stringToBool(DaoUser.gSettingNotifications(userProfile)[0]),
      friendActionsOn:  stringToBool(DaoUser.gSettingNotifications(userProfile)[1]),
      catchmeSuggestionsOn:  stringToBool(DaoUser.gSettingNotifications(userProfile)[2])
    };
  }

  _getUserProfileValueFromState() {
    return [
      boolToString(this.state.friendshipRequestOn),
      boolToString(this.state.friendActionsOn),
      boolToString(this.state.catchmeSuggestionsOn)
    ].join('');
  }

  setStateAndPost(newState) {
    // Update the state
    this.setState(newState);

    // Send the update to the API
    ApiClient.userProfileEdit({
      [DaoUser.pSettingNotifications]: this._getUserProfileValueFromState()
    }).then(userProfile => this.setState(this._getStateValuesFromUserProfile(userProfile)));
  }

  _onDisableAllValueChange(value) {
    this.setStateAndPost({
      friendshipRequestOn: !value,
      friendActionsOn: !value,
      catchmeSuggestionsOn: !value
    });
  }

  _onFriendshipRequestValueChange(value) {
    this.setStateAndPost({friendshipRequestOn: value});
  }

  _onFriendActionsValueChange(value) {
    this.setStateAndPost({friendActionsOn: value});
  }

  _onCatchmeSuggestionsValueChange(value) {
    this.setStateAndPost({catchmeSuggestionsOn: value});
  }

  _disableAllOn() {
    return [
      this.state.friendActionsOn,
      this.state.friendshipRequestOn,
      this.state.catchmeSuggestionsOn
    ].every(i => !i);
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
    return (
        <View style={{marginTop: 64}}>
          <RkSwitch
              title='Disable all'
              value={this._disableAllOn()}
              onValueChange={this._onDisableAllValueChange}/>
          <RkSwitch
              title='Friendship request'
              value={this.state.friendshipRequestOn}
              onValueChange={this._onFriendshipRequestValueChange}/>
          <RkSwitch
              title='Friend actions'
              value={this.state.friendActionsOn}
              onValueChange={this._onFriendActionsValueChange}/>
          <RkSwitch
              title='Catchme suggestions'
              value={this.state.catchmeSuggestionsOn}
              onValueChange={this._onCatchmeSuggestionsValueChange}/>
        </View>
    );
  }

}
