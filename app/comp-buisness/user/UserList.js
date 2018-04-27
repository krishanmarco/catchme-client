/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../../lib/daos/DaoUser';
import ListItemUser from '../../comp-buisness/user/UserListItems';
import React from 'react';
import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';
import {CACHE_ID_USER_PROFILE, TCacheUserProfile} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {poolConnect} from "../../redux/ReduxPool";
import type {ListItemUserProps} from "./UserListItems";
import type {TUser} from "../../lib/daos/DaoUser";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	users: Array<TUser>,
	onItemPress: (TUser) => void,

	allowAcceptFriend?: boolean,
	allowRemoveFriend?: boolean,
	allowRequestFriend?: boolean,
	allowUnblockUser?: boolean,

	friendIds?: Array<number>,
	requestIds?: Array<number>,
	blockedIds?: Array<number>
};

const defaultProps = {
	allowAcceptFriend: false,
	allowRemoveFriend: false,
	allowRequestFriend: false,
	allowUnblockUser: false,
};

// UserList *********************************************************************************************
// UserList *********************************************************************************************

class _UserList extends React.PureComponent<void, Props, void> {
	static defaultProps = defaultProps;

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

	_cacheUserProfile(): TCacheUserProfile {
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
		const {users, ...searchableFlatListProps} = this.props;
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
		const {allowAcceptFriend, allowRemoveFriend, allowRequestFriend, allowUnblockUser, onItemPress} = this.props;

		const listItemProps: ListItemUserProps = {
			user: item,
			onPress: onItemPress
		};

		const addToFriends = this._cacheUserProfile().addToFriends;
		const removeFromFriends = this._cacheUserProfile().removeFromFriends;
		const blockUser = this._cacheUserProfile().blockUser;

		const isSameUser = DaoUser.gId(this._cacheUserProfile().data) == DaoUser.gId(item);
		const showAccept = allowAcceptFriend && this._getRequestIds().includes(DaoUser.gId(item));
		const showUnblock = allowUnblockUser && this._getBlockedIds().includes(DaoUser.gId(item));
		const showRequest = allowRequestFriend && !this._getFriendIds().includes(DaoUser.gId(item));
		const showRemove = allowRemoveFriend && this._getFriendIds().includes(DaoUser.gId(item));

		if (!isSameUser) {
			if (showAccept) {
				listItemProps.onUserConnectionBlockUid = blockUser;
				listItemProps.onUserConnectionAddUid = addToFriends;

			} else if (showUnblock || showRequest) {
				listItemProps.onUserConnectionAddUid = addToFriends;

			} else if (showRemove) {
				listItemProps.onUserConnectionBlockUid = removeFromFriends;
			}
		}

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
