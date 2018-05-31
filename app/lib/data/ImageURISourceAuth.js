/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiAuthentication from './ApiAuthentication';
import {Const} from '../../Config';
import type {TImageSource} from '../types/Types';

export type TImageURISourceAuth = TImageSource & {
	headers: { authorization: string },   // Catch me authorization header of the request
};


// Wraps the react-native ImageURISource object adding an
// authentication header to access protected server-side images
export default class ImageURISourceAuth {
	
	// Build this object from a url
	static fromUrl(url) {
		return new ImageURISourceAuth(url);
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