/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ManagerWeekTimings from "../helpers/ManagerWeekTimings";
import Realm from 'realm';



class LocalUser {
	static get() {
		return Realm.objects(LocalUser.schema.name);
	}
	
	static schema = {
		name: 'LocalUser',
		properties: {
			user: {type: 'User'}
		}
	};
}


class User {
	static get() {
		return Realm.objects(User.schema.name);
	}
	
	static schema = {
		name: 'User',
		primaryKey: 'id',
		properties: {
			insertTs: {type: 'int',},
			id: {type: 'int', indexed: true},
			name: {type: 'string'},
			gender: {type: 'int', default: 2},
			reputation: {type: 'int', default: 0},
			pictureUrl: {type: 'string', optional: true},
			publicMessage: {type: 'string', optional: true},
			phone: {type: 'string', optional: true},
			email: {type: 'string', optional: true},
			apiKey: {type: 'string', optional: true},
			privacy: {type: 'string', optional: true},
			locations: {type: 'UserLocations', optional: true},
			connections: {type: 'UserConnections', optional: true},
			adminLocations: {type: 'list', objectType: 'Location', default: []}
		}
	}
}


class UserLocations {
	static get() {
		return Realm.objects(UserLocations.schema.name);
	}
	
	static schema = {
		name: 'UserLocations',
		properties: {
			favorites: {type: 'GenericObject',},
			top: {type: 'GenericObject', objectType: 'int',},
			userLocationStatuses: {type: 'list', objectType: 'UserLocationStatus', default: []},
			locations: {type: 'list', objectType: 'Location', default: []},
		}
	}
}


class UserConnections {
	static get() {
		return Realm.objects(UserConnections.schema.name);
	}
	
	static schema = {
		name: 'UserConnections',
		properties: {
			friends: {type: 'list', objectType: 'User', default: []},
			requests: {type: 'list', objectType: 'User', default: []},
			blocked: {type: 'list', objectType: 'User', default: []},
		}
	}
}


class Location {
	static get() {
		return Realm.objects(Location.schema.name);
	}
	
	static schema = {
		name: 'Location',
		primaryKey: 'id',
		properties: {
			insertTs: {type: 'int',},
			id: {type: 'int', indexed: true},
			name: {type: 'string'},
			adminId: {type: 'int', default: 1},
			signupTs: {type: 'int', optional: true},
			description: {type: 'string', optional: true},
			capacity: {type: 'int', default: 0},
			pictureUrl: {type: 'string', optional: true},
			reputation: {type: 'int', default: 0},
			email: {type: 'string', optional: true},
			phone: {type: 'string', optional: true},
			timings: {type: 'string', optional: true, default: ManagerWeekTimings.strWeekDefault},
			imageUrls: {type: 'GenericObject', optional: true},
			people: {type: 'GenericObject', optional: true},
			address: {type: 'GenericObject', optional: true},
			connections: {type: 'LocationConnections', optional: true}
		}
	}
}


class LocationConnections {
	static get() {
		return Realm.objects(LocationConnections.schema.name);
	}
	
	static schema = {
		name: 'LocationConnections',
		properties: {
			past: {type: 'list', objectType: 'User', default: []},
			now: {type: 'list', objectType: 'User', default: []},
			future: {type: 'list', objectType: 'User', default: []},
		}
	}
}


class UserLocationStatus {
	static get() {
		return Realm.objects(UserLocationStatus.schema.name);
	}
	
	static schema = {
		name: 'UserLocationStatus',
		properties: {
			id: {type: 'int'},
			locationId: {type: 'int'},
			fromTs: {type: 'int'},
			untilTs: {type: 'int'},
		}
	}
}


class GenericObject {
	static get() {
		return Realm.objects(GenericObject.schema.name);
	}
	
	static schema = {
		name: 'GenericObject',
		properties: {
			value: {type: 'string', default: '{}'},
		}
	}
}


const realm = new Realm({
	schemaVersion: 1,
	schema: [
		LocalUser,
		User,
		UserLocations,
		UserConnections,
		Location,
		LocationConnections,
		UserLocationStatus,
		GenericObject,
	]
});
export default realm;
