import React from 'react';
import Router from '../../../lib/navigation/Router';
import {FORM_API_ID_RECOVER_PASSWORD} from '../../../lib/redux-pool/api-form/def/ApiFormDefRecoverPassword';
import {FormFooterLink} from '../../../comp/misc/forms/FormComponents';
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from '../../../comp/Misc';
import {fullpageForm} from '../../../lib/theme/Styles';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {StyleSheet, View} from 'react-native';
import {t} from '../../../lib/i18n/Translations';
import type {TApiFormPool} from '../../../lib/redux-pool/api-form/ApiFormPool';
import type {TNavigator} from '../../../lib/types/Types';
import {Snackbar} from "../../../lib/Snackbar";

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator
};

type State = {
	passwordRecovered: boolean;
};

// PasswordRecovery *************************************************************************************
// PasswordRecovery *************************************************************************************

class _RecoverPassword extends React.Component<void, Props, State> {

	constructor(props) {
		super(props);
		this._onSendPress = this._onSendPress.bind(this);
		this._getFormApiRecoverPassword = this._getFormApiRecoverPassword.bind(this);
		this._onGoToLoginPress = this._onGoToLoginPress.bind(this);
		this.state = {passwordRecovered: false};
	}

	_getFormApiRecoverPassword(): TApiFormPool {
		return this.props[FORM_API_ID_RECOVER_PASSWORD];
	}

	_onSendPress() {
		this._getFormApiRecoverPassword().post()
			.then(success => {this.setState({passwordRecovered: true});})
			.catch(Snackbar.showApiException);
	}

	_onGoToLoginPress() {
		const {navigator} = this.props;
		Router.dismissModal(navigator);
	}

	render() {
		return (
			<Screen>
				<FullpageForm

					headerStyle={fullpageForm.headerStyle}
					headerJsx={this._renderScreenInfo()}

					fieldsStyle={[fullpageForm.fieldsStyle, styles.fieldsStyle]}
					fieldsJsx={(
						<View>
							<RkTextInputFromPool
								pool={this._getFormApiRecoverPassword()}
								field='email'
								keyboardType='email-address'
								placeholder={t('t_field_email')}
								secureTextEntry
								withBorder/>

							<LoadingButton
								style={fullpageForm.fieldsButton}
								loading={this._getFormApiRecoverPassword().loading}
								onPress={this._onSendPress}
								rkType='large stretch accentColor'
								text={t('t_bt_send')}
								withBorder/>
						</View>
					)}

					footerStyle={[fullpageForm.footerStyle, styles.footerStyle]}
					footerJsx={(
						<View>
							<FormFooterLink
								text={t('t_register_login')}
								clickableText={t('t_clk_register_login')}
								onPress={this._onGoToLoginPress}/>
						</View>
					)}

				/>
			</Screen>
		);
	}

	_renderScreenInfo() {
		const {passwordRecovered} = this.state;

		const props = {};
		if (passwordRecovered) {
			props.imageSource = require('../../../assets/images/primary-success.png');
			props.textText = t('t_si_settings_recover_password_success');

		} else {
			props.imageSource = require('../../../assets/images/primary-me.png');
			props.textText = t('t_si_settings_recover_password');
		}

		return (
			<ScreenInfo {...props}/>
		);
	}

}

const ScreenRecoverPassword = poolConnect(_RecoverPassword,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_RECOVER_PASSWORD]
);
export default ScreenRecoverPassword;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	fieldsStyle: {
		flex: 0.72,
	},
	footerStyle: {
		flex: 0.06,
	},
});
