/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkStyleSheet} from 'react-native-ui-kitten';
import {ScreenInfo} from "../../../comp/Misc";
import {View} from 'react-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator
};


// HelpAppInfo ******************************************************************************************
// HelpAppInfo ******************************************************************************************

export default class HelpAppInfo extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<View>
				<ScreenInfo
					imageSource={require('../../../assets/images/meLogo.png')}
					textText='Catchme info...'/>
			</View>
		);
	}

}

// Style ************************************************************************************************
// Style ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({

}));
