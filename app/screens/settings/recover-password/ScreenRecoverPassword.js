import React from 'react';
import {LoadingButton, Screen, ScreenInfo} from "../../../comp/Misc";
import {StyleSheet, View} from 'react-native';
import type {TNavigator} from "../../../lib/types/Types";
import {RkTextInputFromPool} from "../../../comp/misc/forms/RkInputs";
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";
import {poolConnect} from "../../../redux/ReduxPool";
import {FORM_API_ID_RECOVER_PASSWORD} from "../../../lib/redux-pool/api-form/def/ApiFormDefRecoverPassword";

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator
};

// PasswordRecovery *************************************************************************************
// PasswordRecovery *************************************************************************************

class _RecoverPassword extends React.Component<void, Props, void> {

	constructor(props) {
		super(props);
		this._onSendPress = this._onSendPress.bind(this);
		this._getFormApiRecoverPassword = this._getFormApiRecoverPassword.bind(this);
	}

	_getFormApiRecoverPassword(): TApiFormPool {
		return this.props[FORM_API_ID_RECOVER_PASSWORD];
	}

	_onSendPress() {
		this._getFormApiRecoverPassword().post();
		// todo
		// .then(this._handleSignInSuccess)
		// .catch(this._handleSignInError);
	}

	render() {
		return (
			<Screen>

				<ScreenInfo
					style={styles.logo}
					imageSource={require('../../../assets/images/meLogo.png')}
					textText='Enter your email below to receive your password reset instructions'/>

				<View style={styles.catchmeRecoveryForm}>
					<RkTextInputFromPool
						rkType='row'
						pool={this._getFormApiRecoverPassword()}
						field='email'
						placeholder='Email'
						secureTextEntry/>

					<LoadingButton
						style={styles.catchmeRecoveryButton}
						loading={this._getFormApiRecoverPassword().loading}
						onPress={this._getFormApiRecoverPassword().post}
						rkType='large stretch accentColor'
						text={'Send'.toUpperCase()}/>
				</View>

			</Screen>
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
	logo: {
		marginTop: 24
	},
	catchmeRecoveryForm: {
		alignItems: 'center',
		marginTop: 36,
		marginHorizontal: 16,
	},
	catchmeRecoveryButton: {
		marginTop: 24,
	}
});
