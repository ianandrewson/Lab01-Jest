const {
  isNumber,
  castToNumber,
  getCaster,
  isString,
  castToString,
  isBoolean
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

    });
    it('properly tells if a value is an object', () => {

    });
    it('properly tells if a value is a function', () => {

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

    });
    it('throws if value is not castable to a boolean', () => {

    });

    it('can cast values to an array', () => {

    });
    it('throws if value is not castable to an array', () => {

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
