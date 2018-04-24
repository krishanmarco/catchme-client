/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Logger from "../../../lib/Logger";
import React from 'react';
import {FORM_API_ID_CHANGE_PASSWORD} from "../../../lib/redux-pool/api-form/def/ApiFormDefChangePassword";
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from "../../../comp/Misc";
import {fullpageForm} from "../../../lib/theme/Styles";
import {Icon} from 'react-native-elements';
import {Icons} from "../../../Config";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";
import type {TNavigator} from "../../../lib/types/Types";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};

type State = {
	passwordChanged: boolean
};

// _ScreenSettingsChangePassword ************************************************************************
// _ScreenSettingsChangePassword ************************************************************************

class _ScreenSettingsChangePassword extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._getFormChangePassword = this._getFormChangePassword.bind(this);
		this._onChangePress = this._onChangePress.bind(this);
		this._onBackPress = this._onBackPress.bind(this);
		this.state = {passwordChanged: false};
	}

	_getFormChangePassword(): TApiFormPool {
		return this.props[FORM_API_ID_CHANGE_PASSWORD];
	}

	_onChangePress() {
		this._getFormChangePassword().post()
			.then(success => {
				this._getFormChangePassword().reset();
				this.setState({passwordChanged: true});
			})
			.catch(error => {
				Logger.v('ScreenSettingsChangePassword _onChangePress', error);
			});
	}

	_onBackPress() {
		const {navigator} = this.props;
		navigator.pop();
	}

	render() {
		return (
			<Screen>
				<FullpageForm

					headerStyle={[fullpageForm.headerStyle, styles.headerStyle]}
					headerJsx={this._renderScreenInfo()}

					fieldsStyle={[fullpageForm.fieldsStyle, styles.fieldsStyle]}
					fieldsJsx={(
						<View>
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

						</View>
					)}

					footerStyle={[fullpageForm.footerStyle, styles.footerStyle]}
					footerJsx={this._renderFooterJsx()}

				/>

			</Screen>
		);
	}

	_renderScreenInfo() {
		const {passwordChanged} = this.state;

		const props = {};
		if (passwordChanged) {
			props.imageSource = require('../../../assets/images/search.png');
			props.textText = 'Your password has been changed successfully';

		} else {
			props.imageSource = require('../../../assets/images/meLogo.png');
			props.textText = 'Change password...';
		}

		return (
			<ScreenInfo {...props}/>
		);
	}

	_renderFooterJsx() {
		const {passwordChanged} = this.state;

		const props = {};
		if (passwordChanged) {
			props.onPress = this._onBackPress;
			props.text = (
				<RkText>
					<Icon {...Icons.back}/>
					<RkText>{'back'.toUpperCase()}</RkText>
				</RkText>
			);

		} else {
			props.onPress = this._onChangePress;
			props.text = 'Change'.toUpperCase();
		}

		return (
			<LoadingButton
				{...props}
				style={fullpageForm.fieldsButton}
				rkType='large stretch accentColor'
				loading={this._getFormChangePassword().loading}/>
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
	headerStyle: {
		flex: 0.40,
	},
	fieldsStyle: {
		flex: 0.48,
	},
	footerStyle: {
		marginHorizontal: 24
	},
});