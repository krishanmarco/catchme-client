// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/Button.ios.js
import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
	children: Node
};

const Button = ({children, ...props}: Props) => (
	<TouchableOpacity {...props}>
		{children}
	</TouchableOpacity>
);
export default Button;