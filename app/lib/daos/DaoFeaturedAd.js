/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';


export type TFeaturedAd = {
  id: number,                   // 1                                Unique feed item identifier
  time: number,                 // 1000000000                       Seconds in which the feed was generated
  expiry: number,               // 1000000000|-1                    Seconds of expiry, if expired the item is not displayed (-1 => never)
  title: string,                // 'AreaDocks - DJ Alvarez'         Title text
  subTitle: string,             // 'Monday 27 October @AreaDocks'   Subtitle text
  image: string,                // 'http://ctvh.com/image.png'      Background image
  clickAction?: string,         // 'LocationGoToProfile'            Action to be triggered when the item is clicked
  actions?: Array<string>,      // ['FriendshipRequestAccept']      Actions that are allowed on this item
  payload?: Object              // {connectionId: 1}                Payload data for each action
};


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


  static gId(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pId);
  }

  static gTime(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pTime);
  }

  static gExpiry(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pExpiry);
  }

  static gTitle(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pTitle);
  }

  static gSubTitle(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pSubTitle);
  }
  
  static gImage(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pImage);
  }

  static gPayload(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pPayload);
  }

  static gClickAction(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pClickAction);
  }

  static gActions(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pActions, []);
  }

  static gPayloadConnectionId(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pPayloadConnectionId);
  }

  static gPayloadLocationId(featuredAd: TFeaturedAd) {
    return _.get(featuredAd, DaoFeaturedAd.pPayloadLocationId);
  }

}