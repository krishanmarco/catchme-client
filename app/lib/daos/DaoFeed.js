/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';

/**

 FeedItem: {
    id: 1,                                      // (!) Unique feed item identifier
    time: 10000000000,                          // (!) Seconds in which the feed was generated
    expiry: -1,                                 // (!) Seconds of expiry, if expired the item is not displayed (-1 means never)
    consumeOnView: true,                        // (!) If true the item is deleted from the realtime db once it has been viewed
    leftAvatar: 'http://ctvh.com/left.png'      // (?) Left avatar
    rightAvatar: 'http://ctvh.com/left.png'     // (?) Right avatar
    content: '<b>Hi! </b>how are you today?'    // (!) Middle text (HTML)
    clickAction: 'LocationGoToProfile',         // (?) Action to be triggered when the item is clicked
    actions: [                                  // (?) {ACTION}s. When an action is triggered a feed object is passed in
      'FriendshipRequestAccept',                // (?) {ACTION}
      'FriendshipRequestDeny',                  // (?) {ACTION}
      ...                                       // (?) {ACTION}
    ],
    payload: {...}                              // (?) Field that is unique for each feed item type
 },

 **/
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


  static gId(feed) {
    return _.get(feed, DaoFeed.pId);
  }

  static gTime(feed) {
    return _.get(feed, DaoFeed.pTime);
  }

  static gExpiry(feed) {
    return _.get(feed, DaoFeed.pExpiry);
  }

  static gConsumeOnView(feed) {
    return _.get(feed, DaoFeed.pConsumeOnView);
  }

  static gPayload(feed) {
    return _.get(feed, DaoFeed.pPayload);
  }

  static gLeftAvatar(feed) {
    return _.get(feed, DaoFeed.pLeftAvatar);
  }

  static gRightAvatar(feed) {
    return _.get(feed, DaoFeed.pRightAvatar);
  }

  static gContent(feed) {
    return _.get(feed, DaoFeed.pContent);
  }

  static gClickAction(feed) {
    return _.get(feed, DaoFeed.pClickAction);
  }

  static gActions(feed) {
    return _.get(feed, DaoFeed.pActions, []);
  }

  static gPayloadConnectionId(feed) {
    return _.get(feed, DaoFeed.pPayloadConnectionId);
  }

  static gPayloadLocationId(feed) {
    return _.get(feed, DaoFeed.pPayloadLocationId);
  }

}