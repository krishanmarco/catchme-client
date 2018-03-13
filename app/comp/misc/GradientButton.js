/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {RkButton, RkComponent, RkText} from 'react-native-ui-kitten';

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type TGradient = {
	x: number,
	y: number
};

type Props = {
	colors: Array<number>,
	text: string,
	children: Node,
	gradientStart: TGradient,
	gradientEnd: TGradient
}

const DefaultProps = {
	gradientStart: {x: 0.0, y: 0.5},
	gradientEnd: {x: 1, y: 0.5}
};


// Flow *************************************************************************************************
// Flow *************************************************************************************************

export default class GradientButton extends RkComponent<DefaultProps, Props> {

	// Needed for this.defineStyles()
	componentName = 'GradientButton';
	typeMapping = {button: {}, gradient: {}, text: {}};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {button, gradient, text: textStyle} = this.defineStyles();
		const {style, gradientStart, gradientEnd, children, text, colors, ...otherProps} = this.props;

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

					{!text
						? children
						: <RkText style={textStyle}>{text}</RkText>}

				</LinearGradient>

			</RkButton>
		);
	}

}
