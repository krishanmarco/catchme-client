/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import RealmIO from '../../../lib/data/RealmIO';

import {startApplication} from "../../../App";

import {View} from 'react-native';
import {RkText, RkButton, RkStyleSheet} from 'react-native-ui-kitten';
import {ScreenInfo} from "../../../comp/Misc";




// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  authenticatedUserProfile: Object,
  navigator: Navigator
};


// Component ********************************************************************************************
// Component ********************************************************************************************

export default class SettingsUserNotifications extends React.Component<any, Props, any> {

  constructor(props, context) {
    super(props, context);
    this._onLogoutPress = this._onLogoutPress.bind(this);
  }

  _userProfile() {
    return this.props.authenticatedUserProfile;
  }

  _onLogoutPress() {
    RealmIO.removeLocalUser();
    startApplication();
  }

  render() {
    return (
        <View>
          {this._renderScreenHeader()}
          {this._renderLogoutButton()}
        </View>
    );
  }

  _renderScreenHeader() {
    return (
        <ScreenInfo
            imageContainerStyle={{marginTop: 64}}
            imageContainerScale={550}
            imageHeight={100}
            imageWidth={150}
            imageSource={require('../../../assets/images/splashBack.png')}
            textText='Are you sure you want to log out?'/>
    );
  }

  _renderLogoutButton() {
    return (
        <View style={Styles.buttonCont}>
          <RkButton style={Styles.button} onPress={this._onLogoutPress}>
            <RkText rkType='awesome hero accentColor'>Logout</RkText>
          </RkButton>
        </View>
    );
  }

}





// Style ************************************************************************************************
// Style ************************************************************************************************

let Styles = RkStyleSheet.create(theme => ({
  buttonCont: {
    marginTop: 64,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center'
  }
}));