/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import ApiClient from '../../lib/data/ApiClient';

import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from "../../lib/daos/DaoUser";

import LocationList from '../../comp-buisness/location/LocationList';
import PropTypes from 'prop-types';
import React from 'react';

import Router from '../../lib/helpers/Router';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import UserList from '../../comp-buisness/user/UserList';
import {Colors} from "../../Config";


import {poolConnect} from '../../redux/ReduxPool';
import {StyleSheet, View} from 'react-native';
// todo refactor proptypes


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const listTypeUsers = 'users';
const listTypeLocations = 'locations';

const SearchActionConfig = {
	[listTypeUsers]: {
		name: listTypeUsers,
		suggestApiCall: (seed) => ApiClient.suggestSeedUsers(seed),
		searchApiCall: (query) => ApiClient.searchQueryUsers(query),
		uniqueFilter: DaoUser.gId
	},
	[listTypeLocations]: {
		name: listTypeLocations,
		suggestApiCall: (seed) => ApiClient.suggestSeedLocations(seed),
		searchApiCall: (query) => ApiClient.searchQueryLocations(query),
		uniqueFilter: DaoLocation.gId
	},
};


const SearchReducerSection = {
	loading: false,
	stopSuggestLoop: false,
	searchQuery: '',
	suggestSeed: 0,
	list: [],
	searchList: [],
	suggestList: [],
};

const searchInitState = {
	[listTypeUsers]: Object.assign(SearchReducerSection),
	[listTypeLocations]: Object.assign(SearchReducerSection)
};

const ACTION_CONCAT_SUGGEST_LIST = 'ACTION_CONCAT_SUGGEST_LIST';
const ACTION_SET_SEARCH_QUERY = 'ACTION_SET_SEARCH_QUERY';
const ACTION_SET_SEARCH_LIST = 'ACTION_SET_SEARCH_LIST';
const ACTION_SET_LOADING = 'ACTION_SET_LOADING';

export function searchReducer(state = searchInitState, action) {
	switch (action.type) {

		case ACTION_CONCAT_SUGGEST_LIST:
			const oldState1 = state[action.listType];
			const listTypeConfig1 = SearchActionConfig[action.listType];

			// The suggestSeed should be incremented
			const suggestSeed = oldState1.suggestSeed + 1;

			// Stop the suggesting loop if no new data was received
			const stopSuggestLoop = oldState1.suggestList.length === action.suggestList.length;

			// The new suggest list is the old suggestList + the new received data
			const suggestList = _.uniqBy(oldState1.suggestList.concat(action.suggestList), listTypeConfig1.uniqueFilter);

			// The new display list is the old searchList + the new suggestList
			const list = _.uniqBy(oldState1.searchList.concat(suggestList), listTypeConfig1.uniqueFilter);

			return Object.assign({}, state, {
				[action.listType]: Object.assign({}, oldState1, {
					loading: false,
					suggestSeed,
					stopSuggestLoop,
					suggestList,
					list
				})
			});

		case ACTION_SET_SEARCH_LIST:
			const oldState2 = state[action.listType];
			const listTypeConfig2 = SearchActionConfig[action.listType];

			// The new search list is only what was returned as new data
			const searchList = _.uniqBy(action.searchList, listTypeConfig2.uniqueFilter);

			// The new display list is the new searchList + the old suggestList
			const list2 = _.uniqBy(searchList.concat(oldState2.suggestList), listTypeConfig2.uniqueFilter);

			return Object.assign({}, state, {
				[action.listType]: Object.assign({}, oldState2, {
					loading: false,
					searchList,
					list: list2
				})
			});

		case ACTION_SET_SEARCH_QUERY:
			return Object.assign({}, state, {
				[action.listType]: Object.assign({}, state[action.listType], {
					searchQuery: action.searchQuery
				})
			});

		case ACTION_SET_LOADING:
			return Object.assign({}, state, {
				[action.listType]: Object.assign({}, state[action.listType], {
					loading: true
				})
			});
	}

	return state;
}

