/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Colors} from "../../Config";
import {DefaultLoader} from "../Misc";
import {RkButton, RkComponent, RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	text: string,
	children: Node,
	onPress: Function,
	color: ?string,
	loading?: boolean
}

const DefaultProps = {
	color: Colors.primary,
	loading: false
};


// LoadingButton *****************************************************************************************
// LoadingButton *****************************************************************************************

export default class LoadingButton extends RkComponent<void, Props, void> {
	static defaultProps = DefaultProps;

	// Needed for this.defineStyles()
	componentName = 'LoadingButton';
	typeMapping = {button: {}, text: {}};

	render() {
		const {button, text: textStyle} = this.defineStyles();
		const {color, style, children, text, loading, ...otherProps} = this.props;

		return (
			<RkButton
				{...otherProps}
				rkType='stretch'
				style={[{backgroundColor: color}, button, style]}>

				<View style={styles.content}>
					{!!loading && <DefaultLoader size={8} color={Colors.white}/>}

					{!loading && (
						!text ? children : <RkText style={textStyle}>{text}</RkText>
					)}
				</View>

			</RkButton>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});

