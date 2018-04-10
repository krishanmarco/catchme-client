/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Colors} from "../../Config";
import {DefaultLoader} from "../Misc";
import {RkButton, RkComponent, RkText} from 'react-native-ui-kitten';

// Const *************************************************************************************************
// Const *************************************************************************************************

type TGradient = {
	x: number,
	y: number
};

type Props = {
	colors: Array<number>,
	text: string,
	children: Node,
	gradientStart?: TGradient,
	gradientEnd?: TGradient,
	loading?: boolean
}

const DefaultProps = {
	gradientStart: {x: 0.0, y: 0.5},
	gradientEnd: {x: 1, y: 0.5},
	loading: false
};


// Const *************************************************************************************************
// Const *************************************************************************************************

export default class GradientButton extends RkComponent<any, Props> {
	static defaultProps = DefaultProps;

	// Needed for this.defineStyles()
	componentName = 'GradientButton';
	typeMapping = {button: {}, gradient: {}, text: {}};

	render() {
		const {button, gradient, text: textStyle} = this.defineStyles();
		const {style, gradientStart, gradientEnd, children, text, colors, loading, ...otherProps} = this.props;

		return (
			<RkButton
				{...otherProps}
				rkType='stretch'
				style={[button, style]}>

				<LinearGradient
					colors={colors || this.extractNonStyleValue(gradient, 'colors')}
					start={gradientStart}
					end={gradientEnd}
					style={gradient}>

					{!!loading && <DefaultLoader size={8} color={Colors.white}/>}

					{!loading && (
						!text ? children : <RkText style={textStyle}>{text}</RkText>
					)}

				</LinearGradient>

			</RkButton>
		);
	}

}
