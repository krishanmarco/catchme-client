/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Logger from "../../../lib/Logger";
import React from 'react';
import {FORM_API_ID_CHANGE_PASSWORD} from "../../../lib/redux-pool/api-form/def/ApiFormDefChangePassword";
import {LoadingButton, Screen, ScreenInfo} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";
import type {TNavigator} from "../../../lib/types/Types";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};


// _ScreenSettingsChangePassword ************************************************************************
// _ScreenSettingsChangePassword ************************************************************************

class _ScreenSettingsChangePassword extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._getFormChangePassword = this._getFormChangePassword.bind(this);
		this._onConfirm = this._onConfirm.bind(this);
	}

	_getFormChangePassword(): TApiFormPool {
		return this.props[FORM_API_ID_CHANGE_PASSWORD];
	}

	_onConfirm() {
		const {navigator} = this.props;

		this._getFormChangePassword().post()
			.then(success => {
				navigator.pop();
			})
			.catch(error => {
				Logger.v('ScreenSettingsChangePassword _onConfirm', error);
			});
	}

	render() {
		return (
			<Screen>
				<ScreenInfo
					style={styles.screenInfo}
					imageSource={require('../../../assets/images/lock.png')}
					textText='Change password...'/>

				<View style={styles.changePasswordForm}>
					<RkTextInputFromPool
						pool={this._getFormChangePassword()}
						field='passwordPrevious'
						placeholder='Password'
						withBorder
						secureTextEntry/>

					<RkTextInputFromPool
						pool={this._getFormChangePassword()}
						field='passwordNext'
						placeholder='New password'
						withBorder
						secureTextEntry/>

					<RkTextInputFromPool
						pool={this._getFormChangePassword()}
						field='passwordConfirmNext'
						placeholder='Confirm password'
						withBorder
						secureTextEntry/>

					<LoadingButton
						style={styles.changeButton}
						rkType='large stretch accentColor'
						loading={this._getFormChangePassword().loading}
						text={'Change'.toUpperCase()}
						onPress={this._onConfirm}/>
				</View>
			</Screen>
		);
	}

}

const ScreenSettingsChangePassword = poolConnect(_ScreenSettingsChangePassword,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_CHANGE_PASSWORD]
);
export default ScreenSettingsChangePassword;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	screenInfo: {
		marginTop: 16
	},
	changePasswordForm: {
		alignItems: 'center',
		marginTop: 36,
		marginHorizontal: 16,
	},
	changeButton: {
		marginTop: 24,
	},
});