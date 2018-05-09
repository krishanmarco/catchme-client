/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from "../daos/DaoLocation";
import moment from 'moment';
import ObjectCache from "./ObjectCache";
import {boolToIntString, intStringToBool} from '../HelperFunctions';
import {t} from "../i18n/Translations";
import type {TLocation} from "../daos/DaoLocation";


// A location string-timing has the following shape
// '
//   000010110100011101000011                // first24group -> Monday
//   000010110100011101000011                // second24group -> Tuesday
//   000010110100011101000011                // third24group -> Wednesday
//   000010110100011101000011                // fourth24group -> Thursday
//   000010110100011101000011                // fifth24group -> Friday
//   000010110100011101000011                // sixth24group -> Saturday
//   000010110100011101000011                // seventh24group -> Sunday
// '
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
	static strWeekDefault = new Array(24 * 7).fill().map(i => 0).join('');
	static boolDayDefault = new Array(24).fill().map(i => 0).map(i => intStringToBool(i));

	static buildFromLocation(location: TLocation) {
		return ObjectCache.get(location, 'ManagerWeekTimings',
			() => new ManagerWeekTimings(DaoLocation.gTimings(location))
		);
	}


	// '0001011101...' => [[false, false, ...], [true, false, true...], ...]
	static mapStrTimingsToBoolTimings(strWeekTimings: string = '') {
		strWeekTimings = _.chunk(strWeekTimings.split(''), 24);
		return strWeekTimings.map(day => day.map(intStringToBool));
	}

	// [[false, false, ...], [true, false, true...], ...] => '0001011101...'
	static mapBoolTimingsToStr(boolWeekTimings) {
		return boolWeekTimings
			.map(boolDayTimings => boolDayTimings.map(boolToIntString).join(''))
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




	constructor(strWeekTimings) {
		this.boolWeekTimings = ManagerWeekTimings.mapStrTimingsToBoolTimings(strWeekTimings);
	}

	boolWeekTimings: null;
	rangeWeekTimings: null;


	getBoolWeekTimings() {
		return this.boolWeekTimings;
	}

	setBoolWeekTimings(newBoolWeekTimings: Array<Boolean>) {
		this.boolWeekTimings = newBoolWeekTimings;
		this.rangeWeekTimings = null;
	}

	getLazyRangeWeekTimings() {
		if (this.rangeWeekTimings == null)
			this.rangeWeekTimings = ManagerWeekTimings._mapBoolTimingsToRangeTimings(this.boolWeekTimings);

		return this.rangeWeekTimings;
	}


	_currentTimeIndex() {
		return new Date().getHours();
	}

	_rangeCurrentDayArray() {
		// Important, using (new Date()).getDay() the first day of
		// the week is sunday so sunday will be index 0 so +6 % 7
		// to shift to the right by one, now monday == 0
		return this.rangeTimingsInDay((new Date().getDay() + 6) % 7);
	}

	// Maps a timing int 8 to a string '08:00'
	_toStringRangeTimeInt(float) {
		let m = moment(0);
		m.hour(Math.floor(float));
		m.minute(Math.trunc((float % 1) * 100));
		return m.format('HH:mm');
	}

	// Maps a timing range [8, 17] to a string '08:00 - 17.00'
	_toStringRangeTime(rangeTime) {
		// Index 0 and 1 of rangeTime always have to be defined
		return `${this._toStringRangeTimeInt(rangeTime[0])} - ${this._toStringRangeTimeInt(rangeTime[1])}`;
	}



	boolTimingsInDay(day) {
		return _.get(this.boolWeekTimings, `[${day}]`, ManagerWeekTimings.boolDayDefault);
	}

	rangeTimingsInDay(day) {
		return _.get(this.getLazyRangeWeekTimings(), `[${day}]`, []);
	}

	isOpen() {
		return this._rangeCurrentDayArray()[this._currentTimeIndex()];
	}


	// Maps the boolWeekTimings [[false, true, false, ...], ...] to the string-timing format
	toString() {
		return ManagerWeekTimings.mapBoolTimingsToStr(this.getBoolWeekTimings());
	}

	toStringIsOpen() {
		return this.isOpen() ? t('t_location_open') : t('t_location_closed');
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

