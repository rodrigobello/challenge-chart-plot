import EventsProcessor from './EventsProcessor';
import EventProcessorException from './exceptions';

const events = [
  {
    type: 'start',
    timestamp: 1519862400000,
    select: ['min_response_time', 'max_response_time'],
    group: ['os', 'browser'],
  },
  {
    type: 'span',
    timestamp: 1519862400000,
    begin: 1519862400000,
    end: 1519862460000,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'linux',
    browser: 'chrome',
    min_response_time: 0.1,
    max_response_time: 1.3,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'mac',
    browser: 'chrome',
    min_response_time: 0.2,
    max_response_time: 1.2,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'mac',
    browser: 'firefox',
    min_response_time: 0.3,
    max_response_time: 1.2,
  },
  {
    type: 'data',
    timestamp: 1519862400000,
    os: 'linux',
    browser: 'firefox',
    min_response_time: 0.1,
    max_response_time: 1.0,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'linux',
    browser: 'chrome',
    min_response_time: 0.2,
    max_response_time: 0.9,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'mac',
    browser: 'chrome',
    min_response_time: 0.1,
    max_response_time: 1.0,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'mac',
    browser: 'firefox',
    min_response_time: 0.2,
    max_response_time: 1.1,
  },
  {
    type: 'data',
    timestamp: 1519862460000,
    os: 'linux',
    browser: 'firefox',
    min_response_time: 0.3,
    max_response_time: 1.4,
  },
  {
    type: 'stop',
    timestamp: 1519862460000,
  },
];

const randomElement = array => array[Math.floor(Math.random() * array.length)];

// Testing valid event list
it('test EventsProcessor can process a valid list of events', () => {
  const processor = new EventsProcessor(events);
  expect(processor.process.status).toBe('ready');
});


//  PROCESS ANY EVENT 'TYPE' BEFORE THE 'START' EVENT:
it('test EventsProcessor exception type while trying to process any event before the "start"', () => {
  expect(() => new EventsProcessor([
    {
      type: randomElement(['span', 'data', 'stop']),
      timestamp: 1519862460000,
    },
  ])).toThrow(EventProcessorException);
});

it('test EventsProcessor exception message while trying to process "data" event before the "start"', () => {
  const eventType = randomElement(['span', 'data', 'stop']);
  let thrownError;
  try {
    return new EventsProcessor([
      {
        type: eventType,
        timestamp: 1519862460000,
      },
    ]);
  } catch (e) {
    thrownError = e;
  }
  return expect(thrownError).toEqual({
    name: 'EventProcessorException',
    message: `Event 1: Unable to process events of type *${eventType}* before an event of type *start*.`,
  });
});

//  PROCESS EVENT 'START' BEFORE THE 'STOP' EVENT:
it('test EventsProcessor exception type while trying to process a "start" event before *stop* the previous one', () => {
  expect(() => new EventsProcessor([
    {
      type: 'start',
      timestamp: 1519862400000,
    },
    {
      type: 'start',
      timestamp: 1519862400000,
    },
  ])).toThrow(EventProcessorException);
});


it('test EventsProcessor exception message while trying to process a "start" event before *stop* the previous one', () => {
  let thrownError;
  try {
    return new EventsProcessor([
      {
        type: 'start',
        timestamp: 1519862400000,
      },
      {
        type: 'start',
        timestamp: 1519862400000,
      },
    ]);
  } catch (e) {
    thrownError = e;
  }
  return expect(thrownError).toEqual({
    name: 'EventProcessorException',
    message: "Event 2: Can't start a new streak of events before stopping the previous one.",
  });
});

//  PROCESS EVENTS THAT ENDS WITHOUT DATA:
it('test EventsProcessor exception type while trying to process a stop without any data', () => {
  expect(() => new EventsProcessor([
    {
      type: 'start',
      timestamp: 1519862400000,
    },
    {
      type: 'stop',
      timestamp: 1519862460000,
    },
  ])).toThrow(EventProcessorException);
});

it('test EventsProcessor exception type while trying to process a stop without any valid data (limited by range)', () => {
  expect(() => {
    const limitedRangeEvents = [...events];
    limitedRangeEvents[1].begin = 1519869999999;
    return new EventsProcessor(limitedRangeEvents);
  }).toThrow(EventProcessorException);
});

it('test EventsProcessor exception message while trying to process a stop without any data', () => {
  let thrownError;
  try {
    return new EventsProcessor([
      {
        type: 'start',
        timestamp: 1519862400000,
      },
      {
        type: 'stop',
        timestamp: 1519862460000,
      },
    ]);
  } catch (e) {
    thrownError = e;
  }
  return expect(thrownError).toEqual({
    name: 'EventProcessorException',
    message: 'Unable to process a stop when no event of the type *data* was given. (Warning: If an event of type *span* was specified, it may have limited the *data* events to 0)',
  });
});

it('test EventsProcessor exception message while trying to process a stop without any valid data (limited by range)', () => {
  let thrownError;
  try {
    const limitedRangeEvents = [...events];
    limitedRangeEvents[1].begin = 1519869999999;
    return new EventsProcessor(limitedRangeEvents);
  } catch (e) {
    thrownError = e;
  }
  return expect(thrownError).toEqual({
    name: 'EventProcessorException',
    message: 'Unable to process a stop when no event of the type *data* was given. (Warning: If an event of type *span* was specified, it may have limited the *data* events to 0)',
  });
});

//  PROCESS INVALID TYPE OF EVENT:
it('test EventsProcessor exception type while trying to process a not valid type of event', () => {
  expect(() => new EventsProcessor([
    {
      type: 'testing',
      timestamp: 1519862400000,
    },
  ])).toThrow(EventProcessorException);
});

it('test EventsProcessor exception message while trying to process a stop without any data', () => {
  let thrownError;
  try {
    return new EventsProcessor([
      {
        type: 'testing',
        timestamp: 1519862400000,
      },
    ]);
  } catch (e) {
    thrownError = e;
  }
  return expect(thrownError).toEqual({
    name: 'EventProcessorException',
    message: 'Event 1: Invalid event type *testing*.',
  });
});
