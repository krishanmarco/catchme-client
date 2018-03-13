/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkStyleSheet} from 'react-native-ui-kitten';
import {ScreenInfo} from "../../../comp/Misc";
import {View} from 'react-native';

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: Navigator
};


// Component ********************************************************************************************
// Component ********************************************************************************************

export default class HelpAppInfo extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<View>
				<ScreenInfo
					imageContainerStyle={styles.imageContainer}
					imageContainerScale={550}
					imageHeight={100}
					imageWidth={150}
					imageSource={require('../../../assets/images/splashBack.png')}
					textText='Catchme info...'/>
			</View>
		);
	}

}

// Style ************************************************************************************************
// Style ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	imageContainer: {
		marginTop: 64
	}
}));
