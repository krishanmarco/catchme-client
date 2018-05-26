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
	onUserConnectionBlockUid?: (TUser) => void,
	onUserConnectionAddUid?: (TUser) => void,
	isPending?: boolean
};

const defaultProps = {
	isPending: false
};

// ListItemUser *****************************************************************************************
// ListItemUser *****************************************************************************************

export default class ListItemUser extends React.PureComponent<void, ListItemUserProps, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._defaultOnPress = this._defaultOnPress.bind(this);
		this.initialize();
	}

	componentWillReceiveProps(props) {
		this.initialize(props);
	}

	initialize(props = this.props) {
		const {user, isPending, onUserConnectionAddUid, onUserConnectionBlockUid} = props;

		this.actions = [];

		if (onUserConnectionAddUid) {
			this.actions.push({
				icon: Icons.userFollow,
				onPress: () => onUserConnectionAddUid(user)
			});
		}

		if (onUserConnectionBlockUid) {
			this.actions.push({
				icon: Icons.userBlock,
				onPress: () => onUserConnectionBlockUid(user)
			});
		}

		if (isPending) {
			this.actions.push({
				icon: Icons.userPending
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
