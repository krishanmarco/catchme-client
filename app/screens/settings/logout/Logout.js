/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import RealmIO from '../../../lib/data/RealmIO';
import {LoadingButton, ScreenInfo} from "../../../comp/Misc";
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
			<View style={styles.root}>
				<ScreenInfo
					style={styles.info}
					imageSource={require('../../../assets/images/logout.png')}
					textText='Are you sure you want to log out?'/>

				<View style={styles.logoutCont}>
					<LoadingButton
						style={styles.logoutButton}
						rkType='large stretch accentColor'
						text={'Logout'.toUpperCase()}
						onPress={this._onLogoutPress}/>
				</View>
			</View>
		);
	}
}


// Config ************************************************************************************************
// Config ************************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	info: {
		marginTop: 24
	},
	logout: {
		marginTop: 64
	},
	logoutCont: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 24,
		marginHorizontal: 24,
	},
	logoutButton: {
		marginTop: 24,
	},
});