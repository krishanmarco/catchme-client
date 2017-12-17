/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 17/12/17 © **/
import React from 'react';
import 'react-native';
import {
  boolToIntString,
  intStringToBool,
  stringReplace,
  denormObj,
  compareTimeSmaller,
  mergeWithoutExtend
} from '../../app/lib/HelperFunctions';

describe('lib/HelperFunctions.js', () => {

  test("boolToIntString", () => {
    expect(boolToIntString(true)).toBe('1');
    expect(boolToIntString(false)).toBe('0');
    expect(boolToIntString(1)).toBe('1');
    expect(boolToIntString(0)).toBe('0');
  });


  test("intStringToBool", () => {
    expect(intStringToBool('1')).toBe(true);
    expect(intStringToBool('0')).toBe(false);
    expect(intStringToBool(1)).toBe(true);
    expect(intStringToBool(0)).toBe(false);
  });


  test("stringReplace", () => {
    const str = "Krishan Marco Madan";
    expect(stringReplace(str, 0, 'x')).toBe('xrishan Marco Madan');
    expect(stringReplace(str, str.length - 1, 'x')).toBe('Krishan Marco Madax');
    expect(stringReplace(str, str.length, 'x')).toBe('Krishan Marco Madanx');
    expect(stringReplace(str, str.length - 2, 'xyz')).toBe('Krishan Marco Madxyz');
    expect(stringReplace(str, 3, 'Xyz')).toBe('KriXyzn Marco Madan');
  });


  test('denormObj', () => {
    const normalizedObj1 = {'a.b.c': 'xyz'};
    const denormalizedObj1 = {a: {b: {c: 'xyz'}}};
    expect(denormObj(normalizedObj1)).toEqual(denormalizedObj1);

    const normalizedObj2 = {'abc': 123};
    const denormalizedObj2 = {'abc': 123};
    expect(denormObj(normalizedObj2)).toEqual(denormalizedObj2);

    const normalizedObj3 = {'abc.xyz': 123, 'abc.xyz1': 234};
    const denormalizedObj3 = {'abc': {'xyz': 123, 'xyz1': 234}};
    expect(denormObj(normalizedObj3)).toEqual(denormalizedObj3);

    const normalizedObj4 = {'abc.xyz': 123, 'abc.xyz1': 234, abc: {xyz: 456}};
    const denormalizedObj4 = {'abc': {'xyz': 456}};
    const denormalizedObjNot4 = {'abc': {'xyz': 456, 'xyz1': 234}};
    expect(denormObj(normalizedObj4)).toEqual(denormalizedObj4);
    expect(denormObj(normalizedObj4)).not.toEqual(denormalizedObjNot4);
  });


  test('compareTimeSmaller', () => {
    expect(compareTimeSmaller(1513544488000, 1513544488001)).toBe(true);
    expect(compareTimeSmaller(1513544488001, 1513544488000)).toBe(false);
    expect(compareTimeSmaller(1263949200, 971136000000)).toBe(false);
    expect(compareTimeSmaller(new Date(), new Date(new Date().getTime() + 10000))).toBe(true);
    expect(compareTimeSmaller(new Date(), new Date(new Date().getTime() - 10000))).toBe(false);
    expect(compareTimeSmaller(1263949200, new Date(new Date().getTime() - 10000))).toBe(true);
    expect(compareTimeSmaller(new Date(), 1513544488001)).toBe(false);
  });


  test('mergeWithoutExtend', () => {
    const a1 = {a: 'a', b: 'b'};
    const b1 = {b: 'b1', c: 'c1'};
    const res1 = {a: 'a', b: 'b1'};
    expect(mergeWithoutExtend(a1, b1)).toEqual(res1);

    const a2 = {a: 'a1', b: null};
    const b2 = {b: 'b2', a: undefined};
    const res2 = {a: undefined, b: 'b2'};
    expect(mergeWithoutExtend(a2, b2)).toEqual(res2);

    const a3 = {a: 'a3'};
    const b3 = {c: 'c3'};
    const res3 = {a: 'a3'};
    expect(mergeWithoutExtend(a3, b3)).toEqual(res3);
  });

});