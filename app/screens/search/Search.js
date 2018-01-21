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

  },
  [listTypeUsers]: {
    name: listType
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

const searchReducerInitState = {
  [listTypeUsers]: Object.assign(SearchReducerSection),
  [listTypeLocations]: Object.assign(SearchReducerSection)
};

const ACTION_CONCAT_SUGGEST_LIST = 'ACTION_CONCAT_SUGGEST_LIST';
const ACTION_SET_SEARCH_QUERY = 'ACTION_SET_SEARCH_QUERY';
const ACTION_SET_SEARCH_LIST = 'ACTION_SET_SEARCH_LIST';
const ACTION_SET_LOADING = 'ACTION_SET_LOADING';


function searchSuggest(listType: string) {
  return (dispatch, getState) => {

    const currentState = getState().searchReducer[listType];

    if (currentState.loading)
      return;

    dispatch({
      type: ACTION_SET_LOADING,
      listType: listType
    });

    // Run the suggestion api call
    ApiClient.suggestSeedUsers(currentState.usersSuggestSeed)
        .then(users => {
          const previousData = getState().searchReducer.usersSuggestList;
          const newUsers = _.uniqBy(previousData.concat(users), DaoUser.pId);

          dispatch({
            type: ACTION_CONCAT_USERS_SUGGEST_LIST,
            listType: listType,
            usersSuggestList: newUsers,
            usersStopSuggestLoop: previousData.length === users.length
          });
        });
  };
}





const locationProfileInitState = {

  usersLoading: false,
  usersStopSuggestLoop: false,
  usersSearchQuery: '',
  usersSuggestSeed: 0,
  usersList: [],
  usersSearchList: [],
  usersSuggestList: [],


  locationsLoading: false,
  locationsStopSuggestLoop: false,
  locationsSearchQuery: '',
  locationsSuggestSeed: 0,
  locationsList: [],
  locationsSearchList: [],
  locationsSuggestList: [],

};

const ACTION_CONCAT_USERS_SUGGEST_LIST = 'ACTION_SET_USERS_SUGGEST_LIST';
const ACTION_CONCAT_LOCATIONS_SUGGEST_LIST = 'ACTION_CONCAT_LOCATIONS_SUGGEST_LIST';

const ACTION_SET_USERS_SEARCH_QUERY = 'ACTION_SET_USERS_SEARCH_QUERY';
const ACTION_SET_USERS_SEARCH_LIST = 'ACTION_SET_USERS_SEARCH_LIST';
const ACTION_SET_LOCATIONS_SEARCH_QUERY = 'ACTION_SET_LOCATIONS_SEARCH_QUERY';
const ACTION_SET_LOCATIONS_SEARCH_LIST = 'ACTION_SET_LOCATIONS_SEARCH_LIST';

const ACTION_SET_LOCATIONS_LOADING = 'ACTION_SET_LOCATIONS_LOADING';
const ACTION_SET_USERS_LOADING = 'ACTION_SET_USERS_LOADING';

export function searchReducer(state = locationProfileInitState, action) {
  switch (action.type) {

    case ACTION_CONCAT_USERS_SUGGEST_LIST:
      return Object.assign({}, state, {
        usersSuggestSeed: state.usersSuggestSeed + 1,
        usersStopSuggestLoop: action.usersStopSuggestLoop,
        usersSuggestList: action.usersSuggestList,
        usersList: _.uniqBy(state.usersSearchList.concat(action.usersSuggestList), DaoUser.gId),
        usersLoading: false,
      });

    case ACTION_CONCAT_LOCATIONS_SUGGEST_LIST:
      return Object.assign({}, state, {
        locationsSuggestSeed: state.locationsSuggestSeed + 1,
        locationsStopSuggestLoop: action.locationsStopSuggestLoop,
        locationsSuggestList: action.locationsSuggestList,
        locationsLoading: false,
        locationsList: _.uniqBy(state.locationsSearchList.concat(action.locationsSuggestList), DaoLocation.gId)
      });


    case ACTION_SET_USERS_SEARCH_QUERY:
      return Object.assign({}, state, {
        usersSearchQuery: action.usersSearchQuery,
      });

    case ACTION_SET_USERS_SEARCH_LIST:
      return Object.assign({}, state, {
        usersSearchList: action.usersSearchList,
        usersList: _.uniqBy(action.usersSearchList.concat(state.usersSuggestList), DaoUser.gId),
        usersLoading: false
      });

    case ACTION_SET_LOCATIONS_SEARCH_QUERY:
      return Object.assign({}, state, {
        locationsSearchQuery: action.locationsSearchQuery
      });

    case ACTION_SET_LOCATIONS_SEARCH_LIST:
      return Object.assign({}, state, {
        locationsSearchList: action.locationsSearchList,
        locationsList: _.uniqBy(action.locationsSearchList.concat(state.locationsSuggestList), DaoLocation.gId),
        locationsLoading: false
      });


    case ACTION_SET_LOCATIONS_LOADING:
      return Object.assign({}, state, {
        locationsLoading: true
      });

    case ACTION_SET_USERS_LOADING:
      return Object.assign({}, state, {
        usersLoading: true
      });

  }

  return state;
}


function searchSuggestUsers() {
  return (dispatch, getState) => {

    const currentState = getState().searchReducer;

    if (currentState.usersLoading)
      return;

    dispatch({type: ACTION_SET_USERS_LOADING});

    // Run the suggestion api call
    ApiClient.suggestSeedUsers(currentState.usersSuggestSeed)
        .then(users => {
          const previousData = getState().searchReducer.usersSuggestList;
          const newUsers = _.uniqBy(previousData.concat(users), DaoUser.pId);

          dispatch({
            type: ACTION_CONCAT_USERS_SUGGEST_LIST,
            usersSuggestList: newUsers,
            usersStopSuggestLoop: previousData.length === users.length
          });
        });
  };
}


function searchSuggestLocations() {
  return (dispatch, getState) => {

    const currentState = getState().searchReducer;

    if (currentState.locationsLoading)
      return;

    dispatch({type: ACTION_SET_LOCATIONS_LOADING});

    // Run the suggestion api call
    ApiClient.suggestSeedLocations(currentState.locationsSuggestSeed)
        .then(locations => {
          const previousData = getState().searchReducer.locationsSuggestList;
          const newLocations = _.uniqBy(previousData.concat(locations), DaoLocation.pId);

          dispatch({
            type: ACTION_CONCAT_LOCATIONS_SUGGEST_LIST,
            locationsSuggestList: newLocations,
            locationsStopSuggestLoop: previousData.length === locations.length
          });
        });
  };
}


function searchSearchUsers() {
  return (dispatch, getState) => {
    dispatch({type: ACTION_SET_USERS_LOADING});

    let query = getState().searchReducer.usersSearchQuery;

    // Run the suggestion api call
    ApiClient.searchQueryUsers(query)
        .then(users => dispatch({
          type: ACTION_SET_USERS_SEARCH_LIST,
          usersSearchList: users
        }));
  };
}


function searchSearchLocations() {
  return (dispatch, getState) => {
    dispatch({type: ACTION_SET_LOCATIONS_LOADING});

    let query = getState().searchReducer.locationsSearchQuery;

    // Run the suggestion api call
    ApiClient.searchQueryLocations(query)
        .then(locations => dispatch({
          type: ACTION_SET_LOCATIONS_SEARCH_LIST,
          locationsSearchList: locations
        }));
  };
}


function searchSetLocationsSearchQuery(query) {
  return {
    type: ACTION_SET_LOCATIONS_SEARCH_QUERY,
    locationsSearchQuery: query
  };
}

function searchSetUsersSearchQuery(query) {
  return {
    type: ACTION_SET_USERS_SEARCH_QUERY,
    usersSearchQuery: query
  };
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
      suggestUsers: () => dispatch(searchSuggestUsers()),
      suggestLocations: () => dispatch(searchSuggestLocations()),
      searchUsers: () => dispatch(searchSearchUsers()),
      searchLocations: () => dispatch(searchSearchLocations()),
      setLocationsSearchQuery: (query) => dispatch(searchSetLocationsSearchQuery(query)),
      setUsersSearchQuery: (query) => dispatch(searchSetUsersSearchQuery(query)),
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