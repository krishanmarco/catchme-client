/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RkText} from 'react-native-ui-kitten';
import {Touchable} from '../Misc';
import type {TStyle} from '../../lib/types/Types';


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	imageSource: Object,
	textText?: string,
	height?: number|string,
	imageHeight?: number|string,
	marginTop?: number|string,
	onPress?: () => void,
	style?: TStyle
};

const defaultProps = {
	height: 124,
	imageHeight: '75%',
	marginTop: 8,
};

// ScreenInfo ******************************************************************************************
// ScreenInfo ******************************************************************************************

export default class ScreenInfo extends React.Component<void, Props, void> {
	static defaultProps = defaultProps;

	render() {
		const {
			style,
			height,
			imageHeight,
			marginTop,
			onPress,
			imageSource,
			textText
		} = this.props;

		return (
			<View style={[{height, marginTop}, style, styles.root]}>

				<Touchable
					style={styles.imageCont}
					onPress={onPress}>
					<Image
						style={[{height: imageHeight}, styles.imageImage]}
						source={imageSource}/>
				</Touchable>

				{!!textText && (
					<View style={styles.textCont}>
						<RkText style={styles.text} rkType='infoText'>{textText}</RkText>
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
	imageCont: {
		width: '100%',
		alignItems: 'center',
		marginTop: 16,
	},
	imageImage: {
		resizeMode: 'contain'
	},
	textCont: {
		alignItems: 'center',
		width: '70%',
		marginTop: 4,
	},
	text: {
		textAlign: 'center'
	}
});
