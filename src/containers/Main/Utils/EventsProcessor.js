/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { EventProcessorException } from './Exceptions';

const capitalizeString = str => str.toLowerCase()
  .split(' ')
  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');

const formatString = str => capitalizeString(str.split('_').join(' '));

export default class EventsProcessor {
  constructor(events) {
    this.process = {
      status: 'idle',
      errors: [],
    };
    this.run(events);
  }

  start(e) {
    this.process = {
      ...this.process,
      status: 'inProcess',
      min: e.timestamp,
      groups: e.group,
      items: e.select,
    };
  }

  data(e, i) {
    if (this.process.range) {
      if (e.timestamp < this.process.range.begin || e.timestamp > this.process.range.end) {
        console.warn(`Data out of the specified range on event ${i + 1} (timestamp: ${e.timestamp}).`);
        return;
      }
    }
    if (this.process.min > e.timestamp) {
      this.process.min = e.timestamp;
    }
    const time = e.timestamp - this.process.min;
    let series = this.process.groups.map(g => e[g]);
    series = series.sort().reverse().join('_');
    this.process.items.forEach((item) => {
      const name = `${series}_${item}`;
      if (!this.process.data) {
        this.process.data = {};
      }
      if (!this.process.data[name]) {
        this.process.data[name] = [];
      }
      this.process.data[name].push([time, e[item]]);
    });
  }

  span(e) {
    this.process.range = {
      begin: e.begin,
      end: e.end,
    };
  }

  stop() {
    if (!this.process.data) {
      this.process.errors.push('No date to display. (Warning: If an event of type "span" was specified, it may have limited the "data" events to 0)');
      return;
    }
    this.process.status = 'ready';
  }

  run(events) {
    events.forEach((e, i) => {
      switch (e.type) {
        case 'start':
          if (this.process.status === 'inProcess') {
            this.process.errors.push(`Event ${i + 1}: Can't start a new streak of events before stopping the previous one.`);
            break;
          }
          this.start(e);
          break;
        case 'data':
          this.validateProcess(e.type, i);
          this.data(e, i);
          break;
        case 'span':
          this.validateProcess(e.type, i);
          this.span(e);
          break;
        case 'stop':
          this.validateProcess(e.type, i);
          this.stop();
          break;
        default:
          this.process.errors.push(`Event ${i + 1}: Invalid event type '${e.type}'.`);
          break;
      }
    });
  }

  validateProcess(type, index) {
    if (this.process.status !== 'inProcess') {
      this.process.errors.push(`Event ${index + 1}: Unable to process events of type '${type}' before an event of type 'start'.`);
      throw new EventProcessorException(this.process.errors);
    }
  }

  requestSeries() {
    if (this.process.errors.length > 0) {
      throw new EventProcessorException(this.process.errors);
    }
    if (this.process.status !== 'ready') {
      console.warn("WARNING: Although it's not necessary, it is a good practice to specify a 'stop' event.");
    }
    const data = Object.keys(this.process.data);
    const series = [];
    data.forEach((d) => {
      series.push({
        name: formatString(d),
        data: this.process.data[d],
      });
    });
    return series;
  }
}
