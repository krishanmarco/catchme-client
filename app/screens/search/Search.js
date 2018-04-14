/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import LocationList from '../../comp-buisness/location/LocationList';
import React from 'react';
import Router from '../../lib/navigation/Router';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import UserList from '../../comp-buisness/user/UserList';
import {Colors} from "../../Config";
import {poolConnect} from '../../redux/ReduxPool';
import {SEARCH_DATA_ID_LOCATIONS} from "../../lib/redux-pool/search-data/def/SearchDataDefLocations";
import {SEARCH_DATA_ID_USERS} from "../../lib/redux-pool/search-data/def/SearchDataDefUsers";
import {StyleSheet, View} from 'react-native';
import {TSearchData} from "../../lib/redux-pool/search-data/SearchDataPool";
import type {TNavigator} from "../../lib/types/Types";
import type {TUser} from "../../lib/daos/DaoUser";
import DaoLocation from "../../lib/daos/DaoLocation";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator,
	userProfile: TUser
};


// _Search **********************************************************************************************
// _Search **********************************************************************************************

class _Search extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onUserPress = this._onUserPress.bind(this);
		this._locationsOnEndReached = this._locationsOnEndReached.bind(this);
		this._usersOnEndReached = this._usersOnEndReached.bind(this);
	}

	componentWillMount() {
		this._searchDataUsers().suggest();
		this._searchDataLocations().suggest();
	}

	_searchDataUsers(): TSearchData {
		return this.props[SEARCH_DATA_ID_USERS];
	}

	_searchDataLocations(): TSearchData {
		return this.props[SEARCH_DATA_ID_LOCATIONS];
	}

	_onLocationPress(location) {
		const {navigator} = this.props;
		Router.toModalLocationProfile(
			navigator,
			{locationId: DaoLocation.gId(location)},
			DaoLocation.gName(location)
		);
	}

	_onUserPress(user: TUser) {
		const {navigator} = this.props;
		Router.toModalUserProfile(
			navigator,
			{userId: DaoUser.gId(user)},
			DaoUser.gName(user)
		);
	}

	_locationsOnEndReached() {
		if (this._searchDataLocations().stopSuggestLoop)
			return;

		// Suggest new locations
		this._searchDataLocations().suggest();
	}

	_usersOnEndReached() {
		if (this._searchDataUsers().stopSuggestLoop)
			return;

		// Suggest new users
		this._searchDataUsers().suggest();
	}


	render() {
		return (
			<ScrollableTabView
				tabBarUnderlineStyle={styles.tabBarUnderline}
				scrollWithoutAnimation={true}
				prerenderingSiblingsNumber={Infinity}
				tabBarTextStyle={styles.tabBarTextStyle}
				tabBarActiveTextColor={Colors.primary}
				tabBarInactiveTextColor={Colors.black}>
				<View
					tabLabel='Locations'
					style={styles.tabRootUsers}>
					{this._renderTabSearchLocations()}
				</View>
				<View
					tabLabel='People'
					style={styles.tabRootLocations}>
					{this._renderTabSearchUsers()}
				</View>
			</ScrollableTabView>
		);
	}



	_renderTabSearchLocations() {
		const {userProfile} = this.props;
		const {list, loading} = this._searchDataLocations();
		return (
			<LocationList
				locations={list}
				favoriteIds={DaoUser.gLocationsFavoriteIds(userProfile)}

				onItemPress={this._onLocationPress}
				onSearchPressed={this._searchDataLocations().search}
				onSearchChanged={this._searchDataLocations().setSearchQuery}
				autoFilter={true}

				loading={loading}
				onEndReached={this._locationsOnEndReached}/>
		);
	}

	_renderTabSearchUsers() {
		const {userProfile} = this.props;
		const {list, loading} = this._searchDataUsers();
		return (
			<UserList
				users={list}
				friendIds={DaoUser.gConnectionFriendIds(userProfile)}
				requestIds={DaoUser.gConnectionRequestIds(userProfile)}
				blockedIds={DaoUser.gConnectionBlockedIds(userProfile)}
				onItemPress={this._onUserPress}
				onSearchPressed={this._searchDataUsers().search}
				onSearchChanged={this._searchDataUsers().setSearchQuery}
				autoFilter={true}
				loading={loading}
				onEndReached={this._usersOnEndReached}/>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const Search = poolConnect(_Search,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[SEARCH_DATA_ID_USERS, SEARCH_DATA_ID_LOCATIONS]
);
export default Search;


// Config ************************************************************************************************
// Config ************************************************************************************************

const styles = StyleSheet.create({
	tabBarTextStyle: {
		marginBottom: -8
	},
	tabRootUsers: {
		flex: 1,
		paddingTop: 8
	},
	tabRootLocations: {
		flex: 1,
		paddingTop: 8
	},
	tabBarUnderline: {
		backgroundColor: Colors.primary
	}
});