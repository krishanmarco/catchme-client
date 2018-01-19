/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import DaoUser from '../../lib/daos/DaoUser';

import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';

import {
  ListItemUser,
  ListItemUserRequestSend,
  ListItemUserRequestReceived
} from '../../comp-buisness/user/UserListItems';




export default class UserList extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this._filterExtractor = this._filterExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }


  _filterExtractor(user, regExp) {
    return regExp.test(DaoUser.gName(user))
        || regExp.test(DaoUser.gEmail(user))
        || regExp.test(DaoUser.gPhone(user));
  }


  render() {
    let {users, ...searchableFlatListProps} = this.props;

    return (
        <SearchableFlatList
            {...searchableFlatListProps}

            data={users}
            keyExtractor={DaoUser.gId}
            renderItem={this._renderItem}

            searchPlaceholder='Search by name, email or number'
            filterExtractor={this._filterExtractor}
        />

    );
  }


  _renderItem({item: user}) {
    let {friendIds, requestIds, blockedIds, onItemPress} = this.props;
    let listItemProps = {user: user, onPress: onItemPress};

    if (requestIds && requestIds.includes(DaoUser.gId(user)))
      return <ListItemUserRequestReceived {...listItemProps}/>;

    if (blockedIds && blockedIds.includes(DaoUser.gId(user)))
      return <ListItemUserRequestSend {...listItemProps}/>;

    if (friendIds && !friendIds.includes(DaoUser.gId(user)))
      return <ListItemUserRequestSend {...listItemProps}/>;

    return <ListItemUser {...listItemProps}/>;
  }


}


UserList.defaultProps = {

};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  friendIds: PropTypes.array,
  requestIds: PropTypes.array,
  blockedIds: PropTypes.array,
  onItemPress: PropTypes.func
};

