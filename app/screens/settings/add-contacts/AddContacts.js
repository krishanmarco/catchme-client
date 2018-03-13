/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import ApiClient from '../../../lib/data/ApiClient';

import {poolConnect} from '../../../redux/ReduxPool';

import {StyleSheet, View} from 'react-native';

import UserList from '../../../comp-buisness/user/UserList';
import DaoUser from "../../../lib/daos/DaoUser";

import Router from '../../../lib/helpers/Router';

import Contacts from 'react-native-contacts';
import Logger from "../../../lib/Logger";

// Redux ************************************************************************************************
// Redux ************************************************************************************************

const addContactsInitState = {
  initialized: false,
  usersList: [],
  usersSearchQuery: '',
};

const ACTION_SET_USERS_SEARCH_QUERY = 'ACTION_SET_USERS_SEARCH_QUERY';
const ACTION_SET_USERS_SEARCH_LIST = 'ACTION_SET_USERS_SEARCH_LIST';
const ACTION_SET_USERS_CONTACTS = 'ACTION_SET_USERS_CONTACTS';

export function addContactsReducer(state = addContactsInitState, action) {
  switch (action.type) {

    case ACTION_SET_USERS_SEARCH_QUERY:
      return Object.assign({}, state, {
        usersSearchQuery: action.usersSearchQuery
      });

    case ACTION_SET_USERS_SEARCH_LIST:
      return Object.assign({}, state, {
        usersList: action.usersList,
        initialized: true
      });

    case ACTION_SET_USERS_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.contacts
      });

  }

  return state;
}


function mapContactsToUsers(currentUserId, contacts) {
  return (dispatch) => {

    const searchStrings = contacts.map(contact => {

      // Join all this users email addresses
      const emailAddresses = _.get(contact, 'emailAddresses', []);
      const emailSearchString = emailAddresses
          .map(e => _.get(e, 'email', '').replace(/\s+/g, ''))
          .join(' ');

      // Join all this users phone numbers
      const phoneNumbers = _.get(contact, 'phoneNumbers', []);
      const phoneSearchString = phoneNumbers
          .map(p => _.get(p, 'number', '').replace(/[^0-9]/g, ''))
          .join(' ');

      return (emailSearchString + ' ' + phoneSearchString).trim();

    }).filter(s => s.length > 0);


    // Query the WS for all the users in the searchString
    ApiClient.searchUsers(searchStrings)
        .then(users => {

          // Search for and remove the current user
          const filteredUsers = users
              .filter(u => DaoUser.gId(u) != currentUserId);


          dispatch({
            type: ACTION_SET_USERS_SEARCH_LIST,
            usersList: filteredUsers
          });
        });
  };
}


function searchSetUsersSearchQuery(query) {
  return {
    type: ACTION_SET_USERS_SEARCH_QUERY,
    usersSearchQuery: query
  };
}

function addContactsInitialize(currentUserId) {
  return (dispatch, getState) => {
    const initialized = getState().addContactsReducer.initialized;

    if (initialized) {
      Logger.v('AddContacts addContactsInitialize: Already initialized.');
      return;
    }

    // This is the first time mounting this component
    // Get all the users contacts
    Contacts.getAll((error, contacts) => {
      if (error === 'denied') {
        // todo handle errors
        return;
      }

      dispatch(mapContactsToUsers(currentUserId, contacts));
    });
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
    this.props.initialize(DaoUser.gId(this._userProfile()));
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
    const userProfile = this._userProfile();
    return (
        <View style={styles.root}>
          <UserList
              users={this.props.usersList}

              friendIds={DaoUser.gConnectionFriendIds(userProfile)}
              requestIds={DaoUser.gConnectionRequestIds(userProfile)}
              blockedIds={DaoUser.gConnectionBlockedIds(userProfile)}

              onItemPress={this._onUserPress}
              onSearchChanged={this.props.setUsersSearchQuery}

              loading={!this.props.initialized}/>
        </View>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const AddContacts = poolConnect(
    // Presentational Component
    SearchPresentational,

    // mapStateToProps
    (state) => state.addContactsReducer,

    // mapDispatchToProps
    (dispatch) => ({
      initialize: (currentUserId) => dispatch(addContactsInitialize(currentUserId)),
      setUsersSearchQuery: (query) => dispatch(searchSetUsersSearchQuery(query))
    }),

    // Array of pools to subscribe to
    []
);


export default AddContacts;


AddContacts.propTypes = {
  userProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 8
  }
});