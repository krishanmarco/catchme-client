/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import firebase from './data/Firebase';

class Context {

	constructor() {
		this.firebaseEnabled = false;
		this.updateGeolocation();
	}

	getFirebaseUser() {
		return firebase.auth().currentUser;
	}

	setFirebaseEnabled(enabled: boolean) {
		this.firebaseEnabled = enabled;
	}

	isFirebaseEnabled() {
		// We could also use firebase.auth().currentUser != null
		return this.firebaseEnabled;
	}

	getGeolocation() {
		return this.geolocation;
	}


	// Setup functions
	updateGeolocation() {
		navigator.geolocation.getCurrentPosition(
			(position: PositionCallback) => {
				this.geolocation = {
					lat: _.get(position, 'coords.latitude'),
					lng: _.get(position, 'coords.longitude')
				};
			},
			(error: PositionErrorCallback) => {}
		);
	}

}

const context = new Context();
export default context;