import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactHighcharts from 'react-highcharts';

import config from './Utils/ChartConfig';
import './LineChart.css';


class LineChart extends Component {
  shouldComponentUpdate(nextProps) {
    const { events } = this.props;
    return events !== nextProps.events;
  }

  render() {
    return (
      <div className="linechart-container">
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

LineChart.propTypes = {
  events: PropTypes.arrayOf().isRequired,
};

export default LineChart;
