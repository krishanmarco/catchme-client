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

type ListItemUserRequestSendProps = ListItemUserProps & {
	onUserConnectionAddUid: (TUser) => void
};

const buildActionUserConnectionsAddUid = (onUserConnectionAddUid) => ({
	icon: Icons.userFollow,
	onPress: onUserConnectionAddUid
});

export class ListItemUserRequestSend extends React.PureComponent<void, ListItemUserRequestSendProps, void> {

	constructor(props, context) {
		super(props, context);
		this.initialize();
	}

	componentWillReceiveProps(props) {
		this.initialize(props);
	}

	initialize(props = this.props) {
		const {onUserConnectionAddUid} = props;
		this.actions = [buildActionUserConnectionsAddUid(onUserConnectionAddUid)];
	}

	render() {
		const {onUserConnectionAddUid, ...props} = this.props;
		return (
			<ListItemUser
				{...props}
				actions={this.actions} />
		);
	}

}


// ListItemUserRequestReceived **************************************************************************
// ListItemUserRequestReceived **************************************************************************

type ListItemUserRequestReceivedProps = ListItemUserProps & {
	onUserConnectionBlockUid: (TUser) => void,
	onUserConnectionAddUid: (TUser) => void,
};

const buildActionUserConnectionsBlockUid = (onUserConnectionBlockUid) => ({
	icon: Icons.userBlock,
	onPress: onUserConnectionBlockUid
});

export class ListItemUserRequestReceived extends React.PureComponent<void, ListItemUserRequestReceivedProps, void> {

	constructor(props, context) {
		super(props, context);
		this.initialize();
	}

	componentWillReceiveProps(props) {
		this.initialize(props);
	}

	initialize(props = this.props) {
		const {onUserConnectionAddUid, onUserConnectionBlockUid} = props;
		this.actions = [
			buildActionUserConnectionsAddUid(onUserConnectionAddUid),
			buildActionUserConnectionsBlockUid(onUserConnectionBlockUid)
		];
	}

	render() {
		const {onUserConnectionAddUid, onUserConnectionBlockUid, ...props} = this.props;
		return (
			<ListItemUser {...props} actions={this.actions} />
		);
	}

}

// Config ***********************************************************************************************
// Config ***********************************************************************************************