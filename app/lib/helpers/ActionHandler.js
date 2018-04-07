/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../data/ApiClient';
import DaoAction from "../daos/DaoAction";
import Logger from "../Logger";
import Router from "./Router";
import {Const, Icons} from '../../Config';
import {TActionHandlers} from "../types/Types";
import type {TAction} from "../daos/DaoAction";
import type {TActionHandler, TNavigator, TThunk} from "../types/Types";
import FirebaseDataActionCreator from "../redux-pool/firebase-data/FirebaseDataActionCreator";


const _ClickActionHandlers: TActionHandlers = ({

	[Const.ActionHandler.actions.FriendshipRequestAccept]: {
		icon: Icons.userFollow,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const connectionId = DaoAction.gPayloadConnectionId(action);

			if (!connectionId)
				return Promise.resolve(0);

			return ApiClient.userConnectionsAcceptUid(connectionId);
		}
	},


	[Const.ActionHandler.actions.FriendshipRequestDeny]: {
		icon: Icons.userBlock,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const connectionId = DaoAction.gPayloadConnectionId(action);

			if (!connectionId)
				return Promise.resolve(0);

			return ApiClient.userConnectionsBlockUid(connectionId);
		}
	},


	[Const.ActionHandler.actions.AttendanceConfirm]: {
		icon: Icons.locationPersonFuture,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			Router.toModalUserLocationStatus(navigator, {
				locationId,
				postOnConfirm: true
				// passProps.onStatusConfirm, passProps.initialStatus not needed
			});

			return Promise.resolve(0);
		}
	},


	[Const.ActionHandler.actions.LocationFollow]: {
		icon: Icons.locationFollow,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			return ApiClient.userLocationsFavoritesAddLid(locationId);
		}
	},


	[Const.ActionHandler.actions.GoToUserProfile]: {
		icon: Icons.userProfile,
		isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const connectionId = DaoAction.gPayloadConnectionId(action);

			if (!connectionId)
				return Promise.resolve(0);

			Router.toUserProfileById(navigator, connectionId);
			return Promise.resolve(0);
		}
	},


	[Const.ActionHandler.actions.GoToLocationProfile]: {
		icon: Icons.locationProfile,
		isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
		action: (action: TAction, navigator: TNavigator, thunk: TThunk) => {
			const locationId = DaoAction.gPayloadLocationId(action);

			if (!locationId)
				return Promise.resolve(0);

			Router.toLocationProfileById(navigator, locationId);
			return Promise.resolve(0);
		}
	},

}: Array<TActionHandler>);


export type TActionHandlerParams = {
	clickAction: string,
	action: TAction,
	navigator: TNavigator,
	thunk?: TThunk
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
