/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import React from 'react';
import Router from "../../lib/navigation/Router";
import {FORM_API_ID_REGISTER} from "../../lib/redux-pool/api-form/def/ApiFormDefRegister";
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import {Image, View} from 'react-native';
import {poolConnect} from '../../redux/ReduxPool';
import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {scaleVertical} from '../../lib/utils/scale';
import {Screen} from "../../comp/Misc";
import {startApplication} from "../../App";
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
		Router.toScreenLogin(navigator);
	}


	render() {
		return (
			<Screen>

					<View style={styles.header}>
						<Image style={styles.image} source={require('../../assets/images/logo.png')}/>
						<RkText rkType='h1'>Registration</RkText>
					</View>

					<View style={styles.listItemContent}>
						<View>

							<RkTextInputFromPool
								pool={this._getFormApiRegister()}
								field='name'
								placeholder='Name'/>

							<RkTextInputFromPool
								pool={this._getFormApiRegister()}
								field='email'
								keyboardType='email-address'
								placeholder='Email'/>

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
								style={styles.save}
								rkType='large stretch accentColor'
								onPress={this._onRegisterPress}>
								{'Sign up'.toUpperCase()}
							</RkButton>

						</View>

						<View style={styles.footer}>
							<FormFooterLink
								text='Already have an account?'
								clickableText='Sign in!'
								onPress={this._onGoToLoginPress}/>
						</View>
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

const styles = RkStyleSheet.create(theme => ({
	screen: {
		flex: 1,
		padding: 16,
		justifyContent: 'space-around',
		backgroundColor: theme.colors.screen.base
	},
	header: {
		alignItems: 'center'
	},
	image: {
		marginBottom: 10,
		height: scaleVertical(77),
		resizeMode: 'contain'
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
	footer: {
		justifyContent: 'flex-end'
	},
	textRow: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
}));
