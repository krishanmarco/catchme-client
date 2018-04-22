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


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	users: Array<TUser>,
	onItemPress: (TUser) => void,
	friendIds?: Array<number>,
	requestIds?: Array<number>,
	blockedIds?: Array<number>
};


// UserList *********************************************************************************************
// UserList *********************************************************************************************

export default class UserList extends React.PureComponent<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._filterExtractor = this._filterExtractor.bind(this);
		this._renderItem = this._renderItem.bind(this);
	}

	_filterExtractor(user: TUser, regExp) {
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
				keyExtractor={DaoUser.gIdStr}
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
