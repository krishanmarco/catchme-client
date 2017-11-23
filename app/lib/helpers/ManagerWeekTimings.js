/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import moment from 'moment';
import {stringToBool, boolToString} from '../HelperFunctions';
import DaoLocation from "../daos/DaoLocation";
import ObjectCache from "./ObjectCache";


// A location string-timing has the following shape
// '000010110100011101000011               // first24group -> Monday
// 000010110100011101000011                // second24group -> Tuesday
// 000010110100011101000011                // third24group -> Wednesday
// 000010110100011101000011                // fourth24group -> Thursday
// 000010110100011101000011                // fifth24group -> Friday
// 000010110100011101000011                // sixth24group -> Saturday
// 000010110100011101000011'               // seventh24group -> Sunday
//
// A location bool-array-timing has the following shape
// [
//   [ true, false, true, true, ... ],        // idx(0) -> Monday
//   [ true, false, true, true, ... ],        // idx(1) -> Tuesday
//   [ true, false, true, true, ... ],        // idx(2) -> Wednesday
//   [ true, false, true, true, ... ],        // idx(3) -> Thursday
//   [ true, false, true, true, ... ],        // idx(4) -> Friday
//   [ true, false, true, true, ... ],        // idx(5) -> Saturday
//   [ true, false, true, true, ... ],        // idx(5) -> Sunday
// ]
//
// A location range-array-timing has the following shape
// [
//   [ [1, 4], [4, 10], [3, 3] ],             // idx(0) -> Monday
//   [ [0, 5], [6, 11], [12, 13] ],           // idx(1) -> Tuesday
//   [ [1, 6], [6, 12], [13, 14] ],           // idx(2) -> Wednesday
//   [ [1, 5]], [[0, 2] ],                    // idx(3) -> Thursday
//   [ ],                                     // idx(4) -> Friday
//   [ [0, 3] ]                               // idx(5) -> Saturday
//   [ [0, 3], [5, 8] ]                       // idx(5) -> Sunday
// ]
export default class ManagerWeekTimings {
  static intDayDefault = new Array(24).fill().map(i => false);
  static boolDayDefault = ManagerWeekTimings.intDayDefault.map(i => false);

  static buildFromLocation(location) {
    return ObjectCache.get(location, 'ManagerWeekTimings',
        () => new ManagerWeekTimings(DaoLocation.gTimings(location))
    );
  }


  // '0001011101...' => [[false, false, ...], [true, false, true...], ...]
  static mapStrTimingsToBoolTimings(strWeekTimings) {
    strWeekTimings = _.chunk(strWeekTimings.split(''), 24);
    return strWeekTimings.map(day => day.map(stringToBool));
  }

  // [[false, false, ...], [true, false, true...], ...] => '0001011101...'
  static mapBoolTimingsToStr(boolWeekTimings) {
    return boolWeekTimings
        .map(boolDayTimings => boolDayTimings.map(boolToString).join(''))
        .join('');
  }

