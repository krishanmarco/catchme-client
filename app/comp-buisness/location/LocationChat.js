/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../lib/data/Firebase';

import DaoLocation from '../../lib/daos/DaoLocation';
import Chat from '../../comp/chat/Chat';



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

export default class LocationChat extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._getFirebaseMessages = this._getFirebaseMessages.bind(this);
  }

  _getLocation() { return this.props.location }
  _getUser() { return this.props.user }
  _getChatId() { return DaoLocation.gId(this._getLocation()); }

  _getFirebaseMessages() {
    return firebase.database()
        .ref('locations')
        .child(this._getChatId())
        .child('messages');
  }

  render() {
    return (
        <Chat
            chatId={DaoLocation.gId(this._getLocation()).toString()}
            user={this._getUser()}
            getFirebaseMessages={this._getFirebaseMessages}
        />
    );
  }

}

LocationChat.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};