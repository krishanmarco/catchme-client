/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {seconds} from '../HelperFunctions';

export default class DataProvider {
	static CACHE_ALWAYS_VALID = -1;		// If expiryTs of a cached object == CACHE_ALWAYS_VALID then the item is always considered valid
	static CACHE_NEVER_VALID = -2; 		// If expiryTs of a cached object == CACHE_NEVER_VALID then the item is always refreshed

	static cacheIsValid(expiryTs) {
		if (expiryTs === DataProvider.CACHE_NEVER_VALID)
			return false;

		if (expiryTs === DataProvider.CACHE_ALWAYS_VALID)
			return true;

		return seconds() < expiryTs;
	}

}
