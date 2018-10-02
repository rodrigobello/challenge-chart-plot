import inputParser from './inputParser';
import ParseException from '../exceptions';

const validJsonEvents = `
{"type": "start", "timestamp": 1519862400000, "select":["min_response_time", "max_response_time"], "group": ["os", "browser"]}
{"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000}
{"type": "data", "timestamp": 1519862400000, "os": "linux", "browser": "chrome", "min_response_time": 0.1, "max_response_time": 1.3}
{"type": "stop", "timestamp": 1519862460000}`;

const invalidJsonEvents = `
{type: 'start', timestamp:1519862400000, select:['min_response_time', 'max_response_time'],'group':['os', 'browser']}
{type: 'span', timestamp:1519862400000, begin: 1519862400000, end: 1519862460000}
{type: 'data', timestamp:1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
{type: 'stop', timestamp: 1519862460000}
`;

const event = {
  type: 'data',
  timestamp: 1519862400000,
  os: 'linux',
  browser: 'chrome',
  min_response_time: 0.1,
  max_response_time: 1.3,
};


it('test safeParser() can parse valid json string to object', () => {
  expect(typeof inputParser(validJsonEvents)).toEqual('object');
});

it('test safeParser() parsed valid string match the json event', () => {
  expect(inputParser(validJsonEvents)[2]).toEqual(event);
});

it('test safeParse() throw an ParseException when tries to parse invalid json', () => {
  expect(() => inputParser(invalidJsonEvents)).toThrow(ParseException);
});

it('test safeParser() ParseException params', () => {
  let thrownError;
  try {
    inputParser(invalidJsonEvents);
  } catch (e) {
    thrownError = e;
  }
  expect(thrownError).toEqual({
    name: 'ParseException',
    message: 'Unable to parse input. [Hint: Check if the JSON is a valid one!]',
  });
});


it('test unsafeParser() can parse valid json string to object', () => {
  expect(typeof inputParser(validJsonEvents, true)).toEqual('object');
});

it('test unsafeParser() parsed valid string match the json event', () => {
  expect(inputParser(validJsonEvents, true)[2]).toEqual(event);
});

it('test unsafeParser() can parse invalid json string to object', () => {
  expect(typeof inputParser(invalidJsonEvents, true)).toEqual('object');
});

it('test unsafeParser() parsed invalid json string match the json event', () => {
  expect(inputParser(invalidJsonEvents, true)[2]).toEqual(event);
});

it('test unsafeParse() throw an ParseException when tries to parse invalid STRING', () => {
  expect(() => inputParser('this is not a json', true)).toThrow(ParseException);
});

it('test unsafeParser() ParseException params', () => {
  let thrownError;
  try {
    inputParser('this is not a json', true);
  } catch (e) {
    thrownError = e;
  }
  expect(thrownError).toEqual({
    name: 'ParseException',
    message: 'Unable to parse input.',
  });
});
