const {
  isNumber,
  castToNumber,
  getCaster,
  isString,
  castToString,
  isBoolean,
  castToBoolean,
  isArray,
  castToArray,
  isObject,
  isFunction
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('properly tells if a value is a string', () => {
      expect(isString('hello world')).toBeTruthy();
      expect(isString('123')).toBeTruthy();
      expect(isString('true')).toBeTruthy();
      expect(isString(123)).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString([1, 2, 3])).toBeFalsy();
      expect(isString(['1', '2', '3'])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
    });
    it('propely tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('true')).toBeFalsy();
      expect(isBoolean(123)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });
    it('properly tells if a value is an array', () => {
      expect(isArray([1, 2])).toBeTruthy();
      expect(isArray([])).toBeTruthy();
      expect(isArray(9)).toBeFalsy();
      expect(isArray('hello world')).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray(undefined)).toBeFalsy();
      expect(isArray(false)).toBeFalsy();
      expect(isArray(0)).toBeFalsy();
      expect(isArray('')).toBeFalsy();
      expect(isArray(null)).toBeFalsy();
      expect(isArray(undefined)).toBeFalsy();
      expect(isArray(NaN)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });
    it('properly tells if a value is an object', () => {
      expect(isObject([1, 2])).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(9)).toBeFalsy();
      expect(isObject('hello world')).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(undefined)).toBeFalsy();
      expect(isObject(false)).toBeFalsy();
      expect(isObject(0)).toBeFalsy();
      expect(isObject('')).toBeFalsy();
      expect(isObject(null)).toBeTruthy();
      expect(isObject(undefined)).toBeFalsy();
      expect(isObject(NaN)).toBeFalsy();
      expect(isObject({})).toBeTruthy();
      expect(isObject(() => {})).toBeFalsy();
    });
    it('properly tells if a value is a function', () => {
      expect(isFunction([1, 2])).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction(9)).toBeFalsy();
      expect(isFunction('hello world')).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction(undefined)).toBeFalsy();
      expect(isFunction(false)).toBeFalsy();
      expect(isFunction(0)).toBeFalsy();
      expect(isFunction('')).toBeFalsy();
      expect(isFunction(null)).toBeFalsy();
      expect(isFunction(undefined)).toBeFalsy();
      expect(isFunction(NaN)).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(() => {})).toBeTruthy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });
    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(9)).toEqual('9');
      expect(castToString('hello world')).toEqual('hello world');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
      expect(castToString(undefined)).toEqual('undefined');
      expect(castToString([])).toEqual('');
      expect(castToString({})).toEqual('[object Object]');
      expect(castToString(() => {})).toEqual('() => {}');
    });
    it('throws no errors since everything can be converted to a string', () => {
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(9)).toBeTruthy();
      expect(castToBoolean('hello world')).toBeTruthy();
      expect(castToBoolean(true)).toBeTruthy();
      expect(castToBoolean(undefined)).toBeFalsy();
      expect(castToBoolean(false)).toBeFalsy();
      expect(castToBoolean([1, 2])).toBeTruthy();
      expect(castToBoolean([])).toBeTruthy();
      expect(castToBoolean(0)).toBeFalsy();
      expect(castToBoolean('')).toBeFalsy();
      expect(castToBoolean(null)).toBeFalsy();
      expect(castToBoolean(undefined)).toBeFalsy();
      expect(castToBoolean(NaN)).toBeFalsy();
      expect(castToBoolean({})).toBeTruthy();
      expect(castToBoolean(() => {})).toBeTruthy();
    });
    it('throws no error since everything can be converted to a boolean', () => {
    });

    it('can cast values to an array', () => {
      expect(castToArray(9)).toEqual([9]);
      expect(castToArray('hello world')).toEqual(['hello world']);
      expect(castToArray(true)).toEqual([true]);
      expect(castToArray(undefined)).toEqual([undefined]);
      expect(castToArray(false)).toEqual([false]);
      expect(castToArray([1, 2])).toEqual([1, 2]);
      expect(castToArray([])).toEqual([]);
      expect(castToArray(0)).toEqual([0]);
      expect(castToArray('')).toEqual(['']);
      expect(castToArray(null)).toEqual([null]);
      expect(castToArray(NaN)).toEqual([NaN]);
      expect(castToArray({})).toEqual([{}]);
      const funkytion = () => {};
      expect(castToArray(funkytion)).toEqual([funkytion]);
    });
    it('throws no error since everything can be put into an array', () => {
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
    // expect(getCaster(String)).toEqual(castToString);
    // expect(getCaster(Boolean)).toEqual(castToBoolean);
    // expect(getCaster(Array)).toEqual(castToArray);
  });
});
