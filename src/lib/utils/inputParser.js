import { ParseException } from '../exceptions';

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

const inputParser = (input, unsafe = false) => {
  let jsonList;
  if (unsafe) {
    jsonList = input.split('\n').map((s) => {
      if (s) {
        return unsafeJsonParser(s);
      }
      return null;
    });
  } else {
    jsonList = input.split('\n').map((s) => {
      if (s) {
        return safeJsonParser(s);
      }
      return null;
    });
  }
  return jsonList.filter(j => j != null);
};

export default inputParser;
