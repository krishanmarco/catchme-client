/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoUser from '../../lib/daos/DaoUser';
import PropTypes from 'prop-types';
import React from 'react';
import {Icons} from '../../Config';
import {ListItemWithActions} from "../../comp/Misc";
// todo proptypes


export class ListItemUser extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._defaultOnPress = this._defaultOnPress.bind(this);
  }

  _getUser() {
    return this.props.user;
  }


  _defaultOnPress() {
    if (this.props.onPress)
      this.props.onPress(this._getUser());

    // Add more on-press actions here
  }


  render() {
    return (
        <ListItemWithActions
            header={DaoUser.gName(this._getUser())}
            content={DaoUser.gPublicMessage(this._getUser())}
            avatarUri={DaoUser.gPictureUrl(this._getUser())}
            actions={this.props.actions}
            image={this.props.image}
            onPress={this._defaultOnPress}/>
    );
  }

}

ListItemUser.defaultProps = {};

ListItemUser.propTypes = {
  user: PropTypes.object.isRequired
};




export const ListItemUserRequestSend = ({user, onPress}) => (
    <ListItemUser
        user={user}
        onPress={onPress}
        actions={[{
          icon: Icons.userFollow,
          onPress: () => ApiClient.userConnectionsAddUid(DaoUser.gId(user))
        }]}/>
);


export const ListItemUserRequestReceived = ({user, onPress}) => (
    <ListItemUser
        user={user}
        onPress={onPress}
        actions={[{
          icon: Icons.userFollow,
          onPress: () => ApiClient.userConnectionsAcceptUid(DaoUser.gId(user))
        }, {
          icon: Icons.userBlock,
          onPress: () => ApiClient.userConnectionsBlockUid(DaoUser.gId(user))
        }]}/>
);
