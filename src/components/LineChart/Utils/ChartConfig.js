function colorfulLabel() {
  return `<span style="color:${this.color};">${this.name}</span>`;
}

export default {
  chart: {
    style: {
      fontFamily: 'inherit',
    },
    marginLeft: 30,
  },
  title: {
    text: null,
  },
  yAxis: {
    title: {
      text: null,
    },
    labels: {
      enabled: false,
    },
    gridLineWidth: 2,
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      hour: '%I %p',
      minute: '%I:%M %p',
    },
    lineWidth: 2,
    labels: {
      style: {
        fontSize: '15px',
      },
    },
  },
  legend: {
    labelFormatter: colorfulLabel,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    symbolHeight: 16,
    symbolWidth: 16,
    symbolRadius: 10,
    itemMarginBottom: 10,
    itemStyle: {
      font: 'Source Sans Pro, sans-serif',
    },
  },
  plotOptions: {
    series: {
      allowPointSelect: false,
    },
    line: {
      marker: {
        symbol: 'circle',
        radius: 8,
      },
    },
  },
  credits: {
    enabled: false,
  },
  series: [{
    name: 'Linux Chrome Min Response Time',
    data: [0.1, 0.2],
  }, {
    name: 'Linux Chrome Max Response Time',
    data: [1.3, 0.9],
  }, {
    name: 'Mac Chrome Min Response Time',
    data: [0.2, 0.1],
  }, {
    name: 'Mac Chrome Max Response Time',
    data: [1.2, 1.0],
  }, {
    name: 'Linux Firefox Min Response Time',
    data: [0.1, 0.3],
  }, {
    name: 'Linux Firefox Max Response Time',
    data: [1.0, 1.4],
  }, {
    name: 'Mac Firefox Min Response Time',
    data: [0.3, 0.2],
  }, {
    name: 'Mac Firefox Max Response Time',
    data: [1.2, 1.1],
  }],
};
