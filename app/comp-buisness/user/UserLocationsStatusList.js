/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from "../../lib/data/ApiClient";
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from "../../lib/daos/DaoUser";
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import Logger from "../../lib/Logger";
import React from 'react';
import Router from "../../lib/navigation/Router";
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import ULSListManager, {TLocationWithULS, TULSListState} from '../../lib/helpers/ULSListManager';
import {CACHE_ID_USER_PROFILE, TCacheUserProfile} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {ListItemLocationFollow, ListItemUserLocationStatus} from '../location/LocationListItems';
import {poolConnect} from "../../redux/ReduxPool";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";

// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator,
	allowEdit: boolean,
	userProfile: TUser,
	onLocationPress: (TLocation) => void,
	allowFollow: boolean,
	allowUnfollow: boolean
};

type State = TULSListState;


// UserLocationsStatusList ******************************************************************************
// UserLocationsStatusList ******************************************************************************

class _UserLocationsStatusList extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);
		this._onUserLocationStatusDeletePress = this._onUserLocationStatusDeletePress.bind(this);
		this._onUserLocationStatusEditPress = this._onUserLocationStatusEditPress.bind(this);
		this._onStatusEditConfirm = this._onStatusEditConfirm.bind(this);

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

	_onUserLocationStatusDeletePress(status: TUserLocationStatus) {
		const statusIdToDelete = DaoUserLocationStatus.gId(status);

		// Delete the status from the list so the UI updated immediately
		// If the request fails the UI will not be aligned anymore
		this.setState(ULSListManager.deleteAndGetState(this.state, status));

		ApiClient.userStatusDel(statusIdToDelete)
			.catch(error => {
				const id = DaoUserLocationStatus.gId(status);
				Logger.v(`UserLocationStatusList _onPressLocationStatusDelete ws failed to delete ${id}`, error);
			});
	}

	_onUserLocationStatusEditPress(status: TUserLocationStatus, location: TLocation) {
		const {navigator} = this.props;
		Router.toModalUserLocationStatus(
			navigator,
			{
				locationId: DaoLocation.gId(location),
				initialStatus: {...status},
				onStatusConfirm: this._onStatusEditConfirm
			},
			DaoLocation.gName(location)
		);
	}

	_onStatusEditConfirm(userLocationStatus: TUserLocationStatus) {
		this.setState(ULSListManager.editAndGetState(this.state, userLocationStatus));
	}


	_getSections() {
		const {now, future, top} = this.state;
		return [
			{title: 'NOW', data: now},
			{title: 'LATER ON', data: future},
			{title: 'TOP 5 PLACES', data: top}
		].filter(section => section.data.length > 0);
	}


	render() {
		return (
			<StaticSectionList
				sections={this._getSections()}
				renderItem={this._renderItem}/>
		);
	}


	_renderItem({item}: { item: TLocationWithULS }) {
		const {allowFollow, allowUnfollow, onLocationPress, allowEdit} = this.props;

		const listItemProps = {
			location: item,
			onPress: onLocationPress
		};

		const userLocationStatus = ULSListManager.gStatus(item);

		if (userLocationStatus) {
			listItemProps.editUserLocationStatus = this._onUserLocationStatusEditPress;
			listItemProps.removeUserLocationStatus = this._onUserLocationStatusDeletePress;
			listItemProps.allowEdit = allowEdit;
			listItemProps.userLocationStatus = userLocationStatus;
			return (<ListItemUserLocationStatus {...listItemProps} />);
		}


		const addLocationToFavorites = this._cacheUserProfile().addLocationToFavorites;
		const removeLocationFromFavorites = this._cacheUserProfile().removeLocationFromFavorites;

		const showFollow = allowFollow && !this._getFavoriteIds().includes(DaoLocation.gId(item));
		const showUnfollow = allowUnfollow && this._getFavoriteIds().includes(DaoLocation.gId(item));

		if (showFollow) {
			listItemProps.addLocationToFavorites = addLocationToFavorites;
		}

		if (showUnfollow) {
			listItemProps.removeLocationFromFavorites = removeLocationFromFavorites;
		}

		return <ListItemLocationFollow {...listItemProps}/>;
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
