/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RkText} from 'react-native-ui-kitten';
import {Touchable} from "../Misc";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	imageSource: Object,
	textText?: string,
	height?: number,
	marginTop?: number,
	onPress?: () => void
};

const defaultProps = {
	height: 150,
	marginTop: 8,
};

// ScreenInfo ******************************************************************************************
// ScreenInfo ******************************************************************************************

export default class ScreenInfo extends React.Component<void, Props, void> {
	static defaultProps = defaultProps;

	render() {
		const {height, marginTop, onPress, imageSource, textText} = this.props;

		return (
			<View style={[{height, marginTop}, styles.root]}>

				<Touchable
					style={styles.imageCont}
					onPress={onPress}>
					<Image
						style={styles.imageImage}
						source={imageSource}/>
				</Touchable>

				{!!textText && (
					<View style={styles.textCont}>
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
	imageCont: {
		width: '100%',
		height: '54%',
		alignItems: 'center',
		marginVertical: 16,
	},
	imageImage: {
		resizeMode: 'contain',
		height: '75%'
	},
	textCont: {
		alignItems: 'center',
		width: '70%',
		marginVertical: 16
	},
	text: {
		textAlign: 'center'
	}
});
