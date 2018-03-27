// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/Button.android.js
import React from 'react';
import {TouchableNativeFeedback} from 'react-native';

type Props = {
	children: Node
};

const Button = ({children, ...props}: Props) => (
	<TouchableNativeFeedback
		delayPressIn={0}
		background={TouchableNativeFeedback.SelectableBackground()}
		{...props}>
		{children}
	</TouchableNativeFeedback>
);
export default Button;