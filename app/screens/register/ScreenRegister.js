/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import React from 'react';
import Router from "../../lib/navigation/Router";
import {FORM_API_ID_REGISTER} from "../../lib/redux-pool/api-form/def/ApiFormDefRegister";
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import {LoadingButton, Screen, ScreenInfo} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {startApplication} from "../../App";
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../lib/redux-pool/api-form/ApiFormPool";
import type {TNavigator} from "../../lib/types/Types";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};


// _ScreenRegister **************************************************************************************
// _ScreenRegister **************************************************************************************

class _ScreenRegister extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._getFormApiRegister = this._getFormApiRegister.bind(this);
		this._onRegisterPress = this._onRegisterPress.bind(this);
		this._onGoToLoginPress = this._onGoToLoginPress.bind(this);
	}

	_getFormApiRegister(): TApiFormPool {
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
		const {navigator} = this.props;
		navigator.pop();
	}


	render() {
		return (
			<Screen>

				<ScreenInfo
					style={styles.logo}
					height={120}
					imageHeight='100%'
					imageSource={require('../../assets/images/meLogo.png')}/>

				<View style={styles.catchmeSignupForm}>
					<RkTextInputFromPool
						rkType='row'
						pool={this._getFormApiRegister()}
						field='name'
						placeholder='Name'
						withBorder/>

					<RkTextInputFromPool
						rkType='row'
						pool={this._getFormApiRegister()}
						field='email'
						keyboardType='email-address'
						placeholder='Email'
						withBorder/>

					<RkTextInputFromPool
						rkType='row'
						pool={this._getFormApiRegister()}
						field='password'
						placeholder='Password'
						secureTextEntry
						withBorder/>

					<RkTextInputFromPool
						rkType='row'
						pool={this._getFormApiRegister()}
						field='passwordConfirm'
						placeholder='Confirm Password'
						secureTextEntry
						withBorder/>

					<LoadingButton
						style={styles.catchmeSignupButton}
						loading={this._getFormApiRegister().loading}
						rkType='large stretch accentColor'
						text={'Sign up'.toUpperCase()}
						onPress={this._onRegisterPress}/>
				</View>

				<View style={styles.helpFooter}>
					<FormFooterLink
						text='Already have an account?'
						clickableText='Sign in!'
						onPress={this._onGoToLoginPress}/>
				</View>

			</Screen>
		);
	}
}

const ScreenRegister = poolConnect(_ScreenRegister,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_REGISTER]
);
export default ScreenRegister;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	logo: {
		marginTop: 24
	},
	catchmeSignupForm: {
		alignItems: 'center',
		marginHorizontal: 16,
	},
	catchmeSignupButton: {
		marginTop: 24,
	},
	helpFooter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 24
	},
});
