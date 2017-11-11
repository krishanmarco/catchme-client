/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import Router from "../../lib/helpers/Router";
import {Const} from "../../Config";

import {poolConnect, FORM_API_ID_REGISTER} from '../../redux/ReduxPool';

import {View, Image, Keyboard} from 'react-native';

import {RkButton, RkText, RkTextInput, RkStyleSheet, RkTheme, RkAvoidKeyboard} from 'react-native-ui-kitten';

import {scaleVertical} from '../../lib/utils/scale';

import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';

import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import DaoUser from "../../lib/daos/DaoUser";
import {startApplication} from "../../App";


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenRegisterPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._getFormApiRegister = this._getFormApiRegister.bind(this);
    this._onRegisterPress = this._onRegisterPress.bind(this);
    this._onGoToLoginPress = this._onGoToLoginPress.bind(this);
  }

  _getFormApiRegister() {
    return this.props[FORM_API_ID_REGISTER];
  }

  _onRegisterPress() {
    this._getFormApiRegister().post()
        .then(userProfile => {

          if (DaoUser.gApiKey(userProfile) == null) {
            // The login failed
            return;
          }

          // Login was successful, start app
          startApplication();
        });
  }

  _onGoToLoginPress() {
    Router.toLogin(this.props.navigator);
  }




  render() {
    return (
        <RkAvoidKeyboard
            style={Styles.screen}
            onStartShouldSetResponder={ (e) => true}
            onResponderRelease={ (e) => Keyboard.dismiss()}>

          <View style={{alignItems: 'center'}}>
            <Image style={Styles.image} source={require('../../assets/images/logo.png')}/>
            <RkText rkType='h1'>Registration</RkText>
          </View>

          <View style={Styles.listItemContent}>
            <View>

              <RkTextInputFromPool
                  pool={this._getFormApiRegister()}
                  field='name'
                  placeholder='Name' />

              <RkTextInputFromPool
                  pool={this._getFormApiRegister()}
                  field='email'
                  keyboardType='email-address'
                  placeholder='Email' />

              <RkTextInputFromPool
                  pool={this._getFormApiRegister()}
                  field='password'
                  placeholder='Password'
                  secureTextEntry/>

              <RkTextInputFromPool
                  pool={this._getFormApiRegister()}
                  field='passwordConfirm'
                  placeholder='Confirm Password'
                  secureTextEntry/>

              <RkButton
                  style={Styles.save}
                  rkType='large stretch accentColor'
                  onPress={this._onRegisterPress}>
                {'Sign up'.toUpperCase()}
              </RkButton>

            </View>

            <View style={Styles.footer}>
              <FormFooterLink
                  text='Already have an account?'
                  clickableText='Sign in!'
                  onPress={this._onGoToLoginPress} />
            </View>
          </View>

        </RkAvoidKeyboard>
    )
  }
}




// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenRegister = poolConnect(
    // Presentational Component
    ScreenRegisterPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_REGISTER]
);
export default ScreenRegister;


ScreenRegister.propTypes = {
  navigator: PropTypes.object.isRequired,
};




// Style ************************************************************************************************
// Style ************************************************************************************************

let Styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  listItemContent: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));