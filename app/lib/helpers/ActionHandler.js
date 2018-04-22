/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../data/ApiClient';
import DaoAction from "../daos/DaoAction";
import Logger from "../Logger";
import Router from "../navigation/Router";
import {ActionHandlerActions, Const, Icons} from '../../Config';
import {TActionHandlers} from "../types/Types";
import type {TAction} from "../daos/DaoAction";
import type {TActionHandler, TNavigator, TThunk} from "../types/Types";


const _ClickActionHandlers: TActionHandlers = ({

	[ActionHandlerActions.FriendshipRequestAccept]: {
		icon: Icons.userFollow,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const connectionId = DaoAction.gPayloadConnectionId(action);

			if (!connectionId)
				return Promise.resolve(0);

			return ApiClient.userConnectionsAcceptUid(connectionId);
		}
	},


	[ActionHandlerActions.FriendshipRequestDeny]: {
		icon: Icons.userBlock,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const connectionId = DaoAction.gPayloadConnectionId(action);

			if (!connectionId)
				return Promise.resolve(0);

			return ApiClient.userConnectionsBlockUid(connectionId);
		}
	},


	[ActionHandlerActions.AttendanceConfirm]: {
		icon: Icons.locationPersonFuture,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			// Create a new UserLocationStatus
			Router.toModalUserLocationStatus(
				navigator,
				{locationId, navigator}
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

			return ApiClient.userLocationsFavoritesAddLid(locationId);
		}
	},


	[ActionHandlerActions.GoToUserProfile]: {
		icon: Icons.userProfile,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const connectionId = DaoAction.gPayloadConnectionId(action);

			if (!connectionId)
				return Promise.resolve(0);

			Router.toModalUserProfile(navigator, {userId: connectionId});
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
