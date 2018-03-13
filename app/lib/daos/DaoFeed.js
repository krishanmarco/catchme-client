/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoAction from "./DaoAction";
import type {TAction} from "./DaoAction";

export type TFeed = TAction & {
  // id: number,               // 1                            INHERITED Unique feed item identifier
  // time: number,             // 1000000000                   INHERITED Seconds in which the feed was generated
  // expiry: number,           // 1000000000|-1                INHERITED Seconds of expiry, if expired the item is not displayed (-1 => never)
  // clickAction?: string,     // 'LocationGoToProfile'        INHERITED Action to be triggered when the item is clicked
  // actions?: Array<string>,  // ['FriendshipRequestAccept']  INHERITED Actions that are allowed on this item
  // payload?: Object          // {connectionId: 1}            INHERITED Payload data for each action
  consumeOnView: boolean,      // true|false                   If true the item is deleted from the realtime db once it has been viewed
  content: string,             // '<b>Hi! </b>how are you?'    HTML middle text
  leftAvatar?: string,         // 'http://ctvh.com/left.png'   Left Avatar
  rightAvatar?: string,        // 'http://ctvh.com/right.png'  Right Avatar
};

export default class DaoFeed extends DaoAction {
  // static pId = 'id';
  // static pTime = 'time';
  // static pExpiry = 'expiry';
  // static pActions = 'actions';
  // static pClickAction = 'clickAction';
  // static pPayload = 'payload';
  // static pPayloadConnectionId = `${DaoFeed.pPayload}.connectionId`;
  // static pPayloadLocationId = `${DaoFeed.pPayload}.locationId`;
  static pConsumeOnView = 'consumeOnView';
  static pContent = 'content';
  static pLeftAvatar = 'leftAvatar';
  static pRightAvatar = 'rightAvatar';

  static gConsumeOnView(feed: TFeed) {
    return _.get(feed, DaoFeed.pConsumeOnView);
  }

  static gContent(feed: TFeed) {
    return _.get(feed, DaoFeed.pContent);
  }

  static gLeftAvatar(feed: TFeed) {
    return _.get(feed, DaoFeed.pLeftAvatar);
  }

  static gRightAvatar(feed: TFeed) {
    return _.get(feed, DaoFeed.pRightAvatar);
  }

}