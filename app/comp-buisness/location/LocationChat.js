/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Chat from '../../comp/chat/Chat';
import DaoLocation from '../../lib/daos/DaoLocation';
import React from 'react';
import {FirebaseData} from '../../lib/data/Firebase';
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	location: TLocation,
	user: TUser
};


// LocationChat *****************************************************************************************
// LocationChat *****************************************************************************************

export default class LocationChat extends React.Component<Props> {

	constructor(props, context) {
		super(props, context);
		this._getFirebaseMessages = this._getFirebaseMessages.bind(this);
	}

	_getFirebaseMessages() {
		const {location} = this.props;
		return FirebaseData.dbLocationChatMessages(DaoLocation.gId(location));
	}

	render() {
		const {location, user, navigator} = this.props;
		return (
			<Chat
				navigator={navigator}
				chatId={DaoLocation.gId(location).toString()}
				user={user}
				getFirebaseMessages={this._getFirebaseMessages}
			/>
		);
	}

}
