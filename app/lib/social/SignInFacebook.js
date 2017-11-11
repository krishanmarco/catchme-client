/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/09/2017 © */
// import {FBLoginManager} from 'react-native-facebook-login';
import _ from 'lodash';
import firebase from '../data/Firebase';


// {
//   id: <user id. do not use on the backend>
//   name: <user name>
//   givenName: <user given name> (Android only)
//   familyName: <user family name> (Android only)
//   email: <user email>
//   photo: <user picture profile>
//   idToken: <token to authenticate the user on the backend>
//   serverAuthCode: <one-time token to access Google API from the backend on behalf of the user>
//   scopes: <list of authorized scopes>
//   accessToken: <needed to access google API from the application>
// }
export class SignInFacebook {
  static pAccessToken = 'accessToken';


  static initialize() {
    // No initialization needed
  }


  static gAccessToken(data) {
    return _.get(data, SignInFacebook.pAccessToken, '');
  }


  static signIn() {
    const facebook = firebase.auth.FacebookAuthProvider();
    facebook.addScope('email');

    return firebase.auth().signInWithRedirect(facebook)
        .then(data => {
          console.log(data);
          return firebase.auth().getRedirectResult();
        });
  }

  static signInAndGetAccessToken() {
    return SignInFacebook.signIn()
        .then(SignInFacebook.gAccessToken);
  }



}