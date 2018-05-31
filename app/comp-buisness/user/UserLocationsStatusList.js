/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from '../../lib/daos/DaoUser';
import React from 'react';
import Router from '../../lib/navigation/Router';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import ULSListManager, {TLocationWithULS, TULSListState} from '../../lib/helpers/ULSListManager';
import {CACHE_ID_USER_PROFILE, TCacheUserProfile} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {FlatListEmpty} from '../../comp/Misc';
import {ListItemLocationFollow, ListItemUserLocationStatus} from '../location/LocationListItems';
import {poolConnect} from '../../redux/ReduxPool';
import {t} from '../../lib/i18n/Translations';
import type {TLocation} from '../../lib/daos/DaoLocation';
import type {TNavigator} from '../../lib/types/Types';
import type {TUser} from '../../lib/daos/DaoUser';

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator,
	allowEdit: boolean,
	userProfile: TUser,
	onLocationPress: (TLocation) => void,
	showFollow: boolean,
	showUnfollow: boolean
};

type State = TULSListState;


// UserLocationsStatusList ******************************************************************************
// UserLocationsStatusList ******************************************************************************

class _UserLocationsStatusList extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);
		this._onUserLocationStatusEditPress = this._onUserLocationStatusEditPress.bind(this);
		this._renderULSListEmpty = this._renderULSListEmpty.bind(this);

		const {userProfile} = props;
		this.state = ULSListManager.calculateState(userProfile);
	}

	componentWillMount() {
		this._cacheUserProfile().initialize();
	}

	componentWillReceiveProps(nextProps) {
		const {userProfile} = nextProps;
		this.setState(ULSListManager.calculateState(userProfile));
	}

	_cacheUserProfile(): TCacheUserProfile {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_getFavoriteIds() {
		return DaoUser.gLocationsFavoriteIds(this._cacheUserProfile().data);
	}

	_onUserLocationStatusEditPress(locationWithULS: TLocationWithULS) {
		const {navigator} = this.props;
		Router.toModalUserLocationStatus(
			navigator,
			{
				locationId: DaoLocation.gId(locationWithULS),
				initialStatus: {...DaoLocation.gUserLocationStatus(locationWithULS)}
			},
			DaoLocation.gName(locationWithULS)
		);
	}

	_getSections() {
		const {now, future, top} = this.state;
		return [
			{title: t('t_uls_now').toUpperCase(), data: now},
			{title: t('t_uls_later').toUpperCase(), data: future},
			{title: t('t_top_5_places').toUpperCase(), data: top}
		].filter(section => section.data.length > 0);
	}


	render() {
		return (
			<StaticSectionList
				sections={this._getSections()}
				renderItem={this._renderItem}
				ListEmptyComponent={this._renderULSListEmpty}/>
		);
	}

	_renderULSListEmpty() {
		return (
			<FlatListEmpty
				text={t('t_empty_uls')}
				image={require('../../assets/images/empty-cup.png')}/>
		);
	}

	_renderItem({item}: { item: TLocationWithULS|TLocation }) {
		const {showFollow, showUnfollow, onLocationPress} = this.props;

		if (DaoLocation.gUserLocationStatus(item))
			return this._renderUserLocationStatus(item);

		// This object is not a TLocationWithULD
		const listItemProps = {
			location: item,
			onPress: onLocationPress
		};

		const locationFavAdd = this._cacheUserProfile().locationFavAdd;
		const locationFavRemove = this._cacheUserProfile().locationFavRemove;

		const lid = DaoLocation.gId(item);
		const favoriteIds = this._getFavoriteIds();
		const sFollow = showFollow && !favoriteIds.includes(lid);
		const sUnfollow = showUnfollow && favoriteIds.includes(lid);

		if (sFollow) {
			listItemProps.onLocationFavAddPress = locationFavAdd;

		} else if (sUnfollow) {
			listItemProps.onLocationFavRemove = locationFavRemove;
		}

		return <ListItemLocationFollow {...listItemProps}/>;
	}

	_renderUserLocationStatus(location: TLocationWithULS) {
		const {onLocationPress, allowEdit} = this.props;
		return (
			<ListItemUserLocationStatus
				locationWithULS={location}
				allowEdit={allowEdit}
				onPress={onLocationPress}
				editUserLocationStatus={this._onUserLocationStatusEditPress}
				removeUserLocationStatus={this._cacheUserProfile().removeLocationWithULS}/>
		);
	}

}

const UserLocationsStatusList = poolConnect(_UserLocationsStatusList,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default UserLocationsStatusList;
