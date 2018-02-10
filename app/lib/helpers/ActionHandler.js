/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const, Icons} from '../../Config';
import ApiClient from '../data/ApiClient';
import DaoAction from "../daos/DaoAction";
import Router from "./Router";
import type {TUserLocationStatus} from "../daos/DaoUserLocationStatus";
import type {TActionHandler, TNavigator} from "../types/Types";
import type {TAction} from "../daos/DaoAction";


const _ClickActionHandlers = ({

  [Const.ActionHandler.actions.FriendshipRequestAccept]: ({
    icon: Icons.userFollow,
    isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const connectionId = DaoAction.gPayloadConnectionId(action);

      if (!connectionId)
        return Promise.resolve(0);

      return ApiClient.userConnectionsAcceptUid(connectionId);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.FriendshipRequestDeny]: ({
    icon: Icons.userBlock,
    isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const connectionId = DaoAction.gPayloadConnectionId(action);

      if (!connectionId)
        return Promise.resolve(0);

      return ApiClient.userConnectionsBlockUid(connectionId);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.AttendanceConfirm]: ({
    icon: Icons.locationPersonFuture,
    isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const locationId = DaoAction.gPayloadLocationId(action);

      if (!locationId)
        return Promise.resolve(0);

      // todo: we need access to the redux pool here to change this feed
      const poolUserLocationStatus = {};


      Router.toModalUserLocationStatus(navigator, {
        locationId: locationId,
        initialStatus: poolUserLocationStatus.apiInput,
        onStatusConfirm: (userLocationStatus: TUserLocationStatus) => {
          // The Api request to change/add the userLocationStatus has already been sent
          // We need to update the poolUserLocationStatus to reflect the new status

        }
      });

      return Promise.resolve(0);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.LocationFollow]: ({
    icon: Icons.locationFollow,
    isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const locationId = DaoAction.gPayloadLocationId(action);

      if (!locationId)
        return Promise.resolve(0);

      return ApiClient.userLocationsFavoritesAddLid(locationId);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.GoToUserProfile]: ({
    icon: Icons.userProfile,
    isValid: (action: TAction) => DaoAction.gPayloadConnectionId(action) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const connectionId = DaoAction.gPayloadConnectionId(action);

      if (!connectionId)
        return Promise.resolve(0);

      Router.toUserProfileById(navigator, connectionId);
      return Promise.resolve(0);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.GoToLocationProfile]: ({
    icon: Icons.locationProfile,
    isValid: (action: TAction) => DaoAction.gPayloadLocationId(action) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const locationId = DaoAction.gPayloadLocationId(action);

      if (!locationId)
        return Promise.resolve(0);

      Router.toLocationProfileById(navigator, locationId);
      return Promise.resolve(0);
    }
  }: TActionHandler),

}: Array<TActionHandler>);



class ActionHandler {

  clickActionIsValid(clickAction: string, action: TAction) {

    // Check if the click action exists
    const clickActionExists = !clickAction in _ClickActionHandlers;

    if (clickActionExists) {
      console.error('ActionHandler clickActionIsValid: ActionExists(false)');
      return false;
    }

    // The action exists, check if valid
    const clickActionIsValid = _ClickActionHandlers[clickAction]
        .isValid(action);

    if (!clickActionIsValid) {
      console.error('ActionHandler clickActionIsValid: ActionExists(true), ActionValid(false)');
      return false;
    }

    console.log('ActionHandler clickActionIsValid: ActionExists(true), ActionValid(true)');
    return true;
  }



  mapActionToIcon(actionName: string) {
    return _ClickActionHandlers[actionName].icon;
  }

  handleAction(clickAction: string, action: TAction, navigator: TNavigator) {
    return _ClickActionHandlers[clickAction].action(navigator, action);
  }

}

const actionHandler = new ActionHandler();
export default actionHandler;


