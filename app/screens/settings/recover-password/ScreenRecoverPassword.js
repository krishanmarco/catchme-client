import React from 'react';
import {FORM_API_ID_RECOVER_PASSWORD} from "../../../lib/redux-pool/api-form/def/ApiFormDefRecoverPassword";
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from "../../../comp/Misc";
import {fullpageForm} from "../../../lib/theme/Styles";
import {poolConnect} from "../../../redux/ReduxPool";
import {RkTextInputFromPool} from "../../../comp/misc/forms/RkInputs";
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";
import type {TNavigator} from "../../../lib/types/Types";

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
								placeholder='Email'
								secureTextEntry
								withBorder/>

							<LoadingButton
								style={fullpageForm.fieldsButton}
								loading={this._getFormApiRecoverPassword().loading}
								onPress={this._onSendPress}
								rkType='large stretch accentColor'
								text={'Send'.toUpperCase()}
								withBorder/>
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
			props.textText = 'Your password has been sen\'t to your email address';

		} else {
			props.imageSource = require('../../../assets/images/primary-me.png');
			props.textText = 'Enter your email below to receive your password reset instructions';
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
});
