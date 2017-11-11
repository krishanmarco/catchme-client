/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';



export function denormObj(object) {
  const mappedApiInput = {};

  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++)
    _.set(mappedApiInput, keys[i], object[keys[i]]);

  return mappedApiInput;
}



export function seconds() {
  return Math.floor(Date.now() / 1000);
}

export function compareTimeSmaller(date1, date2) {
  const normalizedDate1 = new Date(date1);
  normalizedDate1.setFullYear(0, 0, 0);

  const normalizedDate2 = new Date(date2);
  normalizedDate2.setFullYear(0, 0, 0);

  return normalizedDate1 < normalizedDate2;
}

export function boolToString(bool) {
  return bool ? '1' : '0';
}

export function stringToBool(str) {
  return str == '1';
}

export function unOrderedTextMatch(ucSearchWords, ucMatchString) {
  // For each word in the searchWords check if
  // the matchString contains that word
  // Eg: 'BENCH PRESS' will match 'PRESS BENCH'
  for (var p = 0; p < ucSearchWords.length; p++) {
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
  var result = [];

  // Set the search string to uppercase and get all its words
  var searchWords = searchString.toUpperCase().split(" ");

  // Iterate each element and filter accordingly
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // get and prepare the second text string
    // for the text search process
    var matchString = getTextFromElementFunction(element).toUpperCase();

    // If the i[th] element passes the filter
    // then push it onto the result
    if (unOrderedTextMatch(searchWords, matchString))
      result.push(element);
  }

  return result;
}


export function arrayFind(elements, finderFunction) {
  for (var i = 0; i < elements.length; i++) {
    if (finderFunction(elements[i]))
      return elements[i];
  }
  return null;
}


export function arrayClean(elements, deleteValue) {
  for (var i = 0; i < elements.length; i++) {
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

export function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


export function timeToDate(intTimestamp) {
  var moment = require('moment');
  var date = moment(intTimestamp);
  return date.format("MMMM Do YYYY, h:mm:ss a");
}


export function strtr(string, replacePairs) {
  var str = string, key, re;
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