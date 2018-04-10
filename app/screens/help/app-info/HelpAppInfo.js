/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {ScreenInfo} from "../../../comp/Misc";
import {StyleSheet, View} from 'react-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator
};


// HelpAppInfo ******************************************************************************************
// HelpAppInfo ******************************************************************************************

export default class HelpAppInfo extends React.Component<any, Props, any> {

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

const styles = StyleSheet.create({
	// Nothing for now
});
