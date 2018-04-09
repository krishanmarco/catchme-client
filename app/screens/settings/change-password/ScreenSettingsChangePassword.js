/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {poolConnect} from '../../../redux/ReduxPool';

import {GradientButton, Screen, ScreenInfo} from "../../../comp/Misc";

import {RkStyleSheet} from 'react-native-ui-kitten';

import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';

import {scaleVertical} from '../../../lib/utils/scale';

import {View} from 'react-native';
import type {TNavigator} from "../../../lib/types/Types";
import {FORM_API_ID_CHANGE_PASSWORD} from "../../../lib/redux-pool/api-form/def/ApiFormDefChangePassword";
import Logger from "../../../lib/Logger";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};


// ReduxComponent ***************************************************************************************
// ReduxComponent ***************************************************************************************

class _ScreenSettingsChangePassword extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._getFormChangePassword = this._getFormChangePassword.bind(this);
		this._onConfirm = this._onConfirm.bind(this);
	}

	_getFormChangePassword() {
		return this.props[FORM_API_ID_CHANGE_PASSWORD];
	}

	_onConfirm() {
		this._getFormChangePassword().post()
			.then(success => {
				const {navigator} = this.props;
				navigator.goBack();
			})
			.catch(error => {
				Logger.v('ScreenSettingsChangePassword _onConfirm', error);
			});
	}

	render() {
		return (
			<Screen>
				<View>
					<ScreenInfo
						imageSource={require('../../../assets/images/lock.png')}
						textText='Change password...'/>
					<View>
						<RkTextInputFromPool
							pool={this._getFormChangePassword()}
							field='passwordPrevious'
							placeholder='Password'
							secureTextEntry/>

						<RkTextInputFromPool
							pool={this._getFormChangePassword()}
							field='passwordNext'
							placeholder='New password'
							secureTextEntry/>

						<RkTextInputFromPool
							pool={this._getFormChangePassword()}
							field='passwordConfirmNext'
							placeholder='Confirm password'
							secureTextEntry/>
					</View>

					<GradientButton
						style={styles.confirm}
						rkType='large stretch accentColor'
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

const styles = RkStyleSheet.create(theme => ({
	confirm: {
		marginVertical: 9,
	}
}));