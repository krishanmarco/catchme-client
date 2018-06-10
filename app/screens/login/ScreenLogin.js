/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import React from 'react';
import Router from '../../lib/navigation/Router';
import {FORM_API_ID_LOGIN} from '../../lib/redux-pool/api-form/def/ApiFormDefLogin';
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from '../../comp/Misc';
import {fullpageForm} from '../../lib/theme/Styles';
import {Icon} from 'react-native-elements';
import {Icons} from '../../Config';
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {SignInFacebook} from '../../lib/social/SignInFacebook';
import {SignInGoogle} from '../../lib/social/SignInGoogle';
import {Snackbar} from '../../lib/Snackbar';
import {startApplication} from '../../App';
import {StyleSheet, View} from 'react-native';
import {t} from '../../lib/i18n/Translations';
import type {TApiFormDefLogin} from '../../lib/redux-pool/api-form/def/ApiFormDefLogin';
import type {TNavigator} from '../../lib/types/Types';

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
		this._getFormApiLogin = this._getFormApiLogin.bind(this);
		this._onLoginPress = this._onLoginPress.bind(this);
		this._onFacebookLogin = this._onFacebookLogin.bind(this);
		this._onGoogleLogin = this._onGoogleLogin.bind(this);
		this._renderSocialIcon = this._renderSocialIcon.bind(this);
		this._onGoToSignupPress = this._onGoToSignupPress.bind(this);
		this._onGoToRecoverPasswordPress = this._onGoToRecoverPasswordPress.bind(this);
	}

	_getFormApiLogin(): TApiFormDefLogin {
		return this.props[FORM_API_ID_LOGIN];
	}

	_onLoginPress() {
		this._getFormApiLogin().post()
			.then(startApplication)
			.catch(Snackbar.showApiException);
	}

	_onFacebookLogin() {
		SignInFacebook.signInAndGetAccessToken()
			.then(ApiClient.accountsLoginFacebook)
			.then(startApplication)
			.catch(Snackbar.showApiException);
	}

	_onGoogleLogin() {
		SignInGoogle.signInAndGetAccessToken()
			.then(ApiClient.accountsLoginGoogle)
			.then(startApplication)
			.catch(Snackbar.showApiException);
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
		// Do not require to be online to display this screen
		// The screen will be completely empty.
		// This means we have to handle the failed ApiRequest in case of offline
		return (
			<Screen requireOnline={false}>
				<FullpageForm

					headerStyle={fullpageForm.headerStyle}
					headerJsx={(
						<ScreenInfo
							height={120}
							imageHeight='100%'
							imageSource={require('../../assets/images/primary-me.png')}/>
					)}

					fieldsStyle={fullpageForm.fieldsStyle}
					fieldsJsx={(
						<View style={styles.fieldsRow}>

							<View style={styles.fieldsSocialButtons}>
								{[
									{icon: Icons.loginGoogle, onPress: this._onGoogleLogin},
									{icon: Icons.loginFacebook, onPress: this._onFacebookLogin},
								].map(this._renderSocialIcon)}
							</View>

							<View style={styles.fieldsFields}>
								<RkTextInputFromPool
									pool={this._getFormApiLogin()}
									field='email'
									keyboardType='email-address'
									placeholder={t('t_field_email')}
									withBorder/>

								<RkTextInputFromPool
									pool={this._getFormApiLogin()}
									field='password'
									placeholder={t('t_field_password')}
									withBorder
									secureTextEntry/>

								<LoadingButton
									style={fullpageForm.fieldsButton}
									rkType='large stretch accentColor'
									loading={this._getFormApiLogin().loading}
									text={t('t_bt_login')}
									onPress={this._onLoginPress}/>

							</View>
						</View>
					)}

					footerStyle={fullpageForm.footerStyle}
					footerJsx={(
						<View>
							<FormFooterLink
								text={t('t_login_no_account')}
								clickableText={t('t_clk_login_no_account')}
								onPress={this._onGoToSignupPress}/>
							<FormFooterLink
								text={t('t_login_forgot_pw')}
								clickableText={t('t_clk_login_forgot_pw')}
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
					<Icon {...icon} />
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
	}
});
