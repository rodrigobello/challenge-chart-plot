import { ParseException } from '../exceptions';

/**
 * Use the JSON.parse() method to parses a JSON string.
 *
 * @param {string}  input   String to be parsed to a valid JSON.
 *
 * @throws {ParseException}   Thrown when unable to parse.
 * @return {Object}   The JSON for the string.
 */
const safeJsonParser = (input) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    throw new ParseException('Unable to parse input. [Hint: Check if the JSON is a valid one!]');
  }
};


/**
 * Use the eval() method to parses an **INVALID** JSON string.
 *
 * @param {string}  input   String to be parsed to a valid JSON.
 *
 * @throws {ParseException}   Thrown when unable to parse.
 * @return {Object}   The JSON for the string.
 */
const unsafeJsonParser = (input) => {
  try {
    return eval(`(${input})`);
  } catch (e) {
    throw new ParseException('Unable to parse input.');
  }
};


/**
 * This function receives the user input (as an arbitrary sequence of events) and returns
 * a array with the events (as objects).
 *
 * @param {string}  input   String to be parsed to the JSON's array.
 * @param {string}  [unsafe=false]   Flag to decide which parsing function will be used.
 *
 * @throws {ParseException}   Thrown when unable to parse.
 * @return {Object[]}   The array with JSONs for the string.
 */
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
