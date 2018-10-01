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
      day: '%H:%M',
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
  tooltip: {
    headerFormat: '',
  },
  credits: {
    enabled: false,
  },
  series: [{
    type: 'line',
    name: 'No Data',
    data: [],
  }],
};
