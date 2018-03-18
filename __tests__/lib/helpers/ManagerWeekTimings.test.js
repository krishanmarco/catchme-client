/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 17/12/17 © **/
import 'react-native';
import ManagerWeekTimings from "../../../app/lib/helpers/ManagerWeekTimings";
import React from 'react';

describe('lib/helpers/ManagerWeekTimings.js', () => {

  const weekStr = [
    '000000000000000000000000',
    '111111111111111111111111',
    '010101010101010101010101',
    '001100110011001100110011',
    '101011101110111011110100',
    '11===01=101=10110=10====',
    '1001'
  ].join('');

  const weekBools = [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true],
    [true, false, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true, true, true, true, false, true, false, false],
    [true, true, false, false, false, false, true, false, true, false, true, false, true, false, true, true, false, false, true, false, false, false, false, false],
    [true, false, false, true]
  ];

  const weekRanges = [
    [],
    [[0, 24]],
    [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20], [21, 22], [23, 24]],
    [[2, 4], [6, 8], [10, 12], [14, 16], [18, 20], [22, 24]],
    [[0, 1], [2, 3], [4, 7], [8, 11], [12, 15], [16, 20], [21, 22]],
    [[0, 2], [6, 7], [8, 9], [10, 11], [12, 13], [14, 16], [18, 19]],
    [[0, 1], [3, 4]]
  ];

  const managerWeekTimings = new ManagerWeekTimings(weekStr);

  test("boolDayDefault", () => {
    expect(ManagerWeekTimings.boolDayDefault)
        .toEqual([
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
        ]);
  });

  test("mapStrTimingsToBoolTimings", () => {
    expect(ManagerWeekTimings.mapStrTimingsToBoolTimings(weekStr))
        .toEqual(weekBools);
  });

  test("mapBoolTimingsToStr", () => {
    expect(ManagerWeekTimings.mapBoolTimingsToStr(weekBools))
        .toEqual(weekStr.replace(/=/g, '0'));
  });

  test("_mapBoolTimingsToRangeTimings", () => {
    expect(ManagerWeekTimings._mapBoolTimingsToRangeTimings(weekBools))
        .toEqual(weekRanges);
  });

  test("_toStringRangeTimeInt", () => {
    expect(managerWeekTimings._toStringRangeTimeInt(8))
        .toEqual('08:00');
    expect(managerWeekTimings._toStringRangeTimeInt(10.30))
        .toEqual('10:30');
    expect(managerWeekTimings._toStringRangeTimeInt(24 + 1 + 0.3))
        .toEqual('01:30');
    expect(managerWeekTimings._toStringRangeTimeInt(24 + 14 + 0.60))
        .toEqual('15:00');
  });

  test("boolTimingsInDay", () => {
    for (let i = 0; i < 7; i++)
      expect(managerWeekTimings.boolTimingsInDay(i))
          .toEqual(weekBools[i]);
  });

  test("rangeTimingsInDay", () => {
    for (let i = 0; i < 7; i++)
      expect(managerWeekTimings.rangeTimingsInDay(i))
          .toEqual(weekRanges[i]);
  });

});