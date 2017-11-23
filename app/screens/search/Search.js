/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Const} from '../../Config';

import _ from 'lodash';
import ApiClient from '../../lib/data/ApiClient';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';
import LocationTimings from '../../lib/helpers/ManagerWeekTimings';

import {Text, FlatList, View} from 'react-native';

import AvatarDescription from '../../comp/misc/AvatarDescription';
import TabBar from '../../comp/misc/TabBar';
import ListDataPoints from '../../comp/misc/ListDataPoints';

import CollapsingHeaderWithScroll from '../../comp/misc/CollapsingHeaderWithScroll';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';

import {Row, Grid, Col} from "react-native-easy-grid";
import UserList from '../../comp-buisness/user/UserList';
import LocationList from '../../comp-buisness/location/LocationList';
import Gallery from '../../comp/misc/Gallery';

import {ListItemInfo} from '../../comp/misc/ListItemsInfos';

import LocationMap from '../../comp-buisness/location/LocationMap';

import {RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import DaoUser from "../../lib/daos/DaoUser";

import LocationChat from '../../comp-buisness/location/LocationChat';
import Router from '../../lib/helpers/Router';



// Redux ************************************************************************************************
// Redux ************************************************************************************************

const locationProfileInitState = {
  usersSuggestSeed: 0,
  usersStopSuggestLoop: false,
  usersSuggestList: [],

  locationsSuggestSeed: 0,
  locationsStopSuggestLoop: false,
  locationsSuggestList: [],

  usersSearchQuery: '',
  usersSearchList: [],

  locationsSearchQuery: '',
  locationsSearchList: [],

  usersLoading: false,
  locationsLoading: false
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
        usersLoading: false
      });

    case ACTION_CONCAT_LOCATIONS_SUGGEST_LIST:
      return Object.assign({}, state, {
        locationsSuggestSeed: state.locationsSuggestSeed + 1,
        locationsStopSuggestLoop: action.locationsStopSuggestLoop,
        locationsSuggestList: action.locationsSuggestList,
        locationsLoading: false
      });


    case ACTION_SET_USERS_SEARCH_QUERY:
      return Object.assign({}, state, {
        usersSearchQuery: action.usersSearchQuery
      });

    case ACTION_SET_USERS_SEARCH_LIST:
      return Object.assign({}, state, {
        usersSearchList: action.usersSearchList,
        usersLoading: false
      });

    case ACTION_SET_LOCATIONS_SEARCH_QUERY:
      return Object.assign({}, state, {
        locationsSearchQuery: action.locationsSearchQuery
      });

    case ACTION_SET_LOCATIONS_SEARCH_LIST:
      return Object.assign({}, state, {
        locationsSearchList: action.locationsSearchList,
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
    dispatch({type: ACTION_SET_USERS_LOADING});

    let currentSeed = getState().searchReducer.usersSuggestSeed;

    // Run the suggestion api call
    ApiClient.suggestSeedUsers(currentSeed)
        .then(users => {
          let previousData = getState().searchReducer.usersSuggestList;
          users = _.uniqBy(previousData.concat(users), DaoUser.pId);

          dispatch({
            type: ACTION_CONCAT_USERS_SUGGEST_LIST,
            usersSuggestList: users,
            usersStopSuggestLoop: previousData.length === users.length
          });
        });
  };
}


function searchSuggestLocations() {
  return (dispatch, getState) => {
    dispatch({type: ACTION_SET_LOCATIONS_LOADING});

    let currentSeed = getState().searchReducer.locationsSuggestSeed;

    // Run the suggestion api call
    ApiClient.suggestSeedLocations(currentSeed)
        .then(locations => {
          let previousData = getState().searchReducer.locationsSuggestList;
          locations = _.uniqBy(previousData.concat(locations), DaoLocation.pId);

          dispatch({
            type: ACTION_CONCAT_LOCATIONS_SUGGEST_LIST,
            locationsSuggestList: locations,
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


  render() {
    return (
        <Grid>
          <Row>
            <TabBar>
              <TabBar.Tab text="Locations">{this._renderTabSearchLocations()}</TabBar.Tab>
              <TabBar.Tab text="People">{this._renderTabSearchUsers()}</TabBar.Tab>
            </TabBar>
          </Row>
        </Grid>
    );
  }



  _renderTabSearchLocations() {
    let userProfile = this._userProfile();

    return (
        <LocationList
            locations={this.props.locationsSearchQuery.length <= 0
                ? this.props.locationsSuggestList
                : this.props.locationsSearchList
            }

            favoriteIds={DaoUser.gLocationFavoriteIds(userProfile)}

            onItemPress={this._onLocationPress}
            onSearchPressed={this.props.searchLocations}
            onSearchChanged={this.props.setLocationsSearchQuery}

            loading={this.props.locationsLoading}
            onEndReached={!this.props.locationsStopSuggestLoop ? this.props.suggestLocations : null}/>
    );
  }

  _renderTabSearchUsers() {
    let userProfile = this._userProfile();

    return (
        <UserList
            users={this.props.usersSearchQuery.length <= 0
                ? this.props.usersSuggestList
                : this.props.usersSearchList
            }

            friendIds={DaoUser.gConnectionFriendIds(userProfile)}
            requestIds={DaoUser.gConnectionRequestIds(userProfile)}
            blockedIds={DaoUser.gConnectionBlockedIds(userProfile)}

            onItemPress={this._onUserPress}
            onSearchPressed={this.props.searchUsers}
            onSearchChanged={this.props.setUsersSearchQuery}

            loading={this.props.usersLoading}
            onEndReached={!this.props.usersStopSuggestLoop ? this.props.suggestUsers : null}/>
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


Search.propTypes = {
  userProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************