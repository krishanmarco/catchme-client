/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import firebase, {FirebaseData} from '../../lib/data/Firebase';
import {Const} from '../../Config';
import {t} from '../../lib/i18n/Translations';
import type {TFirebaseChatMessage, TFirebaseChatUser, TGetFirebaseMessages} from '../../lib/data/Firebase';

// Config ***********************************************************************************************
// Config ***********************************************************************************************

export type TChatReducerState = {
	authorizing: boolean,
	authorized: boolean,

	fetchedAllItems: boolean,
	runningBulkFetch: boolean,
	itemsToLoad: number,

	users: Array<TFirebaseChatUser>,
	messages: Array<TFirebaseChatMessage>
};

// HelperFunctions **************************************************************************************
// HelperFunctions **************************************************************************************


function mapDbMessageToLocalMessage(dispatch, users, message) {

	// On the firebase db, the user field is the user id
	let senderId = message.user;

	if (senderId in users) {
		message.user = users[senderId];
		return message;
	}

	// User fallback
	message.user = {_id: -1, name: t('t_catchme_user'), avatar: Const.userDefaultAvatar};

	// Get the unknown user pId
	FirebaseData.dbUserById(senderId)
		.once('value')
		.then(user => dispatch(addUser(user.val())));

	return message;
}

// Redux ************************************************************************************************
// Redux ************************************************************************************************


const chatInitState: TChatReducerState = {
	authorizing: false,
	authorized: false,

	fetchedAllItems: false,
	runningBulkFetch: false,
	itemsToLoad: 0,

	users: {},
	messages: []
};

const ACTION_LOCATION_CHAT_RESET = 'ACTION_LOCATION_CHAT_RESET';
const ACTION_LOCATION_CHAT_ADD_USER = 'ACTION_LOCATION_CHAT_ADD_USER';
const ACTION_LOCATION_CHAT_SET_AUTHORIZED = 'ACTION_LOCATION_CHAT_SET_AUTHORIZED';
const ACTION_LOCATION_CHAT_PRE_BULK_FETCH = 'ACTION_LOCATION_CHAT_PRE_BULK_FETCH';
const ACTION_LOCATION_CHAT_START_ON_MESSAGES_RECEIVED = 'ACTION_LOCATION_CHAT_START_ON_MESSAGES_RECEIVED';
const ACTION_LOCATION_CHAT_SET_FETCHED_ALL_ITEMS = 'ACTION_LOCATION_CHAT_SET_FETCHED_ALL_ITEMS';


export function chatReducer(state: TChatReducerState = chatInitState, action): TChatReducerState {
	switch (action.type) {

		case ACTION_LOCATION_CHAT_RESET:
			return Object.assign({}, chatInitState);

		case ACTION_LOCATION_CHAT_ADD_USER:
			return Object.assign({}, state, {
				users: Object.assign(state.users, {[action.user._id]: action.user})
			});

		case ACTION_LOCATION_CHAT_SET_AUTHORIZED:
			return Object.assign({}, state, {
				authorizing: false,
				authorized: true
			});


		case ACTION_LOCATION_CHAT_PRE_BULK_FETCH:
			return Object.assign({}, state, {
				runningBulkFetch: true,
				itemsToLoad: state.itemsToLoad + Const.chatPaginationSize,
			});

		case ACTION_LOCATION_CHAT_START_ON_MESSAGES_RECEIVED:
			return Object.assign({}, state, {
				runningBulkFetch: false,
				messages: action.messages
			});

		case ACTION_LOCATION_CHAT_SET_FETCHED_ALL_ITEMS:
			return Object.assign({}, state, {
				fetchedAllItems: true,
				runningBulkFetch: false,
			});

	}

	return state;
}


export function initialize(getFirebaseMessages: TGetFirebaseMessages, user: TFirebaseChatUser) {
	return (dispatch) => {
		dispatch({type: ACTION_LOCATION_CHAT_RESET});
		dispatch(addUser(user));
		dispatch({type: ACTION_LOCATION_CHAT_SET_AUTHORIZED});
		dispatch(chatFetchMessages(getFirebaseMessages));
		FirebaseData.dbUserById(user._id).update(user);
	};
}

function addUser(user: TFirebaseChatUser) {
	return {
		type: ACTION_LOCATION_CHAT_ADD_USER,
		user
	};
}



export function chatMessagesLoadMore(getFirebaseMessages: TGetFirebaseMessages) {
	return chatFetchMessages(getFirebaseMessages);
}

export function chatFetchMessages(getFirebaseMessages: TGetFirebaseMessages) {
	return (dispatch, getState) => {

		dispatch({type: ACTION_LOCATION_CHAT_PRE_BULK_FETCH});

		let ref = getFirebaseMessages()
			.limitToLast(getState().chatReducer.itemsToLoad);


		let firstMessage = getState().chatReducer.messages[0];
		if (firstMessage)
			ref = ref.endAt(firstMessage._id);



		ref.once('value', (snapshot) => {

			let firebaseMessages = snapshot.val();

			if (firebaseMessages == null)
				firebaseMessages = {};

			const state = getState().chatReducer;
			let messages = Object.values(firebaseMessages);

			if (messages.length === state.messages.length) {
				dispatch({type: ACTION_LOCATION_CHAT_SET_FETCHED_ALL_ITEMS});
				return;
			}


			const users = getState().chatReducer.users;
			messages = messages.map(m => mapDbMessageToLocalMessage(dispatch, users, m));

			dispatch(chatReceiveMessages(messages));

			if (messages.length < state.itemsToLoad)
				dispatch({type: ACTION_LOCATION_CHAT_SET_FETCHED_ALL_ITEMS});
		});



		ref.on('child_added', (snapshot) => {

			if (getState().chatReducer.runningBulkFetch) {
				// This value will come back in the .once('value'), ignoring
				return;
			}

			// The initial data has already been added, this is new data

			let firebaseMessage = snapshot.val();
			if (firebaseMessage == null)
				return;

			const users = getState().chatReducer.users;
			dispatch(chatReceiveMessages([mapDbMessageToLocalMessage(dispatch, users, firebaseMessage)]));
		});

	};
}


export function chatReceiveMessages(messages) {
	return (dispatch, getState) => {

		// Map all date strings to date objects
		messages.forEach(m => m.createdAt = new Date(m.createdAt));

		// Reverse the list
		messages = messages.reverse();


		// Merge with state and make sure the array doesn't have
		// duplicate messages
		// Important, keep this after having parsed the message
		// and having reversed the input array
		let stateMessages = getState().chatReducer.messages.slice();
		messages = _.uniqBy(messages.concat(stateMessages), '_id');

		dispatch({
			type: ACTION_LOCATION_CHAT_START_ON_MESSAGES_RECEIVED,
			receivedAt: Date.now(),
			messages
		});

	};
}




export function chatMessagesSendMessage(getFirebaseMessages: TGetFirebaseMessages, message: TFirebaseChatMessage) {
	return (dispatch) => {

		// Get a new message pId from firebase
		const newMsgRef = getFirebaseMessages()
			.push();

		// Set the new pId into the message
		message._id = newMsgRef.key;

		// Override the user object with its pId
		message.user = message.user._id;

		// Send the message to firebase
		newMsgRef.set(message);
	};
}