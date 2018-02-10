/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';

export type TAction = {
  id: number,                   // 1                            Unique action item identifier
  time: number,                 // 1000000000                   Seconds in which the action was generated
  expiry: number,               // 1000000000|-1                Seconds of expiry, if expired the item is not displayed (-1 => never)
  clickAction?: string,         // 'LocationGoToProfile'        Action to be triggered when the item is clicked
  actions?: Array<string>,      // ['FriendshipRequestAccept']  Actions that are allowed on this item
  payload?: Object              // {connectionId: 1}            Payload data for each action
};

export default class DaoAction {
  static pId = 'id';
  static pTime = 'time';
  static pExpiry = 'expiry';
  static pActions = 'actions';
  static pClickAction = 'clickAction';
  static pPayload = 'payload';
  static pPayloadConnectionId = `${DaoAction.pPayload}.connectionId`;
  static pPayloadLocationId = `${DaoAction.pPayload}.locationId`;
  
  static gId(action: TAction) {
    return _.get(action, DaoAction.pId);
  }

  static gTime(action: TAction) {
    return _.get(action, DaoAction.pTime);
  }

  static gExpiry(action: TAction) {
    return _.get(action, DaoAction.pExpiry);
  }

  static gPayload(action: TAction) {
    return _.get(action, DaoAction.pPayload);
  }

  static gClickAction(action: TAction) {
    return _.get(action, DaoAction.pClickAction);
  }

  static gActions(action: TAction) {
    return _.get(action, DaoAction.pActions, []);
  }

  static gPayloadConnectionId(action: TAction) {
    return _.get(action, DaoAction.pPayloadConnectionId);
  }

  static gPayloadLocationId(action: TAction) {
    return _.get(action, DaoAction.pPayloadLocationId);
  }

}