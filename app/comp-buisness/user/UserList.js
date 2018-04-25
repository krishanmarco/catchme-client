/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from "../../lib/data/ApiClient";
import DaoUser from '../../lib/daos/DaoUser';
import Logger from "../../lib/Logger";
import React from 'react';
import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {
	ListItemUser,
	ListItemUserRequestReceived,
	ListItemUserRequestSend
} from '../../comp-buisness/user/UserListItems';
import {poolConnect} from "../../redux/ReduxPool";
import type {ListItemUserProps} from "./UserListItems";
import type {TCachePool} from "../../lib/redux-pool/cache/CachePool";
import type {TUser} from "../../lib/daos/DaoUser";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	users: Array<TUser>,
	onItemPress: (TUser) => void,

	allowAcceptFriend?: boolean,
	allowUnblockUser?: boolean,
	allowRequestFriend?: boolean,

	friendIds?: Array<number>,
	requestIds?: Array<number>,
	blockedIds?: Array<number>
};

const defaultProps = {
	allowAcceptFriend: false,
	allowUnblockUser: false,
	allowRequestFriend: false,
};

// UserList *********************************************************************************************
// UserList *********************************************************************************************

class _UserList extends React.PureComponent<void, Props, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._onUserConnectionAddUid = this._onUserConnectionAddUid.bind(this);
		this._onUserConnectionBlockUid = this._onUserConnectionBlockUid.bind(this);
		this._filterExtractor = this._filterExtractor.bind(this);
		this._renderItem = this._renderItem.bind(this);
	}

	_onUserConnectionAddUid(user: TUser) {
		const userProfile = this._cacheUserProfile().data;
		if (userProfile == null)
			return;

		const uid = DaoUser.gId(user);
		ApiClient.userConnectionsAddUid(uid)
			.then(success => {
				DaoUser.addUserToConnectionFriends(userProfile, user);
				this.forceUpdate();
			})
			.catch(error => {
				Logger.v("UserList _onUserConnectionAddUid addUid failed", uid, error);
			});
	}

	_onUserConnectionBlockUid(user: TUser) {
		const userProfile = this._cacheUserProfile().data;
		if (userProfile == null)
			return;

		const uid = DaoUser.gId(user);
		ApiClient.userConnectionsBlockUid(uid)
			.then(success => {
				DaoUser.addUserToConnectionBlocked(userProfile, user);
				this.forceUpdate();
			})
			.catch(error => {
				Logger.v("UserList _onUserConnectionBlockUid blockUid failed", uid, error);
			});
	}

	_filterExtractor(user: TUser, regExp) {
		return regExp.test(DaoUser.gName(user))
			|| regExp.test(DaoUser.gEmail(user))
			|| regExp.test(DaoUser.gPhone(user));
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_getRequestIds() {
		const userProfile = this._cacheUserProfile().data;
		return userProfile != null
			? DaoUser.gConnectionRequestIds(userProfile)
			: [];
	}

	_getBlockedIds() {
		const userProfile = this._cacheUserProfile().data;
		return userProfile != null
			? DaoUser.gConnectionBlockedIds(userProfile)
			: [];
	}

	_getFriendIds() {
		const userProfile = this._cacheUserProfile().data;
		return userProfile != null
			? DaoUser.gConnectionFriendIds(userProfile)
			: [];
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
		const {allowAcceptFriend, allowUnblockUser, allowRequestFriend, onItemPress} = this.props;
		const listItemProps: ListItemUserProps = {user: item, onPress: onItemPress};

		
		if (allowAcceptFriend && this._getRequestIds().includes(DaoUser.gId(item)))
			return (
				<ListItemUserRequestReceived
					{...listItemProps}
					onUserConnectionBlockUid={this._onUserConnectionBlockUid}
					onUserConnectionAddUid={this._onUserConnectionAddUid}/>
			);


		if (allowUnblockUser && this._getBlockedIds().includes(DaoUser.gId(item)))
			return (
				<ListItemUserRequestSend
					{...listItemProps}
					onUserConnectionAddUid={this._onUserConnectionAddUid}/>
			);


		if (allowRequestFriend && !this._getFriendIds().includes(DaoUser.gId(item)))
			return (
				<ListItemUserRequestSend
					{...listItemProps}
					onUserConnectionAddUid={this._onUserConnectionAddUid}/>
			);


		return <ListItemUser {...listItemProps}/>;
	}

}

const UserList = poolConnect(_UserList,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default UserList;
