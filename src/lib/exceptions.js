class Exception {
  constructor(message) {
    this.message = message;
  }
}

class ParseException extends Exception {
  constructor(message) {
    super(message);
    this.name = 'ParseException';
  }
}

class EventProcessorException extends Exception {
  constructor(message) {
    super(message);
    this.name = 'EventProcessorException';
  }
}

export {
  ParseException,
  EventProcessorException,
};
