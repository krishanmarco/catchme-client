/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {poolConnect, FORM_API_ID_EDIT_USER_PROFILE} from '../../../redux/ReduxPool';
import ApiClient from '../../../lib/data/ApiClient';
import {boolToString, stringReplace, stringToBool} from '../../../lib/HelperFunctions';

import {Icons} from '../../../Config';

import {View} from 'react-native';
import {RkText, RkStyleSheet} from 'react-native-ui-kitten';
import StaticSectionList from '../../../comp/misc/listviews/StaticSectionList';
import {ListItemInfo} from '../../../comp/misc/ListItemsInfos';
import {RkSwitch} from '../../../comp/misc/forms/RkInputs';
import ScreenInfo from "../../../comp/misc/ScreenInfo";
import DaoUser from "../../../lib/daos/DaoUser";




// FlowProps ********************************************************************************************
// FlowProps ********************************************************************************************

type Props = {
  navigator: Navigator,
  authenticatedUserProfile: Object,
};

type State = {
  // Nothing for now
};


// Component ********************************************************************************************
// Component ********************************************************************************************

class SettingsUserNotificationsPresentational extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onDisableAllValueChange = this._onDisableAllValueChange.bind(this);
    this._onFriendshipRequestValueChange = this._onFriendshipRequestValueChange.bind(this);
    this._onFriendActionsValueChange = this._onFriendActionsValueChange.bind(this);
    this._onCatchmeSuggestionsValueChange = this._onCatchmeSuggestionsValueChange.bind(this);
  }

  componentWillMount() {
    // We now have access to a user profile
    // Initialize the redux pool form by setting all its values
    this._formApiEditUserProfile().change(this._userProfile());
  }

  _formApiEditUserProfile() {
    return this.props[FORM_API_ID_EDIT_USER_PROFILE];
  }


  _userProfile() {
    return this.props.authenticatedUserProfile;
  }

  post(newSettings) {
    // Change the value in the form handler
    this._formApiEditUserProfile().change({
      [DaoUser.pSettingNotifications]: newSettings
    });

    // Post the updated form
    this._formApiEditUserProfile().post();
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
    const settingNotifications = DaoUser.gSettingNotifications(this._userProfile())
        .split('')
        .map(stringToBool);
    
    return (
        <View style={{marginTop: 64}}>
          <RkSwitch
              title='Disable all'
              value={[
                settingNotifications[0],
                settingNotifications[1],
                settingNotifications[2]
              ].every(i => !i)}
              onValueChange={this._onDisableAllValueChange}/>
          <RkSwitch
              title='Friendship request'
              value={settingNotifications[0]}
              onValueChange={this._onFriendshipRequestValueChange}/>
          <RkSwitch
              title='Friend actions'
              value={settingNotifications[1]}
              onValueChange={this._onFriendActionsValueChange}/>
          <RkSwitch
              title='Catchme suggestions'
              value={settingNotifications[2]}
              onValueChange={this._onCatchmeSuggestionsValueChange}/>
        </View>
    );
  }

}




// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const SettingsUserNotifications = poolConnect(
    // Presentational Component
    SettingsUserNotificationsPresentational,

    // mapStateToProps
    (state) => state.settingsUserAccountReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_EDIT_USER_PROFILE]
);

export default SettingsUserNotifications;



// Styles ***********************************************************************************************
// Styles ***********************************************************************************************

const Styles = RkStyleSheet.create(theme => ({
  content: {
    paddingHorizontal: 4,
  },
}));