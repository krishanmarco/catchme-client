/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import * as firebase from 'firebase';
import {Const} from '../../Config';

const firebaseConfig = {
  ...Const.Firebase
};

firebase.initializeApp(firebaseConfig);
export default firebase;



export type TFirebaseChatUser = {};
export type TFirebaseChatMessage = {};
export type TGetFirebaseMessages = () => Array<TFirebaseChatMessage>;
export type TFirebaseFeed = {};
export type TFirebaseFeaturedAd = {};


// Functions to access specific data in the firebase database
export class FirebaseData {

  static dbUserById(userId: number) {
    return firebase.database()
        .ref('users')
        .child(userId);
  }

  static dbLocationChatMessages(locationId: number) {
    return firebase.database()
        .ref('locations')
        .child(locationId)
        .child('messages');
  }

  static dbFeedById(feedId: number) {
    return firebase.database()
        .ref('usersFeed')
        .child(feedId);
  }

  static dbUserFeedIds(userId: number) {
    return firebase.database()
        .ref(`users/${userId}/feed`);
  }

  static dbFeaturedAdById(feedId: number) {
    return firebase.database()
        .ref('featuredAds')
        .child(feedId);
  }

  static dbUserFeaturedAdIds(userId: number) {
    return firebase.database()
        .ref(`users/${userId}/featuredAds`);
  }

}


