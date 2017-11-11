/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Urls, Const} from '../../Config';
import ApiAuthentication from './ApiAuthentication';

// Wraps the react-native ImageURISource object adding an
// authentication header to access protected server-side images
export default class ImageURISourceAuth {

  // Build this object from an image data object
  static fromImageObject({id, itemId, typeId}) {
    return new ImageURISourceAuth(Urls.apiImages + `/${typeId}/${itemId}/get/${id}`);
  }

  // Build this object from a url
  static fromUrl(url) {
    return new ImageURISourceAuth(url);
  }


  constructor(url) {
    this.uri = url;
    this.headers = {Authorization: ApiAuthentication.getSimpleAuthenticationToken()};
    this.cache = Const.ImageURISource.cachingPolicy;
  }

  uri: undefined;
  headers: undefined;
  cache: undefined;

}