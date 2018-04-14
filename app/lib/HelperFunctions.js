/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import flatten from 'flat';

/**
 * Returns '1' if true, else '0'.
 * Loose comparison!
 * @param bool
 * @returns {string}
 */
export function boolToIntString(bool) {
	return bool ? '1' : '0';
}


/**
 * Returns true if '1', else false.
 * Loose comparison!
 * @param str
 * @returns {boolean}
 */
export function intStringToBool(str) {
	return str == '1';
}


/**
 * Replaces a value in a string at a certain index.
 * @param string
 * @param index
 * @param replacement
 * @returns {string}
 */
export function stringReplace(string, index, replacement) {
	return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}


/**
 * Recreates a de-normalized object from a flat object
 * that has lodash keys.
 * {'property1.property2': 'value'} ==> {'property1': {'property2': 'value'}}
 * @param object
 * @returns {{}}
 */
export function denormObj(object) {
	const mappedApiInput = {};

	const keys = Object.keys(object);
	for (let i = 0; i < keys.length; i++)
		_.set(mappedApiInput, keys[i], object[keys[i]]);

	return mappedApiInput;
}


/**
 * Maps an object to the data-structure expected from RnFetchBlob
 * @param object
 * @returns {{}}
 */
export function prepareForMultipart(object = {}) {
	return Object.keys(flatten(object))
		.map(key => ({name: key, data: String(_.get(object, key, ''))}));
}


/**
 * Returns current epoch timestamp
 * @returns {number}
 */
export function seconds() {
	return Math.floor(Date.now() / 1000);
}


/**
 * Compares two timestamps ignoring the date.
 * Parameters can be anything accepted by the Date constructor.
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function compareTimeSmaller(date1, date2) {
	const normalizedDate1 = new Date(date1);
	normalizedDate1.setFullYear(0, 0, 0);

	const normalizedDate2 = new Date(date2);
	normalizedDate2.setFullYear(0, 0, 0);

	return normalizedDate1 < normalizedDate2;
}


/**
 * overrides the values in a with the values in b Object.assign
 * without adding properties that are in b but not in a
 * @param {object} a
 * @param {object} b
 */
export function mergeWithoutExtend(a, b) {
	return _.assign(a, _.omit(b, _.difference(Object.keys(b), Object.keys(a))));
}




export function unOrderedTextMatch(ucSearchWords, ucMatchString) {
	// For each word in the searchWords check if
	// the matchString contains that word
	// Eg: 'BENCH PRESS' will match 'PRESS BENCH'
	for (let p = 0; p < ucSearchWords.length; p++) {
		// if matchString doesn't contain the [p]th word
		if (ucMatchString.indexOf(ucSearchWords[p]) == -1) {
			// The filter is not successful
			return false;
		}
	}

	// ucMatchString contained all
	// words in searchString
	return true;
}


export function filterByUnOrderedTextMatch(elements, searchString, getTextFromElementFunction) {
	// initialize result array
	const result = [];

	// Set the search string to uppercase and get all its words
	const searchWords = searchString.toUpperCase().split(" ");

	// Iterate each element and filter accordingly
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];

		// get and prepare the second text string
		// for the text search process
		const matchString = getTextFromElementFunction(element).toUpperCase();

		// If the i[th] element passes the filter
		// then push it onto the result
		if (unOrderedTextMatch(searchWords, matchString))
			result.push(element);
	}

	return result;
}


export function arrayFind(elements, finderFunction) {
	for (let i = 0; i < elements.length; i++) {
		if (finderFunction(elements[i]))
			return elements[i];
	}
	return null;
}

export function arrayCleanAndVerify(array: ?array, dotField: string) {
	if (!_.isArray(array))
		return array;
	return _.uniqBy(arrayClean(array, dotField), dotField);
}


// This function filters an array by removing all
// items that null or undefined in a certain field
export function arrayClean(array: ?Array, dotField: string) {
	if (!_.isArray(array))
		return array;

	return array.filter(item => _.get(item, dotField, null) != null);
}



export function strtr(string, replacePairs) {
	let str = string, key, re;
	for (key in replacePairs) {
		if (replacePairs.hasOwnProperty(key)) {
			re = new RegExp(key, "g");
			str = str.replace(re, replacePairs[key]);
		}
	}
	return str;
}


export function mapIdsToObjects(idList, objectList, getIdFromObject) {
	const result = [];

	for (let i = 0; i < objectList.length; i++) {
		const object = objectList[i];
		const objectId = getIdFromObject(object);

		const indexOf = idList.indexOf(objectId);
		if (indexOf !== -1)
			result[indexOf] = object;
	}

	// Clean any empty indexes (happens in case objectList didn't contain objectId)
	return _.compact(result);
}

export function isValidUrl(url) {
	if (!url)
		return false;

	const urlUpper = url.toUpperCase();
	return urlUpper.startsWith("HTTPS://") || urlUpper.startsWith("HTTP://");
}