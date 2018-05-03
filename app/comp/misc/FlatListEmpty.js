/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 01-May-18 © **/
import React from 'react';
import {Colors} from "../../Config";
import {Image, StyleSheet, View} from 'react-native';
import {RkButton, RkText} from 'react-native-ui-kitten';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	image: string,
	text?: string,
	onPress?: Function,
	buttonText?: Node | string,
}

const DefaultProps = {
	// Nothing for now
};


// Const *************************************************************************************************
// Const *************************************************************************************************

export default class FlatListEmpty extends React.PureComponent<void, Props, void> {
	static defaultProps = DefaultProps;

	render() {
		const {image, text, onPress, buttonText} = this.props;
		return (
			<View style={styles.root}>
				<View style={styles.content}>

					<Image
						style={styles.image}
						source={image}/>

					{!!text && (
						<RkText
							style={styles.text}
							rkType='primary2'>
							{text}
						</RkText>
					)}

					{!!(buttonText && onPress) && (
						<RkButton
							onPress={onPress}
							style={styles.button}
							rkType='rounded small stretch'>
							{buttonText}
						</RkButton>
					)}

				</View>
			</View>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',

		// Workaround for flat list empty component not being centered
		// This should be fixed by 0.56.0
		// https://github.com/facebook/react-native/pull/18206#issuecomment-375032807
		marginTop: 46,
	},
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 32
	},
	image: {
		height: 112,
		width: 112,
		resizeMode: 'contain'
	},
	text: {
		marginTop: 16,
		textAlign: 'center',
		color: Colors.greyFade
	},
	button: {
		marginTop: 12,
		backgroundColor: Colors.primary,
		marginHorizontal: 12
	}
});

