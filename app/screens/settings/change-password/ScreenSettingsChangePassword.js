/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Logger from '../../../lib/Logger';
import React from 'react';
import {FORM_API_ID_CHANGE_PASSWORD} from '../../../lib/redux-pool/api-form/def/ApiFormDefChangePassword';
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from '../../../comp/Misc';
import {fullpageForm} from '../../../lib/theme/Styles';
import {Icon} from 'react-native-elements';
import {Icons} from '../../../Config';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {StyleSheet, View} from 'react-native';
import {t} from '../../../lib/i18n/Translations';
import type {TApiFormPool} from '../../../lib/redux-pool/api-form/ApiFormPool';
import type {TNavigator} from '../../../lib/types/Types';


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
				Logger.v('ScreenSettingsChangePassword _onChangePress:', error);
				// todo Snackbar
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
								placeholder={t('t_field_password')}
								withBorder
								secureTextEntry/>

							<RkTextInputFromPool
								pool={this._getFormChangePassword()}
								field='passwordNext'
								placeholder={t('t_field_password_new')}
								withBorder
								secureTextEntry/>

							<RkTextInputFromPool
								pool={this._getFormChangePassword()}
								field='passwordConfirmNext'
								placeholder={t('t_field_password_confirm')}
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
			props.imageSource = require('../../../assets/images/primary-success.png');
			props.textText = t('t_si_settings_change_password_success');

		} else {
			props.imageSource = require('../../../assets/images/primary-lock.png');
			props.textText = t('t_si_settings_change_password');
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
					<Icon {...Icons.changePasswordBack}/>
					<RkText>{t('t_bt_back')}</RkText>
				</RkText>
			);

		} else {
			props.onPress = this._onChangePress;
			props.text = t('t_bt_change');
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