  // [[false, false, ...], [true, false, true...], ...] => [[3, 3], [5, 7], [8, 8]]
  static _mapBoolTimingsToRangeTimings(boolWeekTimings) {
    const rangeResult = [];

    for (let day = 0; day < boolWeekTimings.length; day++) {
      const dayRangeArr = [];
      const dayBoolArr = boolWeekTimings[day];

      let timeRange = [];
      for (let hour = 1; hour < dayBoolArr.length; hour++) {
        const lastHour = hour - 1;
        const thisHour = hour;
        const lastHourTrue = dayBoolArr[lastHour];
        const thisHourTrue = dayBoolArr[thisHour];
        const timeRange0SetTrue = timeRange.length > 0;
        const thisHourIsLastTrue = thisHour === dayBoolArr.length - 1;

        if (!lastHourTrue && !thisHourTrue && !timeRange0SetTrue) {
          continue;
        }

        if (lastHourTrue && thisHourTrue && timeRange0SetTrue) {
          if (thisHourIsLastTrue) {
            timeRange.push(thisHour + 1);
            dayRangeArr.push(timeRange);
            timeRange = [];
          }

          continue;
        }

        if (!lastHourTrue && timeRange0SetTrue)
          throw new Error('ManagerWeekTimings _mapBoolTimingsToRangeTimings: Case should not occur');

        if (lastHourTrue && thisHourTrue && !timeRange0SetTrue) {
          timeRange.push(lastHour);
          continue;
        }

        if (lastHourTrue && !thisHourTrue && timeRange0SetTrue) {
          timeRange.push(thisHour);
          dayRangeArr.push(timeRange);
          timeRange = [];
          continue;
        }

        if (lastHourTrue && !thisHourTrue && !timeRange0SetTrue) {
          dayRangeArr.push([lastHour, thisHour]);
          timeRange = [];
          continue;
        }

        if (!lastHourTrue && thisHourTrue && !timeRange0SetTrue) {
          timeRange.push(thisHour);

          if (thisHourIsLastTrue) {
            timeRange.push(thisHour + 1);
            dayRangeArr.push(timeRange);
            timeRange = [];
          }

          continue;
        }
      }

      rangeResult.push(dayRangeArr);
    }

    return rangeResult;
  }




  constructor(weekTimings) {
    this.boolWeekTimings = ManagerWeekTimings.mapStrTimingsToBoolTimings(weekTimings);
    this.rangeWeekTimings = ManagerWeekTimings._mapBoolTimingsToRangeTimings(this.boolWeekTimings);
  }

  boolWeekTimings: undefined;
  rangeWeekTimings: undefined;


  _currentTimeIndex() {
    let date = new Date();
    return date.getHours();
  }

  _rangeCurrentDayArray() {
    // Important, using (new Date()).getDay() the first day of
    // the week is sunday so sunday will be index 0 so +6 % 7
    // to shift to the right by one, now monday == 0
    return this.rangeTimingsInDay((new Date().getDay() + 6) % 7);
  }

  // Maps a timing int 8 to a string '08:00'
  _toStringRangeTimeInt(float) {
    let m = moment();
    m.hour(Math.floor(float));
    m.minute(Math.ceil((float % 1) * 100));
    return m.format('HH:mm');
  }

  // Maps a timing range [8, 17] to a string '08:00 - 17.00'
  _toStringRangeTime(rangeTime) {
    // Index 0 and 1 of rangeTime always have to be defined
    return `${this._toStringRangeTimeInt(rangeTime[0])} - ${this._toStringRangeTimeInt(rangeTime[1])}`
  }



  getBoolWeekTimings() {
    return this.boolWeekTimings;
  }

  boolTimingsInDay(day) {
    return _.get(this.getBoolWeekTimings(), `[${day}]`, ManagerWeekTimings.boolDayDefault);
  }

  rangeTimingsInDay(day) {
    return _.get(this.getBoolWeekTimings, `[${day}]`, []);
  }

  isOpen() {
    return this._rangeCurrentDayArray()[this._currentTimeIndex()];
  }

  setTimingInDay(dayIndex, timeIndex, boolValue) {
    this.getBoolWeekTimings()[dayIndex][timeIndex] = boolValue;
  }


  // Maps the boolWeekTimings [[false, true, false, ...], ...] to the string-timing format
  toString() {
    return ManagerWeekTimings.mapBoolTimingsToStr(this.getBoolWeekTimings());
  }

  toStringIsOpen() {
    return this.isOpen() ? 'Aperto ora!' : 'Chiuso!';
  }

  toStringRangeCurrentDay() {
    return this._rangeCurrentDayArray()
        .map(this._toStringRangeTime.bind(this))
        .join(', ');
  }

  toStringRangeStatusAndCurrentDay() {
    let str = [];

    let currentDay = this.toStringRangeCurrentDay();
    if (currentDay && currentDay.length > 0)
      str.push(currentDay);

    str.push(this.toStringIsOpen());

    return str.join('\n');
  }

}

