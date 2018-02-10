/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import RealmIO from '../../../lib/data/RealmIO';

import {startApplication} from "../../../App";

import {View} from 'react-native';
import {RkText, RkButton, RkStyleSheet} from 'react-native-ui-kitten';
import {ScreenInfo, GradientButton} from "../../../comp/Misc";




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
          <ScreenInfo
              imageContainerStyle={{marginTop: 64}}
              imageContainerScale={550}
              imageHeight={100}
              imageWidth={150}
              imageSource={require('../../../assets/images/splashBack.png')}
              textText='Are you sure you want to log out?'/>
          
          <GradientButton
              style={styles.logout}
              rkType='large stretch accentColor'
              text={'Logout'.toUpperCase()}
              onPress={this._onLogoutPress}/>
        </View>
    );
  }
  
}





// Style ************************************************************************************************
// Style ************************************************************************************************

let styles = RkStyleSheet.create(theme => ({
  logout: {
    marginTop: 64,
    alignItems: 'center'
  }
}));