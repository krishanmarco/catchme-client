/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Bubbles} from 'react-native-loader';
import {Colors} from '../../Config';
import {StyleSheet, View} from 'react-native';
import type {TStyle} from '../../lib/types/Types';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	size: number,
	height: number,
	color: string,
	style: TStyle,
};

const DefaultProps = {
	size: 16,
	height: '100%',
	color: Colors.primary
};


// DefaultLoader ****************************************************************************************
// DefaultLoader ****************************************************************************************

const DefaultLoader = ({size, height, color, style}: Props = DefaultProps) => (
	<View style={[styles.view, {height}, style]}>
		<Bubbles size={size} color={color}/>
	</View>
);
export default DefaultLoader;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 16
	}
});
