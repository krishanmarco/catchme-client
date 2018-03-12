/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {poolConnect, FORM_API_ID_CHANGE_PASSWORD} from '../../../redux/ReduxPool';

import {scaleVertical} from '../../../lib/utils/scale';

import {View} from 'react-native';

import {RkStyleSheet} from 'react-native-ui-kitten';

import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';

import {GradientButton, Screen, ScreenInfo} from "../../../comp/Misc";



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenSettingsChangePasswordPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._getFormChangePassword = this._getFormChangePassword.bind(this);
    this._getFormChangePassword = this._getFormChangePassword.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  _getFormChangePassword() {
    return this.props[FORM_API_ID_CHANGE_PASSWORD];
  }

  _onConfirm() {
    this._getFormChangePassword().post()
        .then(success => {
          // todo: back to previous screen
        })
        .catch (error => {
          // Set error to the redux pool
        });
  }


  render() {
    return (
        <Screen>
        <View>
          <ScreenInfo
              imageContainerStyle={{marginTop: 64}}
              imageContainerScale={550}
              imageHeight={100}
              imageWidth={150}
              imageSource={require('../../../assets/images/splashBack.png')}
              textText='Change password...'/>
          <View>
            <RkTextInputFromPool
                pool={this._getFormChangePassword()}
                field='passwordPrevious'
                placeholder='Password'
                secureTextEntry/>

            <RkTextInputFromPool
                pool={this._getFormChangePassword()}
                field='passwordNext'
                placeholder='New password'
                secureTextEntry/>

            <RkTextInputFromPool
                pool={this._getFormChangePassword()}
                field='passwordConfirmNext'
                placeholder='Confirm password'
                secureTextEntry/>
          </View>

          <GradientButton
              style={styles.confirm}
              rkType='large stretch accentColor'
              text={'Change'.toUpperCase()}
              onPress={this._onConfirm}/>
        </View>
        </Screen>
    );
  }

}




// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSettingsChangePassword = poolConnect(
    // Presentational Component
    ScreenSettingsChangePasswordPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_CHANGE_PASSWORD]
);
export default ScreenSettingsChangePassword;


ScreenSettingsChangePassword.propTypes = {
  navigator: PropTypes.object.isRequired,
};




// Style ************************************************************************************************
// Style ************************************************************************************************

let styles = RkStyleSheet.create(theme => ({
  confirm: {
    marginVertical: 9,
  }
}));