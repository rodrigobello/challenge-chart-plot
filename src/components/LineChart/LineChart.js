import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactHighcharts from 'react-highcharts';

import config from './Utils/ChartConfig';
import './LineChart.css';


class LineChart extends Component {
  shouldComponentUpdate(nextProps) {
    const { series } = this.props;
    return series !== nextProps.series;
  }

  render() {
    const { series } = this.props;
    if (series) {
      config.series = series;
    }
    return (
      <div className="linechart-container">
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

LineChart.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.number.isRequired,
        ).isRequired,
      ),
    }),
  ),
};

LineChart.defaultProps = {
  series: null,
};

export default LineChart;
