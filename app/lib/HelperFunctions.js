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
	return urlUpper.startsWith('HTTPS://') || urlUpper.startsWith('HTTP://');
}

export function validSource(source) {
	return !_.isEmpty(_.get(source, 'uri', null));
}