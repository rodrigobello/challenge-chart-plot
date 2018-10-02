import { ParseException, EventProcessorException } from './exceptions';

it('test ParseException type', () => {
  const t = () => {
    throw new ParseException('some error');
  };
  expect(t).toThrow(ParseException);
});

it('test EventProcessorException type', () => {
  const t = () => {
    throw new EventProcessorException('another error');
  };
  expect(t).toThrow(EventProcessorException);
});
