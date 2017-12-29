/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';

/**

 FeedItem: {
    id: 1,                                      // (!) Unique feed item identifier
    time: 10000000000,                          // (!) Seconds in which the feed was generated
    expiry: -1,                                 // (!) Seconds of expiry, if expired the item is not displayed (-1 means never)
    title: 'AreaDocks - DJ Alvarez'             // (!) Title text
    subTitle: 'Monday 27 October @AreaDocks'    // (!) Subtitle text
    image: 'http://www.google.com/image.jpg',   // (!) Background image
    clickAction: 'LocationGoToProfile',         // (?) Action to be triggered when the item is clicked
    actions: [                                  // (?) {ACTION}s. for social bar - when an action is triggered the object is passed in
      'FriendshipRequestAccept',                // (?) {ACTION}
      'FriendshipRequestDeny',                  // (?) {ACTION}
      ...                                       // (?) {ACTION}
    ],
    payload: {...}                              // (?) Field that is unique for each feed item type
 },

 **/
export default class DaoFeaturedAd {
  static pId = 'id';
  static pTime = 'time';
  static pExpiry = 'expiry';
  static pTitle = 'title';
  static pSubTitle = 'subTitle';
  static pImage = 'image';
  static pActions = 'actions';
  static pClickAction = 'clickAction';
  static pPayload = 'payload';
  static pPayloadConnectionId = `${DaoFeaturedAd.pPayload}.connectionId`;
  static pPayloadLocationId = `${DaoFeaturedAd.pPayload}.locationId`;


  static gId(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pId);
  }

  static gTime(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pTime);
  }

  static gExpiry(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pExpiry);
  }

  static gTitle(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pTitle);
  }

  static gSubTitle(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pSubTitle);
  }
  
  static gImage(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pImage);
  }

  static gPayload(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pPayload);
  }

  static gLeftAvatar(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pLeftAvatar);
  }

  static gRightAvatar(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pRightAvatar);
  }

  static gContent(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pContent);
  }

  static gClickAction(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pClickAction);
  }

  static gActions(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pActions, []);
  }

  static gPayloadConnectionId(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pPayloadConnectionId);
  }

  static gPayloadLocationId(featuredAd) {
    return _.get(featuredAd, DaoFeaturedAd.pPayloadLocationId);
  }

}