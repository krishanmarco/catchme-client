/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import ApiFormPool from "../../lib/redux-pool/api-form/ApiFormPool";
import DaoUser from "../../lib/daos/DaoUser";
import Logger from "../../lib/Logger";
import React from 'react';
import Router from "../../lib/navigation/Router";
import {FontIcons} from "../../Config";
import {FORM_API_ID_LOGIN} from "../../lib/redux-pool/api-form/def/ApiFormDefLogin";
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from "../../comp/Misc";
import {fullpageForm} from "../../lib/theme/Styles";
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {SignInFacebook} from "../../lib/social/SignInFacebook";
import {SignInGoogle} from '../../lib/social/SignInGoogle';
import {startApplication} from "../../App";
import {StyleSheet, View} from 'react-native';
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};


// _ScreenLogin *****************************************************************************************
// _ScreenLogin *****************************************************************************************

class _ScreenLogin extends React.Component<void, Props, void> {

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
		Logger.v("ScreenLogin _handleSignInError: ", error);
	}

	_handleSignInSuccess(userProfile: TUser) {
		if (DaoUser.gApiKey(userProfile) == null) {
			this._handleSignInError();
			return null;
		}

		// Login was successful, start app
		startApplication(userProfile);
		return userProfile;
	}

	_getFormApiLogin(): ApiFormPool {
		return this.props[FORM_API_ID_LOGIN];
	}

	_onLoginPress() {
		this._getFormApiLogin().post()
			.then(this._handleSignInSuccess)
			.catch(this._handleSignInError);
	}

	_onFacebookLogin() {
		SignInFacebook.signInAndGetAccessToken()
			.then(accessToken => ApiClient.accountsLoginFacebook(accessToken))
			.then(this._handleSignInSuccess)
			.catch(this._handleSignInError);
	}

	_onGoogleLogin() {
		SignInGoogle.signInAndGetAccessToken()
			.then(accessToken => ApiClient.accountsLoginGoogle(accessToken))
			.then(this._handleSignInSuccess)
			.catch(this._handleSignInError);
	}

	_onGoToSignupPress() {
		const {navigator} = this.props;
		Router.toModalRegister(navigator);
	}

	_onGoToRecoverPasswordPress() {
		const {navigator} = this.props;
		Router.toModalRecoverPassword(navigator);
	}


	render() {
		return (
			<Screen>
				<FullpageForm

					headerStyle={fullpageForm.headerStyle}
					headerJsx={(
						<ScreenInfo
							height={120}
							imageHeight='100%'
							imageSource={require('../../assets/images/meLogo.png')}/>
					)}

					fieldsStyle={fullpageForm.fieldsStyle}
					fieldsJsx={(
						<View style={styles.fieldsRow}>
							
							<View style={styles.fieldsSocialButtons}>
								{[
									{icon: FontIcons.google, onPress: this._onGoogleLogin},
									{icon: FontIcons.facebook, onPress: this._onFacebookLogin},
								].map(this._renderSocialIcon)}
							</View>
							
							<View style={styles.fieldsFields}>
								<RkTextInputFromPool
									pool={this._getFormApiLogin()}
									field='email'
									keyboardType='email-address'
									placeholder='Email'
									withBorder/>

								<RkTextInputFromPool
									pool={this._getFormApiLogin()}
									field='password'
									placeholder='Password'
									withBorder
									secureTextEntry/>

								<LoadingButton
									style={fullpageForm.fieldsButton}
									rkType='large stretch accentColor'
									loading={this._getFormApiLogin().loading}
									text={'Login'.toUpperCase()}
									onPress={this._onLoginPress}/>

							</View>
						</View>
					)}

					footerStyle={fullpageForm.footerStyle}
					footerJsx={(
						<View>
							<FormFooterLink
								text='Don’t have an account?'
								clickableText='Sign up now!'
								onPress={this._onGoToSignupPress}/>
							<FormFooterLink
								text='Forgot your password?'
								clickableText='Recover it!'
								onPress={this._onGoToRecoverPasswordPress}/>
						</View>
					)}

				/>
			</Screen>
		);
	}


	_renderSocialIcon({icon, onPress}, key) {
		return (
			<View key={key} style={styles.fieldsSocialButtonsButton}>
				<RkButton rkType='social' onPress={onPress}>
					<RkText rkType='awesome hero accentColor'>{icon}</RkText>
				</RkButton>
			</View>
		);
	}


}

const ScreenLogin = poolConnect(_ScreenLogin,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_LOGIN]
);
export default ScreenLogin;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	fieldsRow: {
		flex: 1,
		marginTop: 4
	},
	fieldsSocialButtons: {
		flex: 0.28,
		flexDirection: 'row',
		marginHorizontal: 16,
	},
	fieldsSocialButtonsButton: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fieldsFields: {
		flex: 0.72,
		marginTop: 16
	},
});
