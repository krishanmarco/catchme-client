/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import type {TIcon} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	backgroundJsx: Node,
	badge?: TIcon
};

// DefaultLoader ****************************************************************************************
// DefaultLoader ****************************************************************************************

const BadgeOverlay = ({backgroundJsx, badge}: Props) => (
	<View>
		<View style={styles.background}>
			{backgroundJsx}
		</View>

		{!!badge && (
			<View style={styles.badgeFullOverlay}>
				<View style={styles.badge}>
					<Icon size={35} {...badge}/>
				</View>
			</View>
		)}
	</View>
);
export default BadgeOverlay;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	background: {
		position: 'relative',
		width: '100%'
	},
	badgeFullOverlay: {
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
	badge: {
		position: 'absolute',
		bottom: '0%',
		right: '0%',
		marginRight: 4,
		marginBottom: 4,
	}
});
