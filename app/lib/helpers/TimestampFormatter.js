/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 12-Apr-18 © **/
import Logger from '../Logger';
import moment from 'moment';
import {t} from '../i18n/Translations';
import type {TMoment} from '../types/Types';

const mNow = moment();
const mTomorrow = moment(new Date()).add(1, 'days');
const mNext6Day = moment(new Date()).add(6, 'days');

const sToday = t('t_today');
const sTomorrow = t('t_tomorrow');
const sYesterday = t('t_yesterday');
const sLast = t('t_last');
const sFrom = t('t_from');
const sTo = t('t_to');


const gStrDay = m => m.format('dddd');
const gStrDate = m => m.format('Do');
const gStrMonth = m => m.format('MMM');
const gStrYear = m => m.format('YYYY');
const gTime = m => m.format('HH:mm');

const tplDayDateMonthYear = (f, t) => `${gStrDay(f)} ${gStrDate(f)} ${gStrMonth(f)} ${gStrYear(f)} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplDayDateMonth = (f, t) => `${gStrDay(f)} ${gStrDate(f)} ${gStrMonth(f)} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplLastDay = (f, t) => `${sLast} ${gStrDay(f)} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplYesterday = (f, t) => `${sYesterday} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplToday = (f, t) => `${sToday} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplTomorrow = (f, t) => `${sTomorrow} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplDay = (f, t) => `${gStrDay(f)} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;
const tplDayDate = (f, t) => `${gStrDay(f)} ${gStrDate(f)} ${sFrom} ${gTime(f)} ${sTo} ${gTime(t)}`;

// Use cases (from - to)
// - 'Monday 26th April 2014 from 09:00 to 18:00'			// If monday of another previous month and year				tplDayDateMonthYear
// - 'Monday 26th April from 09:00 to 18:00'					// If monday of another previous month								tplDayDateMonth
// - 'Last monday from 09:00 to 18:00'								// If monday before today															tplLastDay
// - 'Yesterday from 09:00 to 18:00'									// If yesterday																				tplYesterday
// = 'Today from 09:00 to 18:00'											// If today																						tplToday
// + 'Tomorrow from 09:00 to 18:00'										// If tomorrow																				tplTomorrow
// + 'Monday from 09:00 to 18:00'											// If monday in next 6 days														tplDay
// + 'Monday 26th from 09:00 to 18:00'								// If monday in more than 6 days											tplDayDate
// + 'Monday 26th April from 09:00 to 18:00'					// If monday of another month													tplDayDateMonth
// + 'Monday 26th April 2019 from 09:00 to 18:00'			// If monday of another year													tplDayDateMonthYear
export default class TimestampFormatter {
	static fromTsFormats = {
		sameDay: `[${sToday}], dddd Do`,
		nextDay: `[${sTomorrow}], dddd Do`,
		nextWeek: 'dddd Do',
		lastDay: 'dddd Do',
		lastWeek: 'dddd Do',
		sameElse: 'dddd Do'
	};

	static parseFromDate(fromTs: TMoment) {
		return fromTs.calendar(null, TimestampFormatter.fromTsFormats);
	}

	
	static parseFromTo(fromTs: number, toTs: number) {
		const mFromTs = moment(fromTs * 1000);
		const mToTs = moment(toTs * 1000);

		// If another previous year
		if (mFromTs.isBefore(mNow, 'year'))
			return tplDayDateMonthYear(mFromTs, mToTs);

		// If another previous month
		if (mFromTs.isBefore(mNow, 'month'))
			return tplDayDateMonth(mFromTs, mToTs);

		// If previous week
		if (mFromTs.isBefore(mNow, 'week'))
			return tplLastDay(mFromTs, mToTs);

		// If previous day
		if (mFromTs.isBefore(mNow, 'day'))
			return tplYesterday(mFromTs, mToTs);

		// If same day
		if (mFromTs.isSame(mNow, 'day'))
			return tplToday(mFromTs, mToTs);

		// If another next year
		if (mFromTs.isAfter(mNow, 'year'))
			return tplDayDateMonthYear(mFromTs, mToTs);

		// If another next month
		if (mFromTs.isAfter(mNow, 'month'))
			return tplDayDateMonth(mFromTs, mToTs);

		// If more than 6 days
		if (mFromTs.isAfter(mNext6Day, 'day'))
			return tplDayDate(mFromTs, mToTs);

		// If next 6 days
		if (mFromTs.isAfter(mTomorrow, 'week'))
			return tplDay(mFromTs, mToTs);

		// If tomorrow
		if (mFromTs.isBetween(mNow, mTomorrow, 'day', '(]'))
			return tplTomorrow(mFromTs, mToTs);

		Logger.v(`TimestampFormatter parseFromTo uncalculated from timestamp ${mFromTs}`);

		return tplDayDateMonthYear(mFromTs, mToTs);
	}

}