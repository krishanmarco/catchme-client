/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Avatar, Icon} from 'react-native-elements';
import {AvatarCircle, Touchable} from "../Misc";
import {Col, Grid} from "react-native-easy-grid";
import {Icons} from '../../Config';
import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {View} from 'react-native';
import type {TIcon} from "../../lib/types/Types";

// ListItemAction *************************************************************************************
// ListItemAction *************************************************************************************

export type TListItemAction = {
	icon: TIcon,
	size?: number,
	onPress?: () => void
};

export const ListItemAction = ({icon, size, onPress}: TListItemAction) => (
	<RkButton rkType='clear' style={styles.listItemActionRoot} onPress={onPress}>
		<Icon {...icon} size={size}/>
	</RkButton>
);

ListItemAction.defaultProps = {
	icon: Icons.defaultIcon,
	size: 27,
	onPress: () => null
};


// ListItemImage *****************************************************************************************
// ListItemImage *****************************************************************************************

type ListItemImageProps = {
	src: string,
	onPress?: () => void
};

const ListItemImage = ({src, onPress}: ListItemImageProps) => (
	<View style={styles.listItemImageRoot}>
		<Avatar medium source={{uri: src}} onPress={onPress}/>
	</View>
);

ListItemImage.defaultProps = {
	onPress: () => null
};


// ListItemWithActions ************************************************************************************
// ListItemWithActions ************************************************************************************

export type ListItemWithActionProps = {
	header: Node,
	subContent?: Node,
	content?: Node,
	avatarUri?: string,
	onPress?: () => void,
	actions?: Array<TListItemAction>,
	image?: ListItemImageProps
};

const ListItemWithActions = ({header, content, subContent, avatarUri, onPress, actions, image}: ListItemWithActionProps) => (
	<Touchable onPress={onPress}>
		<Grid style={styles.listItemWithActionsRoot}>

			<Col size={100} style={styles.listItemSection}>
				<View style={styles.listItemWithActionsHeader}>

					{!!avatarUri && <AvatarCircle uri={avatarUri}/>}

					<View style={styles.listItemWithActionsContent}>
						<RkText style={styles.listItemWithActionsContentText} numberOfLines={1}>{header}</RkText>
						{!!content && <RkText numberOfLines={1} rkType='secondary5 hintColor'>{content}</RkText>}
						{!!subContent && <RkText rkType='secondary6'>{subContent}</RkText>}
					</View>

				</View>
			</Col>

			{actions.map((action, key) => (
				<Col key={key} size={15} style={key !== actions.length ? styles.listItemSection : styles.listItemSectionEnd}>
					<ListItemAction {...action}/>
				</Col>
			))}

			{!!image && (
				<Col size={20}>
					<ListItemImage {...image}/>
				</Col>
			)}

		</Grid>
	</Touchable>
);
export default ListItemWithActions;

ListItemWithActions.defaultProps = {
	actions: [],
};


// Config *************************************************************************************************
// Config *************************************************************************************************

const styles = RkStyleSheet.create(theme => ({

	listItemWithActionsRoot: {
		display: 'flex',
		paddingHorizontal: 12,
		alignItems: 'center'
	},
	listItemSection: {
		marginRight: 8
	},
	listItemSectionEnd: {
		marginRight: 0
	},
	listItemWithActionsHeader: {
		paddingVertical: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	listItemWithActionsContent: {
		flex: 1,
		marginLeft: 12
	},
	listItemWithActionsContentText: {
		marginBottom: 1
	},
	listItemActionRoot: {
		height: '100%'
	},
	listItemImageRoot: {
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

