import React from 'react';
import {GradientButton, Screen} from "../../../comp/Misc";
import {Image, View} from 'react-native';
import {RkStyleSheet, RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import {scaleVertical} from '../../../lib/utils/scale';
import type {TNavigator} from "../../../lib/types/Types";

// Const ************************************************************************************************
// Const ************************************************************************************************

const navigationOptions = {
	header: null
};

type Props = {
	navigation: TNavigator
};

// PasswordRecovery *************************************************************************************
// PasswordRecovery *************************************************************************************

export default class PasswordRecovery extends React.Component<void, Props, void> {
	static navigationOptions = navigationOptions;

	constructor(props) {
		super(props);
		this._renderIcon = this._renderIcon.bind(this);
	}

	render() {
		const {navigation} = this.props;
		return (
			<Screen>
				<View style={styles.header}>
					{this._renderIcon()}
					<RkText rkType='h1'>Password Recovery</RkText>
				</View>
				<View style={styles.listItemContent}>
					<RkTextInput rkType='rounded' placeholder='Email'/>
					<RkText rkType='secondary5 secondaryColor center'>
						Enter your email below to receive your password reset instructions
					</RkText>
				</View>
				<GradientButton style={styles.save} rkType='large' text='SEND' onPress={navigation.goBack}/>
			</Screen>
		);
	}

	_renderIcon() {
		return RkTheme.current.name === 'light'
			? <Image style={styles.image} source={require('../../../assets/images/logo.png')}/>
			: <Image style={styles.image} source={require('../../../assets/images/logoDark.png')}/>;
	}
}

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	screen: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: scaleVertical(24),
		justifyContent: 'space-between',
		backgroundColor: theme.colors.screen.base
	},
	header: {
		alignItems: 'center'
	},
	image: {
		marginVertical: scaleVertical(27),
		height: scaleVertical(77),
		resizeMode: 'contain'
	},
	listItemContent: {
		alignItems: 'center'
	}
}));