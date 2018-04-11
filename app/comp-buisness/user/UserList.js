/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../../lib/daos/DaoUser';
import PropTypes from 'prop-types';
import React from 'react';
import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';
import {
	ListItemUser,
	ListItemUserRequestReceived,
	ListItemUserRequestSend
} from '../../comp-buisness/user/UserListItems';
import type {ListItemUserProps} from "./UserListItems";
import type {TUser} from "../../lib/daos/DaoUser";
// todo refactor proptypes



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


	_renderItem({item}: { item: TUser }) {
		let {friendIds, requestIds, blockedIds, onItemPress} = this.props;
		let listItemProps: ListItemUserProps = {user: item, onPress: onItemPress};

		if (requestIds && requestIds.includes(DaoUser.gId(item)))
			return <ListItemUserRequestReceived {...listItemProps}/>;

		if (blockedIds && blockedIds.includes(DaoUser.gId(item)))
			return <ListItemUserRequestSend {...listItemProps}/>;

		if (friendIds && !friendIds.includes(DaoUser.gId(item)))
			return <ListItemUserRequestSend {...listItemProps}/>;

		return <ListItemUser {...listItemProps}/>;
	}


}


UserList.defaultProps = {};

UserList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object).isRequired,
	friendIds: PropTypes.array,
	requestIds: PropTypes.array,
	blockedIds: PropTypes.array,
	onItemPress: PropTypes.func
};

