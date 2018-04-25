/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import ApiClient from '../../../lib/data/ApiClient';
import Contacts from 'react-native-contacts';
import DaoLocation from "../../../lib/daos/DaoLocation";
import DaoUser from "../../../lib/daos/DaoUser";
import Logger from "../../../lib/Logger";
import React from 'react';
import Router from '../../../lib/navigation/Router';
import UserList from '../../../comp-buisness/user/UserList';
import {poolConnect} from '../../../redux/ReduxPool';
import {StyleSheet, View} from 'react-native';
import type {TNavigator} from "../../../lib/types/Types";
import type {TUser} from "../../../lib/daos/DaoUser";

// Const ************************************************************************************************
// Const ************************************************************************************************

type ReduxState = {
	initialized: boolean,
	usersList: Array<TUser>,
	usersSearchQuery: string,
};

type ReduxDispatch = {
	initialize: (number) => void,
	setUsersSearchQuery: (string) => void
};

type Props = ReduxState & ReduxDispatch & {
	userProfile: TUser,
	navigator: TNavigator,
};


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const addContactsInitState = {
	initialized: false,
	usersList: [],
	usersSearchQuery: '',
};

const ACTION_SET_USERS_AddContacts_QUERY = 'ACTION_SET_USERS_AddContacts_QUERY';
const ACTION_SET_USERS_AddContacts_LIST = 'ACTION_SET_USERS_AddContacts_LIST';
const ACTION_SET_USERS_CONTACTS = 'ACTION_SET_USERS_CONTACTS';

export function addContactsReducer(state = addContactsInitState, action) {
	switch (action.type) {

		case ACTION_SET_USERS_AddContacts_QUERY:
			return Object.assign({}, state, {
				usersSearchQuery: action.usersSearchQuery
			});

		case ACTION_SET_USERS_AddContacts_LIST:
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
					type: ACTION_SET_USERS_AddContacts_LIST,
					usersList: filteredUsers
				});
			});
	};
}


function searchSetUsersSearchQuery(query) {
	return {
		type: ACTION_SET_USERS_AddContacts_QUERY,
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
			if (error === 'denied')
				return;

			dispatch(mapContactsToUsers(currentUserId, contacts));
		});
	};
}


// _AddContacts *****************************************************************************************
// _AddContacts *****************************************************************************************

class _AddContacts extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onUserPress = this._onUserPress.bind(this);
	}

	componentWillMount() {
		const {initialize, userProfile} = this.props;
		initialize(DaoUser.gId(userProfile));
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

	render() {
		const {usersList, initialized, setUsersSearchQuery} = this.props;
		return (
			<View style={styles.root}>
				<UserList
					users={usersList}

					allowAcceptFriend={true}
					allowUnblockUser={true}
					allowRequestFriend={true}

					onItemPress={this._onUserPress}
					onSearchChanged={setUsersSearchQuery}

					loading={!initialized}/>
			</View>
		);
	}

}

const AddContacts = poolConnect(_AddContacts,
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


// Config ************************************************************************************************
// Config ************************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1
	}
});