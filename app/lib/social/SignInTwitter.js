/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/09/2017 © */
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
export class SignInTwitter {
  static pAccessToken = `result.credential.accessToken`;


  static initialize() {
    // No initialization needed
  }


  static gAccessToken(data) {
    return _.get(data, SignInTwitter.pAccessToken, '');
  }


  static signIn() {
    const twitter = firebase.auth.TwitterAuthProvider.credential(
        ' 4106283861-ub088nn1hS5IlNML8bx8tihVAMlVc8EKKETfMiG',
        'Tgl9kF7RGpGOKJUxgzVVABW1jnzW5idB0xGEiX3m14W7k'
    );

    return firebase.auth().signInWithRedirect(twitter)
        .then(data => {
          console.log(data);
          return firebase.auth().getRedirectResult();
        });
  }

  static signInAndGetAccessToken() {
    return SignInTwitter.signIn()
        .then(SignInTwitter.gAccessToken);
  }



}