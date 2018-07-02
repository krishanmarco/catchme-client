/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18-Apr-18 © **/
import {StyleSheet} from 'react-native';

export const fullpageFormStyles = StyleSheet.create({
	headerStyle: {
		flex: 0.28,
		marginTop: 16
	},
	fieldsStyle: {
		flex: 0.60,
		marginTop: 4,
		marginHorizontal: 24,
	},
	footerStyle: {
		flex: 0.12,
		marginTop: 12,
		marginBottom: 16,
	},
	fieldsButton: {
		marginTop: 12,
	},
});

export const listItemInfoStyles = StyleSheet.create({
	section: {
		paddingHorizontal: 16
	}
});

export const listItemActionsStyles = StyleSheet.create({
	action: {
		marginRight: 8
	},
	actionLast: {
		marginRight: 0
	},
	actionOnly: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export const iconStyles = StyleSheet.create({
  icon: {
    padding: 0,
    margin: 0
  }
});
