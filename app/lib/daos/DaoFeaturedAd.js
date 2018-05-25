/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoAction from './DaoAction';
import type {TAction} from './DaoAction';

export type TFeaturedAd = TAction & {
	// id: number,                  // 1                                INHERITED Unique feed item identifier
	// time: number,                // 1000000000                       INHERITED Seconds in which the feed was generated
	// expiry: number,              // 1000000000|-1                    INHERITED Seconds of expiry, if expired the item is not displayed (-1 => never)
	// clickAction?: string,        // 'LocationGoToProfile'            INHERITED Action to be triggered when the item is clicked
	// actions?: Array<string>,     // ['FriendshipRequestAccept']      INHERITED Actions that are allowed on this item
	// payload?: Object,            // {connectionId: 1}                INHERITED Payload data for each action
	title: string,                  // 'AreaDocks - DJ Alvarez'         Title text
	subTitle: string,               // 'Monday 27 October @AreaDocks'   Subtitle text
	image: string,                  // 'http://ctvh.com/image.png'      Background image
};

export default class DaoFeaturedAd extends DaoAction {
	// static pId = 'id';
	// static pTime = 'time';
	// static pExpiry = 'expiry';
	// static pActions = 'actions';
	// static pClickAction = 'clickAction';
	// static pPayload = 'payload';
	// static pPayloadConnectionId = `${DaoFeaturedAd.pPayload}.connectionId`;
	// static pPayloadLocationId = `${DaoFeaturedAd.pPayload}.locationId`;
	static pTitle = 'title';
	static pSubTitle = 'subTitle';
	static pImage = 'image';
	
	static gTitle(featuredAd: TFeaturedAd) {
		return _.get(featuredAd, DaoFeaturedAd.pTitle);
	}
	
	static gSubTitle(featuredAd: TFeaturedAd) {
		return _.get(featuredAd, DaoFeaturedAd.pSubTitle);
	}
	
	static gImage(featuredAd: TFeaturedAd) {
		return _.get(featuredAd, DaoFeaturedAd.pImage);
	}
	
}