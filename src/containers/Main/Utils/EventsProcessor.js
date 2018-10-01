const capitalizeString = str => str.toLowerCase()
  .split(' ')
  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');

const formatString = str => capitalizeString(str.split('_').join(' '));

export default class EventsProcessor {
  constructor(events) {
    this.run(events);
  }

  run(events) {
    events.forEach((e) => {
      switch (e.type) {
        case 'start':
          this.init(e);
          break;
        case 'data':
          this.attachData(e);
          break;
        case 'span':
          // this.setRange(e);
          break;
        case 'stop':
          this.terminate();
          break;
        default:
          // Throw Exception: already processing an event list
          break;
      }
    });
  }

  init(e) {
    if (this.process) {
      this.process.status = 'failed';
      this.process.error.push('Tried to start a new event list before stopping the current one');
      // Throw Exception: already processing an event list
      return;
    }
    this.process = {
      status: 'inProcess',
      data: {},
      min: e.timestamp,
      errors: [],
      groups: e.group,
      items: e.select,
    };
  }

  attachData(e) {
    if (this.process.range) {
      if (e.timestamp < this.process.range['0'] || e.timestamp > this.process.range.min['0']) {
        this.process.error.push('Out of range datatype');
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
      if (!this.process.data[name]) {
        this.process.data[name] = [];
      }
      this.process.data[name].push([time, e[item]]);
    });
  }

  terminate() {
    this.process.status = 'ready';
  }

  requestSeries() {
    if (this.process.status === 'ready') {
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
    return this.process.errors;
  }
}
