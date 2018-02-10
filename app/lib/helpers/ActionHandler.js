/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const, Icons} from '../../Config';
import ApiClient from '../data/ApiClient';
import DaoFeed from "../daos/DaoFeed";
import Router from "./Router";
import type {TUserLocationStatus} from "../daos/DaoUserLocationStatus";
import type {TActionHandler, TNavigator} from "../types/Types";
import type {TAction} from "../daos/DaoAction";


const _FeedItems = {

  [Const.ActionHandler.actions.FriendshipRequestAccept]: ({
    icon: Icons.userFollow,
    actionIsValid: (feed) => DaoFeed.gPayloadConnectionId(feed) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const connectionId = DaoFeed.gPayloadConnectionId(feed);

      if (!connectionId)
        return Promise.resolve(0);

      return ApiClient.userConnectionsAcceptUid(connectionId);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.FriendshipRequestDeny]: ({
    icon: Icons.userBlock,
    actionIsValid: (feed) => DaoFeed.gPayloadConnectionId(feed) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const connectionId = DaoFeed.gPayloadConnectionId(feed);

      if (!connectionId)
        return Promise.resolve(0);

      return ApiClient.userConnectionsBlockUid(connectionId);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.AttendanceConfirm]: ({
    icon: Icons.locationPersonFuture,
    actionIsValid: (feed) => DaoFeed.gPayloadLocationId(feed) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const locationId = DaoFeed.gPayloadLocationId(feed);

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
    actionIsValid: (feed) => DaoFeed.gPayloadLocationId(feed) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const locationId = DaoFeed.gPayloadLocationId(feed);

      if (!locationId)
        return Promise.resolve(0);

      return ApiClient.userLocationsFavoritesAddLid(locationId);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.GoToUserProfile]: ({
    icon: Icons.userProfile,
    actionIsValid: (feed) => DaoFeed.gPayloadConnectionId(feed) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const connectionId = DaoFeed.gPayloadConnectionId(feed);

      if (!connectionId)
        return Promise.resolve(0);

      Router.toUserProfileById(navigator, connectionId);
      return Promise.resolve(0);
    }
  }: TActionHandler),




  [Const.ActionHandler.actions.GoToLocationProfile]: ({
    icon: Icons.locationProfile,
    actionIsValid: (feed) => DaoFeed.gPayloadLocationId(feed) != null,
    action: (navigator: TNavigator, action: TAction) => {
      const locationId = DaoFeed.gPayloadLocationId(feed);

      if (!locationId)
        return Promise.resolve(0);

      Router.toLocationProfileById(navigator, locationId);
      return Promise.resolve(0);
    }
  }: TActionHandler),

};



class ActionHandler {

  actionIsValid(feed, action) {
    const exists = action in _FeedItems;

    if (!exists) {
      console.log('ActionHandler actionIsValid: ActionExists(false)');
      return false;
    }

    // The action exists
    const actionIsValid = _FeedItems[action].actionIsValid(feed);

    if (!actionIsValid) {
      console.log('ActionHandler actionIsValid: ActionExists(true), ActionValid(false)');
      return false;
    }

    console.log('ActionHandler actionIsValid: ActionExists(true), ActionValid(true)');
    return true;
  }



  mapActionToIcon(actionName: string) {
    return _FeedItems[actionName].icon;
  }

  handleFeedAction(actionName: string, feed, navigator) {
    return _FeedItems[actionName].action(navigator, feed);
  }

}

const actionHandler = new ActionHandler();
export default actionHandler;


