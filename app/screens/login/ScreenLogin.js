/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoUser from "../../lib/daos/DaoUser";
import Logger from "../../lib/Logger";
import React from 'react';
import Router from "../../lib/helpers/Router";
import {StyleSheet, Dimensions, Image, View} from 'react-native';
import {FontAwesome} from '../../assets/Icons';
import {FORM_API_ID_LOGIN} from "../../lib/redux-pool/api-form/def/ApiFormDefLogin";
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import {GradientButton, Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {scaleModerate, scaleVertical} from '../../lib/utils/scale';
import {SignInFacebook} from "../../lib/social/SignInFacebook";
import {SignInGoogle} from '../../lib/social/SignInGoogle';
import {startApplication} from "../../App";
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

	_getFormApiLogin() {
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
		Router.toRegister(this.props.navigator);
	}

	_onGoToRecoverPasswordPress() {
		Router.toRecoverPassword(this.props.navigator);
	}


	render() {
		return (
			<Screen style={styles.screen}>
				{this._renderImage()}

				<View style={styles.listItemHeaderContent}>
					<View style={styles.buttons}>
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
						style={styles.save}
						loading={this._getFormApiLogin().loading}
						rkType='large stretch accentColor'
						text={'Login'.toUpperCase()}
						onPress={this._onLoginPress}/>


					<View style={styles.footer}>
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
			</Screen>
		);
	}


	_renderSocialIcon({icon, onPress}, key) {
		return (
			<RkButton key={key} style={styles.button} rkType='social' onPress={onPress}>
				<RkText rkType='awesome hero accentColor'>{icon}</RkText>
			</RkButton>
		);
	}


	_renderImage() {
		let contentHeight = scaleModerate(400, 1);
		let height = Dimensions.get('window').height - contentHeight;
		let width = Dimensions.get('window').width;
		return (
			<View style={[{height, width}, styles.imageCont]}>
				<Image
					style={styles.image}
					source={require('../../assets/images/splashBack.png')}/>
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
	screen: {
		alignItems: 'center',
	},
	image: {
		resizeMode: 'cover',
		marginBottom: scaleVertical(16),
		height: 100,
		width: 150
	},
	listItemHeaderContent: {
		paddingHorizontal: 16,
		paddingBottom: scaleVertical(32),
		alignItems: 'center',
		flex: -1
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: '#000'
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
	},
	imageCont: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
