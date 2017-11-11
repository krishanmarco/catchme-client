/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';


export default class ObjectCache {

  static get(object, path, calcCallback) {
    path = ObjectCache._fullPath(path);

    // Try get the previously cached data
    let data = _.get(object, path);

    if (data)
      return data;

    console.log(`ObjectCache get: Calculating ${path}`);

    data = calcCallback();
    _.set(object, path, data);

    return data;
  }


  static invalidate(object, path) {
    path = ObjectCache._fullPath(path);
    _.set(object, path, undefined);
  }


  static _fullPath(path) {
    return `ObjectCache.${path}`;
  }

}