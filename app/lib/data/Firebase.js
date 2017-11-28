/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import * as firebase from 'firebase';
import {Const} from '../../Config';

const firebaseConfig = {
  ...Const.Firebase
};

firebase.initializeApp(firebaseConfig);
export default firebase;



// Functions to access specific data in the firebase database
export class FirebaseData {

  static dbFeedById(feedId) {
    return firebase.database()
        .ref('usersFeed')
        .child(feedId);
  }

  static dbUserFeedIds(userId) {
    return firebase.database()
        .ref(`users/${userId}/feed`);
  }

  static dbFeaturedAdById(feedId) {
    return firebase.database()
        .ref('featuredAds')
        .child(feedId);
  }

  static dbUserFeaturedAdIds(userId) {
    return firebase.database()
        .ref(`users/${userId}/featuredAds`);
  }

}


