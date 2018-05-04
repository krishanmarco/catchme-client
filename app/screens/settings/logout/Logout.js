/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import RealmIO from '../../../lib/data/RealmIO';
import {FullpageForm, LoadingButton, ScreenInfo} from "../../../comp/Misc";
import {fullpageForm} from "../../../lib/theme/Styles";
import {startApplication} from "../../../App";
import {StyleSheet, View} from 'react-native';
import {t} from "../../../lib/i18n/Translations";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	authUserProfile: Object,
	navigator: Navigator
};


// Logout ***********************************************************************************************
// Logout ***********************************************************************************************

export default class Logout extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onLogoutPress = this._onLogoutPress.bind(this);
	}

	_onLogoutPress() {
		RealmIO.removeLocalUser();
		startApplication();
	}

	render() {
		return (
				<FullpageForm

					fieldsStyle={[fullpageForm.fieldsStyle, styles.fieldsStyle]}
					fieldsJsx={(
						<ScreenInfo
							style={styles.info}
							imageSource={require('../../../assets/images/primary-logout.png')}
							textText={t('t_si_settings_logout')}/>
					)}

					footerStyle={[fullpageForm.footerStyle, styles.footerStyle]}
					footerJsx={(
						<LoadingButton
							style={fullpageForm.fieldsButton}
							rkType='large stretch accentColor'
							text={t('t_bt_logout').toUpperCase()}
							onPress={this._onLogoutPress}/>
					)}

				/>
		);
	}
}


// Config ************************************************************************************************
// Config ************************************************************************************************

const styles = StyleSheet.create({
	fieldsStyle: {
		flex: 0.88
	},
	footerStyle: {
		marginHorizontal: 24
	},
});