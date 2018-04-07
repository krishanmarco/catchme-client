/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import firebase from './data/Firebase';
import {NetInfo} from 'react-native';

class Context {

	constructor() {
		this.firebaseEnabled = false;
	}

	isOnline() {
		return NetInfo.isConnected.fetch();
	}

	isFirebaseAuthenticated() {
		return firebase.auth().currentUser != null;
	}

	getFirebaseUser() {
		return firebase.auth().currentUser;
	}

	setFirebaseEnabled(enabled: boolean) {
		this.firebaseEnabled = enabled;
	}

	isFirebaseEnabled() {
		return this.firebaseEnabled;
	}

}

const context = new Context();
export default context;