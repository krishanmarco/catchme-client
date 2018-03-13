/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/09/2017 © */
import _ from 'lodash';
import {GoogleSignin} from 'react-native-google-signin';


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
	static GOOGLE_SIGNIN_SCOPE = 'https://www.googleapis.com/auth/userinfo.profile';
	static pAccessToken = 'accessToken';
	
	
	static initialize() {
		GoogleSignin.hasPlayServices({autoResolve: true});
	}
	
	
	static gAccessToken(data) {
		return _.get(data, SignInGoogle.pAccessToken, '');
	}
	
	static signInAndGetAccessToken() {
		return SignInGoogle.signIn().then(SignInGoogle.gAccessToken);
	}
	
	
	static signIn() {
		// You can only call currentUserAsync() after configure()
		return GoogleSignin.configure({
			scopes: [SignInGoogle.GOOGLE_SIGNIN_SCOPE],
			offlineAccess: true,
			// webClientId: '744057353512-cg4d582ren9g86uuvgvog80k1pnuij8h.apps.googleusercontent.com',
			// hostedDomain: 'CATCHME_DOMAIN_FROM_WHERE_THE_ACCESS_TOKEN_IS_PARSED',
			// iosClientId: '<FROM DEVELOPER CONSOLE> FOR IOS ONLY',
		}).then(() => {
			GoogleSignin.signIn();
		});
	}
	
	
}