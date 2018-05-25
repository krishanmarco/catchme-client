/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TStyle} from '../../lib/types/Types';


type Props = {
	name: string,
	style: TStyle
};

const ListItemHeader = ({name = ' ', style}: Props) => (
	<View style={[styles.row, style]}>
		<RkText rkType='primary header6'>{name.toUpperCase()}</RkText>
	</View>
);
export default ListItemHeader;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		paddingHorizontal: 17.5,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: theme.colors.border.base,
		alignItems: 'center'
	},
}));