/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Const, Icons} from '../../Config';
import ApiClient from '../data/ApiClient';
import DaoFeed from "../daos/DaoFeed";
import Router from "./Router";
import type {TFeedAction} from "../types/Types";


const _FeedItems = {

  [Const.FeedHandler.actions.FriendshipRequestAccept]: ({
    icon: Icons.userFollow,
    actionIsValid: (feed) => DaoFeed.gPayloadConnectionId(feed) != null,
    action: (navigator, feed) => {
      const connectionId = DaoFeed.gPayloadConnectionId(feed);

      if (!connectionId)
        return Promise.resolve(0);

      return ApiClient.userConnectionsAcceptUid(connectionId);
    }
  }: TFeedAction),




  [Const.FeedHandler.actions.FriendshipRequestDeny]: ({
    icon: Icons.userBlock,
    actionIsValid: (feed) => DaoFeed.gPayloadConnectionId(feed) != null,
    action: (navigator, feed) => {
      const connectionId = DaoFeed.gPayloadConnectionId(feed);

      if (!connectionId)
        return Promise.resolve(0);

      return ApiClient.userConnectionsBlockUid(connectionId);
    }
  }: TFeedAction),




  [Const.FeedHandler.actions.AttendanceConfirm]: ({
    icon: Icons.locationPersonFuture,
    actionIsValid: (feed) => DaoFeed.gPayloadLocationId(feed) != null,
    action: (navigator, feed) => {
      const locationId = DaoFeed.gPayloadLocationId(feed);

      if (!locationId)
        return Promise.resolve(0);

      return Promise.resolve(0); // todo
      // return ApiClient.userConnectionsBlockUid(locationId);
    }
  }: TFeedAction),




  [Const.FeedHandler.actions.LocationFollow]: ({
    icon: Icons.locationFollow,
    actionIsValid: (feed) => DaoFeed.gPayloadLocationId(feed) != null,
    action: (navigator, feed) => {
      const locationId = DaoFeed.gPayloadLocationId(feed);

      if (!locationId)
        return Promise.resolve(0);

      return ApiClient.userLocationsFavoritesAddLid(locationId);
    }
  }: TFeedAction),




  [Const.FeedHandler.actions.GoToUserProfile]: ({
    icon: Icons.userProfile,
    actionIsValid: (feed) => DaoFeed.gPayloadConnectionId(feed) != null,
    action: (navigator, feed) => {
      const connectionId = DaoFeed.gPayloadConnectionId(feed);

      if (!connectionId)
        return Promise.resolve(0);

      Router.toUserProfileById(navigator, connectionId);
      return Promise.resolve(0);
    }
  }: TFeedAction),




  [Const.FeedHandler.actions.GoToLocationProfile]: ({
    icon: Icons.locationProfile,
    actionIsValid: (feed) => DaoFeed.gPayloadLocationId(feed) != null,
    action: (navigator, feed) => {
      const locationId = DaoFeed.gPayloadLocationId(feed);

      if (!locationId)
        return Promise.resolve(0);

      Router.toLocationProfileById(navigator, locationId);
      return Promise.resolve(0);
    }
  }: TFeedAction),

};



// todo: rename class to Action Handler
class FeedHandler {

  actionIsValid(feed, action) {
    const exists = action in _FeedItems;

    if (!exists) {
      console.log('FeedHandler actionIsValid: ActionExists(false)');
      return false;
    }

    // The action exists
    const actionIsValid = _FeedItems[action].actionIsValid(feed);

    if (!actionIsValid) {
      console.log('FeedHandler actionIsValid: ActionExists(true), ActionValid(false)');
      return false;
    }

    console.log('FeedHandler actionIsValid: ActionExists(true), ActionValid(true)');
    return true;
  }



  mapActionToIcon(action: string) {
    return _FeedItems[action].icon;
  }

  handleFeedAction(action: string, feed, navigator) {
    return _FeedItems[action].action(navigator, feed);
  }

}

const feedHandler = new FeedHandler();
export default feedHandler;


