/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../data/ApiClient';
import CacheActionCreator from '../redux-pool/cache/CacheActionCreator';
import DaoAction from '../daos/DaoAction';
import Logger from '../Logger';
import Router from '../navigation/Router';
import {ActionHandlerActions, Const, Icons} from '../../Config';
import {CACHE_ID_USER_PROFILE, CacheDefUserProfileActionCreator} from '../redux-pool/cache/def/CacheDefUserProfile';
import {TActionHandlers} from '../types/Types';
import type {TAction} from '../daos/DaoAction';
import type {TActionHandler, TDispatch, TNavigator, TThunk} from '../types/Types';
import {userProfileActions, userActions, locationActions} from "../redux-pool/PoolHelper";
import CacheMapActionCreator from "../redux-pool/cache-map/CacheMapActionCreator";
import {CACHE_MAP_ID_USERS} from "../redux-pool/cache-map/def/CacheMapDefUsers";
import {CACHE_MAP_ID_LOCATIONS} from "../redux-pool/cache-map/def/CacheMapDefLocations";


const _ClickActionHandlers: TActionHandlers = ({

	[ActionHandlerActions.FriendshipRequestAccept]: {
		icon: Icons.userFollow,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const userId = DaoAction.gPayloadConnectionId(action);

			if (!userId)
				return Promise.resolve(0);

			return userActions(thunk).initializeItem(userId)
				.then(userProfileActions(thunk).connAdd);
		}
	},


	[ActionHandlerActions.FriendshipRequestDeny]: {
		icon: Icons.userBlock,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const userId = DaoAction.gPayloadConnectionId(action);

			if (!userId)
				return Promise.resolve(0);

			return userActions(thunk.dispatch).initializeItem(userId)
				.then(userProfileActions(thunk).connBlock);
		}
	},


	[ActionHandlerActions.AttendanceConfirm]: {
		icon: Icons.userLocationStatuses,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			// Create a new UserLocationStatus
			Router.toModalUserLocationStatus(
				navigator,
				{locationId}
			);

			return Promise.resolve(0);
		}
	},


	[ActionHandlerActions.LocationFollow]: {
		icon: Icons.locationFollow,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			return locationActions(thunk.dispatch).initializeItem(locationId)
				.then(userProfileActions(thunk).locationFavAdd);
		}
	},


	[ActionHandlerActions.GoToUserProfile]: {
		icon: Icons.userProfile,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const userId = DaoAction.gPayloadConnectionId(action);

			if (!userId)
				return Promise.resolve(0);

			Router.toModalUserProfile(navigator, {userId});
			return Promise.resolve(0);
		}
	},


	[ActionHandlerActions.GoToLocationProfile]: {
		icon: Icons.locationProfile,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			Router.toModalLocationProfile(navigator, {locationId});
			return Promise.resolve(0);
		}
	},

}: Array<TActionHandler>);


export type TActionHandlerParams = {
	clickAction: string,			// Id of clickAction that was executed
	action: TAction,					// The complete action
	navigator: TNavigator,		// react-native-navigation navigator
	neverConsume?: boolean,		// If true then consumeOnView is ignored
	thunk?: TThunk						// {dispatch, getState}
};

export default class ActionHandler {

	static clickActionIsValid(clickAction: string, action: TAction) {

		// Check if the click action exists
		const clickActionExists = !(clickAction in _ClickActionHandlers);

		if (clickActionExists) {
			Logger.v('ActionHandler clickActionIsValid: ActionExists(false)');
			return false;
		}

		// The action exists, check if valid
		const clickActionIsValid = _ClickActionHandlers[clickAction]
			.isValid(action);

		if (!clickActionIsValid) {
			Logger.v('ActionHandler clickActionIsValid: ActionExists(true), ActionValid(false)');
			return false;
		}

		Logger.v('ActionHandler clickActionIsValid: ActionExists(true), ActionValid(true)');
		return true;
	}


	static mapActionToIcon(actionName: string) {
		return _ClickActionHandlers[actionName].icon;
	}

	static handleAction(actionHandlerParams: TActionHandlerParams): Promise {
		const {clickAction, action, navigator, thunk} = actionHandlerParams;

		// If action is not valid, reject
		if (!ActionHandler.clickActionIsValid(clickAction, action))
			return Promise.reject(0);

		return _ClickActionHandlers[clickAction].action(action, navigator, thunk);
	}

}
