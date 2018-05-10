/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Grid, Row} from "react-native-easy-grid";
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TDataTuple, TStyle} from "../../lib/types/Types";

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	listDataPoints: Array<TDataTuple>,
	style: TStyle
};


// Const ************************************************************************************************
// Const ************************************************************************************************

const ListDataPoints = ({listDataPoints = [], style}: Props) => (
	<Grid style={[styles.header, style]}>
		<Row>
			{listDataPoints.map((dp, key) => (
				<View key={key} style={styles.listDataSection}>
					<RkText rkType='header4' style={styles.space}>{dp.value}</RkText>
					<RkText rkType='secondary2 hintColor'>{dp.name}</RkText>
				</View>
			))}
		</Row>
	</Grid>
);
export default ListDataPoints;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 12,
		marginBottom: 16,
	},
	listDataSection: {
		flex: 1,
		alignItems: 'center'
	},
	space: {
		marginBottom: 3
	},
});