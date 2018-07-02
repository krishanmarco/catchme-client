/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Col, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Config';
import {Icon} from 'react-native-elements';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet} from 'react-native';
import {Touchable} from '../Misc';
import type {TDataPoint, TStyle} from '../../lib/types/Types';
import {iconStyles} from "../../lib/theme/Styles";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = TDataPoint & {
	style?: TStyle,
	subTitle?: string,
	itemRight?: Node,
	textRkType?: string,
	onPress?: Function
};

// ListItemInfo *****************************************************************************************
// ListItemInfo *****************************************************************************************

export const ListItemInfo = ({title, subTitle, icon, onPress, itemRight, textRkType, style}: Props) => (
	<Touchable onPress={onPress} style={[styles.root, style]}>
		<Grid style={styles.grid}>

			{!!icon && (
				<Col size={10} style={styles.iconCol}>
					<Icon iconStyle={iconStyles.icon} size={24} {...icon} />
				</Col>
			)}

			<Col size={100} style={styles.textCol}>
				<RkText rkType={textRkType}>{title}</RkText>
				{!!subTitle && <RkText rkType='secondary4 hintColor'>{subTitle}</RkText>}
			</Col>

			{!!itemRight && (
				<Col size={24}>{itemRight}</Col>
			)}

		</Grid>
	</Touchable>
);

ListItemInfo.defaultProps = {
	textRkType: 'secondary1'
};

export default ListItemInfo;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.border,
		paddingVertical: 12
	},
	grid: {
		alignItems: 'center',
	},
	iconCol: {
		alignItems: 'flex-start',
	},
	textCol: {
		marginLeft: 8
	},
});
