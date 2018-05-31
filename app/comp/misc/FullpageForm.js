/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 23-Apr-18 © **/
import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {TStyle} from '../../lib/types/Types';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	headerStyle: TStyle,
	headerJsx: Node,

	fieldsStyle: TStyle,
	fieldsJsx: Node,

	fieldsFooterStyle: TStyle,
	fieldsFooterJsx: Node,

	footerStyle: TStyle,
	footerJsx: Node,
};


// FullpageForm *****************************************************************************************
// FullpageForm *****************************************************************************************

const FullpageForm = (props: Props) => {

	const {
		headerStyle,
		headerJsx,

		fieldsStyle,
		fieldsJsx,

		fieldsFooterStyle,
		fieldsFooterJsx,

		footerStyle,
		footerJsx
	} = props;

	return (
		<View style={styles.root}>
			{!!headerJsx && <View style={[styles.header, headerStyle]}>{headerJsx}</View>}
			{!!fieldsJsx && <View style={[styles.fields, fieldsStyle]}>{fieldsJsx}</View>}
			{!!fieldsFooterJsx && <View style={[styles.fieldFooter, fieldsFooterStyle]}>{fieldsFooterJsx}</View>}
			{!!footerJsx && <View style={[styles.footer, footerStyle]}>{footerJsx}</View>}
		</View>
	);
};
export default FullpageForm;

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1,
		flexDirection: 'column',
	},
	header: {
		justifyContent: 'flex-start',
		// backgroundColor: 'rgba(100, 0, 0, .2)'
	},
	fields: {
		justifyContent: 'center',
		// backgroundColor: 'rgba(0, 100, 0, .2)'
	},
	fieldFooter: {
		justifyContent: 'center',
		// backgroundColor: 'rgba(0, 0, 100, .2)'
	},
	footer: {
		justifyContent: 'flex-end',
		// backgroundColor: 'rgba(200, 100, 100, .2)'
	}
});
