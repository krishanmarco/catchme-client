/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoUser from '../../lib/daos/DaoUser';
import React from 'react';
import {Icons} from '../../Config';
import {ListItemWithActions} from "../../comp/Misc";
import type {ListItemWithActionProps} from "../../comp/misc/ListItemsWithActions";
import type {TUser} from "../../lib/daos/DaoUser";


// ListItemUser *****************************************************************************************
// ListItemUser *****************************************************************************************

export type ListItemUserProps = ListItemWithActionProps & {
	user: TUser,
	onPress: (TUser) => void
};

export class ListItemUser extends React.Component<void, ListItemUserProps, void> {

	constructor(props, context) {
		super(props, context);
		this._defaultOnPress = this._defaultOnPress.bind(this);
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
				avatarUri={DaoUser.gPictureUrl(user)}
				onPress={this._defaultOnPress}/>
		);
	}

}


// ListItemUserRequestSend ******************************************************************************
// ListItemUserRequestSend ******************************************************************************

const ActionUserConnectionsAddUid = {
	icon: Icons.userFollow,
	onPress: (user: TUser) => ApiClient.userConnectionsAddUid(DaoUser.gId(user))
};

export const ListItemUserRequestSend = (props: ListItemUserProps) => (
	<ListItemUser
		{...props}
		actions={[ActionUserConnectionsAddUid]}/>
);


// ListItemUserRequestReceived **************************************************************************
// ListItemUserRequestReceived **************************************************************************

const ActionUserConnectionsBlockUid = {
	icon: Icons.userBlock,
	onPress: (user: TUser) => ApiClient.userConnectionsBlockUid(DaoUser.gId(user))
};

export const ListItemUserRequestReceived = (props: ListItemUserProps) => (
	<ListItemUser
		{...props}
		actions={[ActionUserConnectionsAddUid, ActionUserConnectionsBlockUid]}/>
);


// Config ***********************************************************************************************
// Config ***********************************************************************************************