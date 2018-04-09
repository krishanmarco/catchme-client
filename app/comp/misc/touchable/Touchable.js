/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 24-Mar-18 © **/
import React from 'react';
import {TouchableOpacity, View} from 'react-native';


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	children: Node,
	onPress?: () => {},
	style?: Object
};


// Touchable ********************************************************************************************
// Touchable ********************************************************************************************

const Touchable = ({children, onPress, style, ...props}: Props) => {
	const child = (
		<View style={style}>
			{children}
		</View>
	);

	if (!onPress)
		return child;

	return (<TouchableOpacity onPress={onPress} {...props}>{child}</TouchableOpacity>);
};
export default Touchable;