/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';


export type TFeed = {
  id: number,                   // 1                            Unique feed item identifier
  time: number,                 // 1000000000                   Seconds in which the feed was generated
  expiry: number,               // 1000000000|-1                Seconds of expiry, if expired the item is not displayed (-1 => never)
  consumeOnView: boolean,       // true|false                   If true the item is deleted from the realtime db once it has been viewed
  content: string,              // '<b>Hi! </b>how are you?'    HTML middle text
  leftAvatar?: string,          // 'http://ctvh.com/left.png'   Left Avatar
  rightAvatar?: string,         // 'http://ctvh.com/right.png'  Right Avatar
  clickAction?: string,         // 'LocationGoToProfile'        Action to be triggered when the item is clicked
  actions?: Array<string>,      // ['FriendshipRequestAccept']  Actions that are allowed on this item
  payload?: Object              // {connectionId: 1}            Payload data for each action
};


export default class DaoFeed {
  static pId = 'id';
  static pTime = 'time';
  static pExpiry = 'expiry';
  static pConsumeOnView = 'consumeOnView';
  static pLeftAvatar = 'leftAvatar';
  static pRightAvatar = 'rightAvatar';
  static pContent = 'content';
  static pActions = 'actions';
  static pClickAction = 'clickAction';
  static pPayload = 'payload';
  static pPayloadConnectionId = `${DaoFeed.pPayload}.connectionId`;
  static pPayloadLocationId = `${DaoFeed.pPayload}.locationId`;


  static gId(feed: TFeed) {
    return _.get(feed, DaoFeed.pId);
  }

  static gTime(feed: TFeed) {
    return _.get(feed, DaoFeed.pTime);
  }

  static gExpiry(feed: TFeed) {
    return _.get(feed, DaoFeed.pExpiry);
  }

  static gConsumeOnView(feed: TFeed) {
    return _.get(feed, DaoFeed.pConsumeOnView);
  }

  static gPayload(feed: TFeed) {
    return _.get(feed, DaoFeed.pPayload);
  }

  static gLeftAvatar(feed: TFeed) {
    return _.get(feed, DaoFeed.pLeftAvatar);
  }

  static gRightAvatar(feed: TFeed) {
    return _.get(feed, DaoFeed.pRightAvatar);
  }

  static gContent(feed: TFeed) {
    return _.get(feed, DaoFeed.pContent);
  }

  static gClickAction(feed: TFeed) {
    return _.get(feed, DaoFeed.pClickAction);
  }

  static gActions(feed: TFeed) {
    return _.get(feed, DaoFeed.pActions, []);
  }

  static gPayloadConnectionId(feed: TFeed) {
    return _.get(feed, DaoFeed.pPayloadConnectionId);
  }

  static gPayloadLocationId(feed: TFeed) {
    return _.get(feed, DaoFeed.pPayloadLocationId);
  }

}