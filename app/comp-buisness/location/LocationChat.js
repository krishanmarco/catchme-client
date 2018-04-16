/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Chat from '../../comp/chat/Chat';
import DaoLocation from '../../lib/daos/DaoLocation';

import React from 'react';
import {FirebaseData} from '../../lib/data/Firebase';

import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";
// todo refactor proptypes

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
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

  _getLocation() {
    return this.props.location;
  }

  _getUser() {
    return this.props.user;
  }


  _getFirebaseMessages() {
    return FirebaseData.dbLocationChatMessages(DaoLocation.gId(this._getLocation()));
  }

  render() {
    return (
        <Chat
            chatId={DaoLocation.gId(this._getLocation()).toString()}
            getFirebaseMessages={this._getFirebaseMessages}
            user={this._getUser()}
        />
    );
  }

}
