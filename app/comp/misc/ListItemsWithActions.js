/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Avatar, Icon} from 'react-native-elements';
import {AvatarCircle, Touchable} from '../Misc';
import {Col, Grid} from 'react-native-easy-grid';
import {Icons} from '../../Config';
import {listItemActions} from '../../lib/theme/Styles';
import {RkButton, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {View} from 'react-native';
import type {TIcon, TImageSource} from '../../lib/types/Types';

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
	avatarSource?: TImageSource,
	onPress?: () => void,
	actions?: Array<TListItemAction>,
	image?: ListItemImageProps
};

const ListItemWithActions = (props: ListItemWithActionProps) => {
	const {header, content, subContent, avatarSource, onPress, actions, image} = props;

	return (
		<Touchable onPress={onPress}>
			<Grid style={styles.listItemWithActionsRoot}>

				<Col size={100}>
					<View style={styles.listItemWithActionsHeader}>

						{!!avatarSource && <AvatarCircle source={avatarSource}/>}

						<View style={styles.listItemWithActionsContent}>
							<RkText style={styles.listItemWithActionsContentText} numberOfLines={1}>{header}</RkText>
							{!!content && <RkText numberOfLines={1} rkType='secondary5 hintColor'>{content}</RkText>}
							{!!subContent && <RkText rkType='secondary6'>{subContent}</RkText>}
						</View>

					</View>
				</Col>

				{actions.map((action, key) => (
					<Col key={key} size={15} style={key !== actions.length ? listItemActions.action : listItemActions.actionLast}>
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
};
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

