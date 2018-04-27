/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import Logger from "../Logger";

export default class ObjectCache {
	
	static get(object, path, calcCallback) {
		path = ObjectCache.fullPath(path);
		
		// Try get the previously cached data
		let data = _.get(object, path);
		
		if (data)
			return data;
		
		Logger.v(`ObjectCache get: Calculating ${path}`);
		
		data = calcCallback();
		_.set(object, path, data);
		
		return data;
	}
	
	static invalidate(object, path) {
		path = ObjectCache.fullPath(path);
		_.unset(object, path);
	}
	
	static fullPath(path) {
		return `ObjectCache.${path}`;
	}
	
}