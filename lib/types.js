// TODO: isArray, isObject, isFunction
// getCaster

const isNumber = val => typeof val === 'number';

const isString = val => typeof val === 'string';

const isBoolean = val => typeof val === 'boolean';


const isArray = val => {
  if(Array.isArray(val) === true) {
    return true;
  } else return false;
};

const isObject = val => typeof val === 'object' && !isArray(val);

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  const string = String(val);
  return string;
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  const bool = Boolean(val);
  return bool;
};

const castToArray = val => {
  if(isArray(val)) return val;
  let array = Array.of(val);
  return array;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  CastError,
  getCaster,
  castToNumber,
  isString, 
  castToString,
  isBoolean,
  castToBoolean,
  isArray,
  castToArray,
  isObject
};
