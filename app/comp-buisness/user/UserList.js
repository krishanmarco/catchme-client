/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from '../../lib/daos/DaoUser';
import ListItemUser from '../../comp-buisness/user/UserListItems';
import React from 'react';
import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';
import {CACHE_ID_USER_PROFILE, TCacheUserProfile} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {poolConnect} from '../../redux/ReduxPool';
import {t} from '../../lib/i18n/Translations';
import type {ListItemUserProps} from './UserListItems';
import type {TUser} from '../../lib/daos/DaoUser';


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	users: Array<TUser>,
	onUserPress: (TUser) => void,

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

	componentWillMount() {
		this._cacheUserProfile().initialize();
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
		return DaoUser.gConnectionRequestIds(this._cacheUserProfile().data);
	}

	_getBlockedIds() {
		return DaoUser.gConnectionBlockedIds(this._cacheUserProfile().data);
	}

	_getFriendIds() {
		return DaoUser.gConnectionFriendIds(this._cacheUserProfile().data);
	}

	_getPendingIds() {
		return DaoUser.gConnectionPendingIds(this._cacheUserProfile().data);
	}


	render() {
		const {users, ...searchableFlatListProps} = this.props;
		return (
			<SearchableFlatList
				{...searchableFlatListProps}

				data={users}
				keyExtractor={DaoUser.gIdStr}
				renderItem={this._renderItem}

				searchPlaceholder={t('t_search_user')}
				filterExtractor={this._filterExtractor}
			/>

		);
	}


	_renderItem({item}: { item: TUser }) {
		const {allowAcceptFriend, allowRemoveFriend, allowRequestFriend, allowUnblockUser, onUserPress} = this.props;

		const listItemProps: ListItemUserProps = {
			user: item,
			onPress: onUserPress
		};

		const addUserToFriends = this._cacheUserProfile().addUserToFriends;
		const removeUserFromFriends = this._cacheUserProfile().removeUserFromFriends;
		const blockUser = this._cacheUserProfile().blockUser;
		const acceptUserFriendship = this._cacheUserProfile().acceptUserFriendship;

		const uid = DaoUser.gId(item);
		const isSameUser = DaoUser.gId(this._cacheUserProfile().data) == uid;
		const showAccept = allowAcceptFriend && this._getRequestIds().includes(uid);
		const showUnblock = allowUnblockUser && this._getBlockedIds().includes(uid);
		const showRemove = allowRemoveFriend && this._getFriendIds().includes(uid);
		const showRequest = allowRequestFriend
			&& !this._getFriendIds().includes(uid)
			&& !this._getPendingIds().includes(uid);

		if (!isSameUser) {
			if (showAccept) {
				listItemProps.onUserConnectionBlockUid = blockUser;
				listItemProps.onUserConnectionAddUid = acceptUserFriendship;

			} else if (showUnblock || showRequest) {
				listItemProps.onUserConnectionAddUid = addUserToFriends;

			} else if (showRemove) {
				listItemProps.onUserConnectionBlockUid = removeUserFromFriends;
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
