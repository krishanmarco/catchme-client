/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';

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
  return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
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


export function arrayClean(elements, deleteValue) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] == deleteValue) {
      elements.splice(i, 1);
      i--;
    }
  }
  return elements;
}


export function arrayRemove(elements, index) {
  if (index > -1)
    elements.splice(index, 1);
  return elements;
}


export function timeToDate(intTimestamp) {
  const moment = require('moment');
  const date = moment(intTimestamp);
  return date.format("MMMM Do YYYY, h:mm:ss a");
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


export function isFunction(functionToCheck) {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}