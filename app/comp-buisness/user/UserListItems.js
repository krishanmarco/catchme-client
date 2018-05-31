/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../../lib/daos/DaoUser';
import React from 'react';
import {Icons} from '../../Config';
import {ListItemWithActions} from '../../comp/Misc';
import type {ListItemWithActionProps} from '../../comp/misc/ListItemsWithActions';
import type {TUser} from '../../lib/daos/DaoUser';

// Const ************************************************************************************************
// Const ************************************************************************************************

export type ListItemUserProps = ListItemWithActionProps & {
	user: TUser,
	onPress: (TUser) => void,
	onConnRemovePress?: (TUser) => void,
	onConnAddPress?: (TUser) => void,
	onConnPendingPress?: (TUser) => void,
};

// ListItemUser *****************************************************************************************
// ListItemUser *****************************************************************************************

export default class ListItemUser extends React.PureComponent<void, ListItemUserProps, void> {

	constructor(props, context) {
		super(props, context);
		this._defaultOnPress = this._defaultOnPress.bind(this);
		this.initialize();
	}

	componentWillReceiveProps(props) {
		this.initialize(props);
	}

	initialize(props = this.props) {
		const {user, onConnPendingPress, onConnAddPress, onConnRemovePress} = props;

		this.actions = [];

		if (onConnPendingPress) {
			this.actions.push({
				icon: Icons.userPending,
				onPress: () => onConnPendingPress(user)
			});
		}

		if (onConnAddPress) {
			this.actions.push({
				icon: Icons.userFollow,
				onPress: () => onConnAddPress(user)
			});
		}

		if (onConnRemovePress) {
			this.actions.push({
				icon: Icons.userBlock,
				onPress: () => onConnRemovePress(user)
			});
		}
	}

	_defaultOnPress() {
		const {user, onPress} = this.props;

		if (onPress)
			onPress(user);
	}

	render() {
		const {user, ...props} = this.props;

		return (
			<ListItemWithActions
				{...props}
				header={DaoUser.gName(user)}
				content={DaoUser.gPublicMessage(user)}
				avatarSource={{uri: DaoUser.gPictureUrl(user)}}
				onPress={this._defaultOnPress}
				actions={this.actions} />
		);
	}

}
