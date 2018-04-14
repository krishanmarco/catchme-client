/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './ApiAuthentication';
import {Const} from '../../Config';


export type TImageURISourceAuth = {
	uri: string,                        // Url of the image
	headers: { authorization: string },   // Catch me authorization header of the request
	cache: string,                      // Caching policy (Defined in Config.js)
};


// Wraps the react-native ImageURISource object adding an
// authentication header to access protected server-side images
export default class ImageURISourceAuth {
	
	// Build this object from a url
	static fromUrl(url) {
		return new ImageURISourceAuth(url + '.png');
	}
	
	
	constructor(uri) {
		this.uri = uri;
		this.headers = {Authorization: ApiAuthentication.getSimpleAuthenticationToken()};
		this.cache = Const.imagesCachingPolicy;
	}
	
	uri: null;
	headers: null;
	cache: null;
	
}