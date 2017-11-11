/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors} from '../../Config';

import ApiClient from '../../lib/data/ApiClient';

import DaoUser from '../../lib/daos/DaoUser';

import ListItemWithAction from '../../comp/misc/ListItemsWithActions';



export class ListItemUser extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._defaultOnPress = this._defaultOnPress.bind(this);
  }

  _getUser() { return this.props.user; }


  _defaultOnPress() {
    if (this.props.onPress) {
      this.props.onPress(this._getUser());
      return;
    }

  }


  render() {
    return (
        <ListItemWithAction
            header={DaoUser.gName(this._getUser())}
            content={DaoUser.gPublicMessage(this._getUser())}
            avatar={DaoUser.gPictureUrl(this._getUser())}
            actions={this.props.actions}
            image={this.props.image}
            onPress={this._defaultOnPress}/>
    );
  }

}

ListItemUser.defaultProps = {

};

ListItemUser.propTypes = {
  user: PropTypes.object.isRequired
};




export const ListItemUserRequestSend = ({user, onPress}) => (
    <ListItemUser
        user={user}
        onPress={onPress}
        actions={[{
          nameType: Icons.friendRequestAccept,
          color: Colors.primary,
          onPress: () => ApiClient.userConnectionsAddUid(DaoUser.gId(user))
        }]}/>
);


export const ListItemUserRequestReceived = ({user, onPress}) => (
    <ListItemUser
        user={user}
        onPress={onPress}
        actions={[{
          nameType: Icons.friendRequestAccept,
          color: Colors.primary,
          onPress: () => ApiClient.userConnectionsAcceptUid(DaoUser.gId(user))
        }, {
          nameType: Icons.friendRequestAccept,
          color: Colors.secondary,
          onPress: () => ApiClient.userConnectionsBlockUid(DaoUser.gId(user))
        }]}/>
);
