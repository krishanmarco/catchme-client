/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import ApiClient from '../../lib/data/ApiClient';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';

import {StyleSheet, View} from 'react-native';

import UserList from '../../comp-buisness/user/UserList';
import LocationList from '../../comp-buisness/location/LocationList';
import ScrollableTabView from 'react-native-scrollable-tab-view';




import DaoUser from "../../lib/daos/DaoUser";

import Router from '../../lib/helpers/Router';
import {Colors} from "../../Config";



// Redux ************************************************************************************************
// Redux ************************************************************************************************

const listTypeUsers = 'users';
const listTypeLocations = 'locations';

const searchConfig = {
  [listTypeUsers]: {
    name: listTypeUsers,
    suggestApiCall: ApiClient.suggestSeedUsers,
    searchApiCall: ApiClient.searchQueryUsers,
    uniqueFilter: DaoUser.gId
  },
  [listTypeLocations]: {
    name: listTypeLocations,
    suggestApiCall: ApiClient.suggestSeedLocations,
    searchApiCall: ApiClient.searchQueryLocations,
    uniqueFilter: DaoLocation.gId
  },
};

function getTypeState(getState, listType) {
  return getState().searchReducer[listType];
}


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


function searchSuggest(listType: string) {
  return (dispatch, getState) => {
    const actionConfig = searchConfig[listType];
    const currentState = getTypeState(getState, listType);

    if (currentState.loading)
      return;

    dispatch({
      type: ACTION_SET_LOADING,
      listType: listType
    });

    // Run the suggestion api call
    return actionConfig.suggestApiCall(currentState.suggestSeed)
        .then(items => dispatch({
          type: ACTION_CONCAT_SUGGEST_LIST,
          listType: listType,
          suggestList: items,
        }));
  };
}

function searchSearch(listType: string) {
  return (dispatch, getState) => {
    const actionConfig = searchConfig[listType];
    const currentState = getTypeState(getState, listType);

    const query = currentState.searchQuery;

    // Run the search api call
    actionConfig.searchApiCall(query)
        .then(items => dispatch({
          type: ACTION_SET_SEARCH_LIST,
          listType: listType,
          searchList: items
        }));

  };
}

function searchSetSearchQuery(listType: string, query) {
  return {
    type: ACTION_SET_SEARCH_QUERY,
    listType: listType,
    searchQuery: query
  };
}


export function searchReducer(state = searchInitState, action) {
  switch (action.type) {

    case ACTION_CONCAT_SUGGEST_LIST:
      const oldState1 = getTypeState(state, action.listType);
      const listTypeConfig1 = searchConfig[action.listType];

      // The suggestSeed should be incremented
      const suggestSeed = oldState1.suggestSeed + 1;

      // Loading is now completed
      const loading = false;

      // Stop the suggesting loop if no new data was received
      const stopSuggestLoop = oldState1.suggestList.length === action.suggestList.length;

      // The new suggest list is the old suggestList + the new received data
      const suggestList = _.uniqBy(oldState1.suggestList.concat(action.suggestList), listTypeConfig1.uniqueFilter);

      // The new display list is the old searchList + the new suggestList
      const list = _.uniqBy(oldState1.searchList.concat(suggestList), listTypeConfig1.uniqueFilter);

      return Object.assign({}, state, {
        [action.listType]: Object.assign(oldState1, {
          suggestSeed: suggestSeed,
          loading: loading,
          stopSuggestLoop: stopSuggestLoop,
          suggestList: suggestList,
          list: list
        })
      });

    case ACTION_SET_SEARCH_LIST:
      const oldState2 = getTypeState(state, action.listType);
      const listTypeConfig2 = searchConfig[action.listType];

      // Loading is now completed
      const loading2 = false;

      // The new search list is only what was returned as new data
      const searchList = _.uniqBy(action.searchList, listTypeConfig2.uniqueFilter);

      // The new display list is the new searchList + the old suggestList
      const list2 = _.uniqBy(searchList.concat(oldState2.suggestList), listTypeConfig2.uniqueFilter);

      return Object.assign({}, state, {
        [action.listType]: Object.assign(oldState1, {
          loading: loading2,
          searchList: searchList,
          list: list2
        })
      });

    case ACTION_SET_SEARCH_QUERY:
      return Object.assign({}, state, {
        [action.listType]: Object.assign(state[action.listType], {
          searchQuery: action.searchQuery
        })
      });

    case ACTION_SET_LOADING:
      return Object.assign({}, state, {
        [action.listType]: Object.assign(state[action.listType], {
          loading: true
        })
      });


  }

  return state;
}


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class SearchPresentational extends React.Component {

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
    if (this.props.locationsStopSuggestLoop)
      return;

    // Suggest new locations
    this.props.suggestLocations();
  }

  _usersOnEndReached() {
    if (this.props.usersStopSuggestLoop)
      return;

    // Suggest new locations
    this.props.suggestUsers();
  }


  render() {
    return (
        <ScrollableTabView
            scrollWithoutAnimation={true}
            prerenderingSiblingsNumber={Infinity}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
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
    let userProfile = this._userProfile();

    return (
        <LocationList
            locations={this.props.locationsList}
            favoriteIds={DaoUser.gLocationFavoriteIds(userProfile)}

            onItemPress={this._onLocationPress}
            onSearchPressed={this.props.searchLocations}
            onSearchChanged={this.props.setLocationsSearchQuery}
            autoFilter={true}

            loading={this.props.locationsLoading}
            onEndReached={this._locationsOnEndReached}/>
    );
  }

  _renderTabSearchUsers() {
    let userProfile = this._userProfile();

    return (
        <UserList
            users={this.props.usersList}
            friendIds={DaoUser.gConnectionFriendIds(userProfile)}
            requestIds={DaoUser.gConnectionRequestIds(userProfile)}
            blockedIds={DaoUser.gConnectionBlockedIds(userProfile)}

            onItemPress={this._onUserPress}
            onSearchPressed={this.props.searchUsers}
            onSearchChanged={this.props.setUsersSearchQuery}
            autoFilter={true}

            loading={this.props.usersLoading}
            onEndReached={this._usersOnEndReached}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const Search = poolConnect(
    // Presentational Component
    SearchPresentational,

    // mapStateToProps
    (state) => state.searchReducer,

    // mapDispatchToProps
    (dispatch) => ({
      suggestUsers: () => dispatch(searchSuggest(listTypeUsers)),
      suggestLocations: () => dispatch(searchSuggest(listTypeLocations)),

      searchUsers: () => dispatch(searchSearch(listTypeUsers)),
      searchLocations: () => dispatch(searchSearch(listTypeLocations)),

      setUsersSearchQuery: (query) => dispatch(searchSetUsersSearchQuery(listTypeLocations, query)),
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
  tabBarUnderlineStyle: {
    height: 2,
    backgroundColor: Colors.primary
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