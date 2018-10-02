class ParseException {
  constructor(message) {
    this.errors = [message];
    this.name = 'ParseException';
  }
}

class EventProcessorException {
  constructor(errors) {
    this.errors = errors;
    this.name = 'EventProcessorException';
  }
}

export {
  ParseException,
  EventProcessorException,
};
