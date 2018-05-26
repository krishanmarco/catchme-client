/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from '../../lib/daos/DaoUser';
import LocationList from '../../comp-buisness/location/LocationList';
import React from 'react';
import Router from '../../lib/navigation/Router';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import UserList from '../../comp-buisness/user/UserList';
import {Colors} from '../../Config';
import {FlatListEmpty} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import {SEARCH_DATA_ID_LOCATIONS} from '../../lib/redux-pool/search-data/def/SearchDataDefLocations';
import {SEARCH_DATA_ID_USERS} from '../../lib/redux-pool/search-data/def/SearchDataDefUsers';
import {StyleSheet, View} from 'react-native';
import {t} from '../../lib/i18n/Translations';
import {TSearchDataPool} from '../../lib/redux-pool/search-data/SearchDataPool';
import type {TNavigator} from '../../lib/types/Types';
import type {TUser} from '../../lib/daos/DaoUser';


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator,
	userProfile: TUser,
	initialPage?: number
};

const defaultProps = {
	initialPage: 0
};

// This is different from the Const.defaultOnEndReachedThreshold
// because the search API request is slightly slower
const onEndReachedThreshold = 0.7;

// _Search **********************************************************************************************
// _Search **********************************************************************************************

class _Search extends React.Component<void, Props, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onUserPress = this._onUserPress.bind(this);
		this._locationsOnEndReached = this._locationsOnEndReached.bind(this);
		this._usersOnEndReached = this._usersOnEndReached.bind(this);
		this._renderListEmpty = this._renderListEmpty.bind(this);
	}

	componentWillMount() {
		this._searchDataUsers().suggest();
		this._searchDataLocations().suggest();
	}

	_searchDataUsers(): TSearchDataPool {
		return this.props[SEARCH_DATA_ID_USERS];
	}

	_searchDataLocations(): TSearchDataPool {
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
		const {initialPage} = this.props;
		return (
			<ScrollableTabView
				initialPage={initialPage}
				contentProps={scrollableTabViewContentProps}
				tabBarUnderlineStyle={styles.tabBarUnderline}
				scrollWithoutAnimation={true}
				prerenderingSiblingsNumber={Infinity}
				tabBarTextStyle={styles.tabBarTextStyle}
				tabBarActiveTextColor={Colors.primary}
				tabBarInactiveTextColor={Colors.black}>
				<View
					tabLabel={t('t_locations')}
					style={styles.tabUsers}>
					{this._renderTabSearchLocations()}
				</View>
				<View
					tabLabel={t('t_people')}
					style={styles.tabLocations}>
					{this._renderTabSearchUsers()}
				</View>
			</ScrollableTabView>
		);
	}



	_renderTabSearchLocations() {
		const {list, loading} = this._searchDataLocations();
		return (
			<LocationList
				locations={list}
				showFollow={true}
				showUnfollow={true}

				onLocationPress={this._onLocationPress}
				onSearchPressed={this._searchDataLocations().search}
				onSearchChanged={this._searchDataLocations().setSearchQuery}
				loading={loading}
				onEndReachedThreshold={onEndReachedThreshold}
				onEndReached={this._locationsOnEndReached}
				renderOnListEmpty={this._renderListEmpty}/>
		);
	}

	_renderTabSearchUsers() {
		const {list, loading} = this._searchDataUsers();
		return (
			<UserList
				users={list}
				showAccept={true}
				showUnblock={true}
				showAdd={true}
				showPending={true}

				loading={loading}
				onUserPress={this._onUserPress}
				onSearchPressed={this._searchDataUsers().search}
				onSearchChanged={this._searchDataUsers().setSearchQuery}
				onEndReached={this._usersOnEndReached}
				onEndReachedThreshold={onEndReachedThreshold}
				renderOnListEmpty={this._renderListEmpty}/>
		);
	}

	_renderListEmpty() {
		return (
			<FlatListEmpty
				text={t('t_empty_search')}
				image={require('../../assets/images/empty-search.png')}/>
		);
	}

}

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

// Bug fix for freezing tab view after back
// https://github.com/skv-headless/react-native-scrollable-tab-view/issues/839
// https://github.com/skv-headless/react-native-scrollable-tab-view/issues/839
// Can be removed on upgrade >> react-native 0.55.3
const scrollableTabViewContentProps = {
	style: {flex: 1}
};

const styles = StyleSheet.create({
	tabBarTextStyle: {
		marginBottom: -8
	},
	tabUsers: {
		flex: 1
	},
	tabLocations: {
		flex: 1
	},
	tabBarUnderline: {
		backgroundColor: Colors.primary
	}
});