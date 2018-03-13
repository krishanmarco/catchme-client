/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import firebase from './data/Firebase';
import {NetInfo} from 'react-native';

class Context {

	isOnline() {
		return NetInfo.isConnected.fetch();
	}

	isFirebaseAuthenticated() {
		return firebase.auth().currentUser != null;
	}

	getFirebaseUser() {
		return firebase.auth().currentUser;
	}

}

const context = new Context();
export default context;