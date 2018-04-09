/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import RealmIO from '../../../lib/data/RealmIO';

import {GradientButton, ScreenInfo} from "../../../comp/Misc";

import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {startApplication} from "../../../App";
import {View} from 'react-native';




// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	authenticatedUserProfile: Object,
	navigator: Navigator
};


// Logout ***********************************************************************************************
// Logout ***********************************************************************************************

export default class Logout extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onLogoutPress = this._onLogoutPress.bind(this);
	}

	_userProfile() {
		return this.props.authenticatedUserProfile;
	}

	_onLogoutPress() {
		RealmIO.removeLocalUser();
		startApplication();
	}

	render() {
		return (
			<View>
				<ScreenInfo
					imageSource={require('../../../assets/images/logout.png')}
					textText='Are you sure you want to log out?'/>

				<GradientButton
					style={styles.logout}
					rkType='large stretch accentColor'
					text={'Logout'.toUpperCase()}
					onPress={this._onLogoutPress}/>
			</View>
		);
	}

}




// Style ************************************************************************************************
// Style ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	logout: {
		marginTop: 64
	}
}));