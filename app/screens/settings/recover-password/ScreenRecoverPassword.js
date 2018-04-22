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
		this.state = {passwordRecovered: false};
	}

	_getFormApiRecoverPassword(): TApiFormPool {
		return this.props[FORM_API_ID_RECOVER_PASSWORD];
	}

	_onSendPress() {
		this._getFormApiRecoverPassword().post()
			.then(success => {
				this.setState({passwordRecovered: true});
			});
	}

	render() {
		return (
			<Screen>
				{this._renderScreenInfo()}
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
						onPress={this._onSendPress}
						rkType='large stretch accentColor'
						text={'Send'.toUpperCase()}/>
				</View>

			</Screen>
		);
	}

	_renderScreenInfo() {
		const {passwordRecovered} = this.state;

		const props = {};
		if (passwordRecovered) {
			props.imageSource = require('../../../assets/images/search.png');
			props.textText = 'Your password has been sen\'t to your email address';

		} else {
			props.imageSource = require('../../../assets/images/meLogo.png');
			props.textText = 'Enter your email below to receive your password reset instructions';
		}

		return (
			<ScreenInfo
				{...props}
				style={styles.logo}/>
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
		marginTop: 72,
		marginHorizontal: 16,
	},
	catchmeRecoveryButton: {
		marginTop: 48,
	}
});
