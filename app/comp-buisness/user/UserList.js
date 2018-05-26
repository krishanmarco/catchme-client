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

	showAccept?: boolean,
	showRemove?: boolean,
	showAdd?: boolean,
	showUnblock?: boolean,
	showPending?: boolean,

	friendIds?: Array<number>,
	requestIds?: Array<number>,
	blockedIds?: Array<number>
};

const defaultProps = {
	showAccept: false,
	showRemove: false,
	showAdd: false,
	showUnblock: false,
	showPending: false,
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
		const {showPending, showAccept, showRemove, showAdd, showUnblock, onUserPress} = this.props;

		const listItemProps: ListItemUserProps = {
			user: item,
			onPress: onUserPress
		};

		const uid = DaoUser.gId(item);
		const isSameUser = DaoUser.gId(this._cacheUserProfile().data) == uid;
		if (isSameUser)
			return <ListItemUser {...listItemProps}/>;

		const connAdd = this._cacheUserProfile().connAdd;
		const connRemove = this._cacheUserProfile().connRemove;
		const connBlock = this._cacheUserProfile().connBlock;
		const connAccept = this._cacheUserProfile().connAccept;
		const connCancel = this._cacheUserProfile().connCancel;
		const requestIds = this._getRequestIds();
		const blockedIds = this._getBlockedIds();
		const friendIds = this._getFriendIds();
		const pendingIds = this._getPendingIds();
		const sAccept = showAccept && requestIds.includes(uid);
		const sUnblock = showUnblock && blockedIds.includes(uid);
		const sRemove = showRemove && friendIds.includes(uid);
		const sPending = showPending && pendingIds.includes(uid);
		const sRequest = showAdd && !friendIds.includes(uid) && !pendingIds.includes(uid);

		if (sAccept) {
			listItemProps.onUserConnectionBlockUid = connBlock;
			listItemProps.onUserConnectionAddUid = connAccept;

		} else if (sUnblock || sRequest) {
			listItemProps.onUserConnectionAddUid = connAdd;

		} else if (sRemove) {
			listItemProps.onUserConnectionBlockUid = connRemove;

		} else if (sPending) {
			listItemProps.onUserConnectionPendingUid = connCancel;
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
