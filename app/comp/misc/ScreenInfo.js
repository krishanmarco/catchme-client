/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableNativeFeedback, View} from 'react-native';

import {RkText} from 'react-native-ui-kitten';
import {scaleModerate, scaleVertical} from '../../lib/utils/scale';
import {Touchable} from "../Misc";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	imageSource: Object,
	textText?: string,
	height?: number,
	marginTop?: number,
	onPress?: () => {}
};


// Component *******************************************************************************************
// Component *******************************************************************************************

export default class ScreenInfo extends React.Component<any, Props, any> {

	static defaultProps = {
		height: 150,
		marginTop: 8,
	};

	render() {
		const {height, marginTop, imageSource, textText, onPress} = this.props;

		return (
			<View style={[{height, marginTop}, styles.root]}>

				<Touchable
					style={styles.imageRoot}
					onPress={onPress}>
					<Image
						style={styles.image}
						source={imageSource}/>
				</Touchable>

				{!!textText && (
					<View style={styles.textRoot}>
						<RkText style={styles.text} rkType='header6'>{textText}</RkText>
					</View>
				)}

			</View>
		);
	}

}


// Config *********************************************************************************************
// Config *********************************************************************************************

const styles = StyleSheet.create({
	root: {
		width: '100%',
		alignItems: 'center',
		paddingVertical: 8
	},
	imageRoot: {
		width: '100%',
		height: '50%',
		alignItems: 'center',
		marginVertical: 16,
	},
	image: {
		resizeMode: 'contain',
		height: '75%'
	},
	textRoot: {
		alignItems: 'center',
		width: '70%',
		marginVertical: 16
	},
	text: {
		textAlign: 'center'
	}
});
