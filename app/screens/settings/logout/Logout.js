/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import RealmIO from '../../../lib/data/RealmIO';
import {FullpageForm, LoadingButton, ScreenInfo} from "../../../comp/Misc";
import {fullpageForm} from "../../../lib/theme/Styles";
import {startApplication} from "../../../App";
import {StyleSheet, View} from 'react-native';


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
							imageSource={require('../../../assets/images/logout.png')}
							textText='Are you sure you want to log out?'/>
					)}

					footerStyle={[fullpageForm.footerStyle, styles.footerStyle]}
					footerJsx={(
						<LoadingButton
							style={fullpageForm.fieldsButton}
							rkType='large stretch accentColor'
							text={'Logout'.toUpperCase()}
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