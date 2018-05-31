/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import Router from '../../lib/navigation/Router';
import {FontIcons} from '../../Config';
import {FORM_API_ID_REGISTER} from '../../lib/redux-pool/api-form/def/ApiFormDefRegister';
import {FormFooterLink} from '../../comp/misc/forms/FormComponents';
import {FullpageForm, LoadingButton, Screen, ScreenInfo} from '../../comp/Misc';
import {fullpageForm} from '../../lib/theme/Styles';
import {poolConnect} from '../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../comp/misc/forms/RkInputs';
import {Snackbar} from '../../lib/Snackbar';
import {startApplication} from '../../App';
import {StyleSheet, View} from 'react-native';
import {t} from '../../lib/i18n/Translations';
import type {TApiFormDefRegister} from '../../lib/redux-pool/api-form/def/ApiFormDefRegister';
import type {TNavigator} from '../../lib/types/Types';


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

	_getFormApiRegister(): TApiFormDefRegister {
		return this.props[FORM_API_ID_REGISTER];
	}

	_onRegisterPress() {
		this._getFormApiRegister().post()
			.then(startApplication)
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
					headerJsx={(
						<ScreenInfo
							height={120}
							imageHeight='100%'
							imageSource={require('../../assets/images/primary-me.png')}/>
					)}

					fieldsStyle={[fullpageForm.fieldsStyle, styles.fieldsStyle]}
					fieldsJsx={(
						<View>
							<RkTextInputFromPool
								pool={this._getFormApiRegister()}
								field='name'
								placeholder={t('t_field_name')}
								withBorder/>

							<RkTextInputFromPool
								pool={this._getFormApiRegister()}
								field='email'
								keyboardType='email-address'
								placeholder={t('t_field_email')}
								withBorder/>

							<RkTextInputFromPool
								pool={this._getFormApiRegister()}
								field='password'
								placeholder={t('t_field_password')}
								secureTextEntry
								withBorder/>

							<RkTextInputFromPool
								pool={this._getFormApiRegister()}
								field='passwordConfirm'
								placeholder={t('t_field_password_confirm')}
								secureTextEntry
								withBorder/>

							<LoadingButton
								style={fullpageForm.fieldsButton}
								loading={this._getFormApiRegister().loading}
								rkType='large stretch accentColor'
								text={t('t_bt_register')}
								onPress={this._onRegisterPress}/>

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
	fieldsStyle: {
		flex: 0.66,
	},
	footerStyle: {
		flex: 0.06,
	},
});
