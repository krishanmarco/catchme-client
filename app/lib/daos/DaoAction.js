/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';

export type TAction = {
  id: string,                   // '2d2kd923k0'                 Unique action item identifier
  time: number,                 // 1000000000                   Seconds in which the action was generated
  expiry: number,               // 1000000000|-1                Seconds of expiry, if expired the item is not displayed (-1 => never)
  clickAction?: string,         // 'LocationGoToProfile'        Action to be triggered when the item is clicked
  actions?: Array<string>,      // ['FriendshipRequestAccept']  Actions that are allowed on this item
  payload?: Object,             // {connectionId: 1}            Payload data for each action
	consumeOnView: boolean,       // true|false                   If true the item is deleted from state and firebase-db onInteracted
};

export default class DaoAction {
  static pId = 'id';
  static pTime = 'time';
  static pExpiry = 'expiry';
  static pActions = 'actions';
  static pClickAction = 'clickAction';
  static pPayload = 'payload';
	static pConsumeOnView = 'consumeOnView';
  static pPayloadConnectionId = `${DaoAction.pPayload}.connectionId`;
  static pPayloadLocationId = `${DaoAction.pPayload}.locationId`;

  static gId(action: TAction): string {
    return _.get(action, DaoAction.pId);
  }

  static gTime(action: TAction): number {
    return _.get(action, DaoAction.pTime);
  }

  static gExpiry(action: TAction): boolean {
    return _.get(action, DaoAction.pExpiry);
  }

  static gPayload(action: TAction): Object {
    return _.get(action, DaoAction.pPayload);
  }

  static gClickAction(action: TAction): string {
    return _.get(action, DaoAction.pClickAction);
  }

  static gActions(action: TAction): Array<string> {
    return _.get(action, DaoAction.pActions, []);
  }

	static gConsumeOnView(action: TAction): boolean {
		return _.get(action, DaoAction.pConsumeOnView, false);
	}

  static gPayloadConnectionId(action: TAction): number {
    return _.get(action, DaoAction.pPayloadConnectionId);
  }

  static gPayloadLocationId(action: TAction): number {
    return _.get(action, DaoAction.pPayloadLocationId);
  }

}