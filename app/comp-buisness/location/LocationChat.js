/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import firebase, {FirebaseData} from '../../lib/data/Firebase';

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

LocationChat.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};