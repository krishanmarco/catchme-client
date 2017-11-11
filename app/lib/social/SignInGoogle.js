/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/09/2017 © */
// import {GoogleSignin} from 'react-native-google-signin';
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
export class SignInGoogle {
  static pAccessToken = 'accessToken';


  static initialize() {
    return null;//GoogleSignin.hasPlayServices({autoResolve: true});
  }


  static gAccessToken(data) {
    return _.get(data, SignInGoogle.pAccessToken, '');
  }


  static signIn() {
    const google = firebase.auth.GoogleAuthProvider();
    google.addScope('https://www.googleapis.com/auth/plus.login');

    return firebase.auth().signInWithRedirect(google)
        .then(data => {
          console.log(data);
          return firebase.auth().getRedirectResult();
        });
  }

  static signInAndGetAccessToken() {
    return SignInGoogle.signIn()
        .then(SignInGoogle.gAccessToken);
  }

  /*
  static signIn() {
    // You can only call currentUserAsync() after configure()
    return GoogleSignin.configure({iosClientId: '<FROM DEVELOPER CONSOLE> ONLY FOR IOS'})
        .then(() => GoogleSignin.signIn());
  }

  static signInAndGetAccessToken() {
    return SignInGoogle.signIn()
        .then(user => SignInGoogle.gAccessToken(user));
  }
  */


}