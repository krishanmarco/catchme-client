/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import Router from "../../lib/helpers/Router";

import {poolConnect, FORM_API_ID_LOGIN} from '../../redux/ReduxPool';

import {scaleModerate, scaleVertical} from '../../lib/utils/scale';

import {View, Image, Dimensions, Keyboard} from 'react-native';

import {RkButton, RkText, RkAvoidKeyboard, RkStyleSheet} from 'react-native-ui-kitten';

import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';

import {FontAwesome} from '../../assets/Icons';
import {startApplication} from "../../App";
import DaoUser from "../../lib/daos/DaoUser";
import {Screen, GradientButton} from "../../comp/Misc";

import ApiClient from '../../lib/data/ApiClient';
import {SignInGoogle} from '../../lib/social/SignInGoogle';
import {SignInFacebook} from "../../lib/social/SignInFacebook";
import type {TUser} from "../../lib/daos/DaoUser";
import Logger from "../../lib/Logger";


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenLoginPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._handleSignInError = this._handleSignInError.bind(this);
    this._handleSignInSuccess = this._handleSignInSuccess.bind(this);
    this._getFormApiLogin = this._getFormApiLogin.bind(this);
    this._onLoginPress = this._onLoginPress.bind(this);
    this._onFacebookLogin = this._onFacebookLogin.bind(this);
    this._onGoogleLogin = this._onGoogleLogin.bind(this);
    this._renderSocialIcon = this._renderSocialIcon.bind(this);
    this._onGoToSignupPress = this._onGoToSignupPress.bind(this);
    this._onGoToRecoverPasswordPress = this._onGoToRecoverPasswordPress.bind(this);
  }

  _handleSignInError(error = null) {
    Logger.e("_handleSignInError!: ", error);
    // todo
  }

  _handleSignInSuccess(userProfile: TUser) {
    if (DaoUser.gApiKey(userProfile) == null) {
      this._handleSignInError();
      return;
    }

    // todo: before release pass userProfile into startApplication()
    // Login was successful, start app
    startApplication();
  }

  _getFormApiLogin() {
    return this.props[FORM_API_ID_LOGIN];
  }

  _onLoginPress() {
    this._getFormApiLogin().post().
        then(this._handleSignInSuccess);
  }

  _onFacebookLogin() {
    SignInFacebook.signInAndGetAccessToken().
        then(accessToken => ApiClient.accountsLoginFacebook(accessToken)).
        then(this._handleSignInSuccess).
        catch(this._handleSignInError);
  }

  _onGoogleLogin() {
    SignInGoogle.signInAndGetAccessToken().
        then(accessToken => ApiClient.accountsLoginGoogle(accessToken)).
        then(this._handleSignInSuccess).
        catch(this._handleSignInError);
  }

  _onGoToSignupPress() {
    Router.toRegister(this.props.navigator);
  }

  _onGoToRecoverPasswordPress() {
    Router.toRecoverPassword(this.props.navigator);
  }


  render() {

    return (
        <Screen>
          <RkAvoidKeyboard
              onStartShouldSetResponder={(e) => true}
              onResponderRelease={e => Keyboard.dismiss()}
              style={Styles.screen}>

            {this._renderImage()}

            <View style={Styles.listItemHeaderContent}>
              <View style={Styles.buttons}>
                {[
                  {icon: FontAwesome.google, onPress: this._onGoogleLogin},
                  {icon: FontAwesome.facebook, onPress: this._onFacebookLogin},
                ].map(this._renderSocialIcon)}
              </View>

              <RkTextInputFromPool
                  pool={this._getFormApiLogin()}
                  field='email'
                  placeholder='Email'/>

              <RkTextInputFromPool
                  pool={this._getFormApiLogin()}
                  field='email'
                  placeholder='Password'
                  secureTextEntry/>

              <GradientButton
                  style={Styles.save}
                  rkType='large stretch accentColor'
                  text={'Login'.toUpperCase()}
                  onPress={this._onLoginPress}/>


              <View style={Styles.footer}>
                <FormFooterLink
                    text='Don’t have an account?'
                    clickableText='Sign up now!'
                    onPress={this._onGoToSignupPress}/>
                <FormFooterLink
                    text='Forgot your password?'
                    clickableText='Recover it!'
                    onPress={this._onGoToRecoverPasswordPress}/>
              </View>
            </View>
          </RkAvoidKeyboard>
        </Screen>
    );
  }


  _renderSocialIcon({icon, onPress}, key) {
    return (
        <RkButton key={key} style={Styles.button} rkType='social' onPress={onPress}>
          <RkText rkType='awesome hero accentColor'>{icon}</RkText>
        </RkButton>
    );
  }


  _renderImage() {
    let contentHeight = scaleModerate(400, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;
    return (
        <View style={{height, width, alignItems: 'center', justifyContent: 'center'}}>
          <Image
              style={[Styles.image, {height: 100, width: 150}]}
              source={require('../../assets/images/splashBack.png')}/>
        </View>
    );
  }


}


// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenLogin = poolConnect(
    // Presentational Component
    ScreenLoginPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_LOGIN]
);
export default ScreenLogin;


ScreenLogin.propTypes = {
  navigator: PropTypes.object.isRequired,
};


// Style ************************************************************************************************
// Style ************************************************************************************************

let Styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(16),
  },
  listItemHeaderContent: {
    paddingHorizontal: 16,
    paddingBottom: scaleVertical(32),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(16)
  },
  button: {
    marginHorizontal: 24
  },
  save: {
    marginVertical: 9,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4
  }
}));