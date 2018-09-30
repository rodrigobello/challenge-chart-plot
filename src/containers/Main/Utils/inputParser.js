import { ParseException } from './Exceptions';

const safeJsonParser = (input) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    throw new ParseException('Unable to parse input. [Hint: Check if the JSON is a valid one!]');
  }
};

const unsafeJsonParser = (input) => {
  try {
    return eval(`(${input})`);
  } catch (e) {
    throw new ParseException('Unable to parse input.');
  }
};

const inputParser = (input, safe = true) => {
  if (safe) {
    return input.split('\n').map(s => safeJsonParser(s));
  }
  return input.split('\n').map(s => unsafeJsonParser(s));
};

export default inputParser;
