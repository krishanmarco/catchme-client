/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import firebase from './data/Firebase';
import Logger from './Logger';

class Context {

	constructor() {
		this.firebaseEnabled = false;
		this.updateGeolocation = this.updateGeolocation.bind(this);
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
		return _.get(this, 'geolocation', null);
	}


	// Setup functions
	updateGeolocation() {
		navigator.geolocation.getCurrentPosition(
			(position: PositionCallback) => {
				this.geolocation = {
					lat: _.get(position, 'coords.latitude'),
					lng: _.get(position, 'coords.longitude')
				};
				Logger.v('Context updateGeolocation: success', this.geolocation);
			},
			(error: PositionErrorCallback) => {
				Logger.v('Context, updateGeolocation: failed', error);
			},
			{
				timeout: 10,
				enableHighAccuracy: true
			}
		);
	}

}

const context = new Context();
export default context;