function searchSuggest(listType: string) {
	return (dispatch, getState) => {
		const actionConfig = SearchActionConfig[listType];
		const currentState = getState().searchReducer[listType];

		if (currentState.loading)
			return;

		dispatch({
			type: ACTION_SET_LOADING,
			listType
		});

		// Run the suggestion api call
		actionConfig.suggestApiCall(currentState.suggestSeed)
			.then(items => dispatch({
				type: ACTION_CONCAT_SUGGEST_LIST,
				listType,
				suggestList: items,
			}));
	};
}

function searchSearch(listType: string) {
	return (dispatch, getState) => {
		const actionConfig = SearchActionConfig[listType];
		const currentState = getState().searchReducer[listType];
		const query = currentState.searchQuery;

		if (!query || query.length <= 0)
			return;

		// Always search, even if something is already fetching
		dispatch({
			type: ACTION_SET_LOADING,
			listType
		});

		// Run the search api call
		actionConfig.searchApiCall(query)
			.then(items => dispatch({
				type: ACTION_SET_SEARCH_LIST,
				listType,
				searchList: items
			}));
	};
}

function searchSetSearchQuery(listType: string, query) {
	return {
		type: ACTION_SET_SEARCH_QUERY,
		listType,
		searchQuery: query
	};
}


// _Search **********************************************************************************************
// _Search **********************************************************************************************

class _Search extends React.Component {

	constructor(props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onUserPress = this._onUserPress.bind(this);
		this._locationsOnEndReached = this._locationsOnEndReached.bind(this);
		this._usersOnEndReached = this._usersOnEndReached.bind(this);
	}


	componentWillMount() {
		this.props.suggestLocations();
		this.props.suggestUsers();
	}

	_locationsState() {
		return this.props[listTypeLocations];
	}

	_usersState() {
		return this.props[listTypeUsers];
	}


	_userProfile() {
		return this.props.userProfile;
	}

	_onLocationPress(location) {
		Router.toLocationProfile(this.props.navigator, location);
	}

	_onUserPress(user) {
		Router.toUserProfile(this.props.navigator, user);
	}

	_locationsOnEndReached() {
		if (this._locationsState().stopSuggestLoop)
			return;

		// Suggest new locations
		this.props.suggestLocations();
	}

	_usersOnEndReached() {
		if (this._usersState().stopSuggestLoop)
			return;

		// Suggest new users
		this.props.suggestUsers();
	}


	render() {
		return (
			<ScrollableTabView
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
		const userProfile = this._userProfile();
		const {list, loading} = this._locationsState();
		return (
			<LocationList
				locations={list}
				favoriteIds={DaoUser.gLocationsFavoriteIds(userProfile)}

				onItemPress={this._onLocationPress}
				onSearchPressed={this.props.searchLocations}
				onSearchChanged={this.props.setLocationsSearchQuery}
				autoFilter={true}

				loading={loading}
				onEndReached={this._locationsOnEndReached}/>
		);
	}

	_renderTabSearchUsers() {
		const userProfile = this._userProfile();
		const {list, loading} = this._usersState();
		return (
			<UserList
				users={list}
				friendIds={DaoUser.gConnectionFriendIds(userProfile)}
				requestIds={DaoUser.gConnectionRequestIds(userProfile)}
				blockedIds={DaoUser.gConnectionBlockedIds(userProfile)}

				onItemPress={this._onUserPress}
				onSearchPressed={this.props.searchUsers}
				onSearchChanged={this.props.setUsersSearchQuery}
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
	(state) => state.searchReducer,

	// mapDispatchToProps
	(dispatch) => ({
		suggestUsers: () => dispatch(searchSuggest(listTypeUsers)),
		suggestLocations: () => dispatch(searchSuggest(listTypeLocations)),

		searchUsers: () => dispatch(searchSearch(listTypeUsers)),
		searchLocations: () => dispatch(searchSearch(listTypeLocations)),

		setUsersSearchQuery: (query) => dispatch(searchSetSearchQuery(listTypeUsers, query)),
		setLocationsSearchQuery: (query) => dispatch(searchSetSearchQuery(listTypeLocations, query)),
	}),

	// Array of pools to subscribe to
	[]
);


export default Search;

// Style ************************************************************************************************
// Style ************************************************************************************************

Search.propTypes = {
	userProfile: PropTypes.object.isRequired,
	navigator: PropTypes.object.isRequired,
};

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
});