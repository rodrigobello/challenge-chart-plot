import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactHighcharts from 'react-highcharts';

import config from './Utils/ChartConfig';
import './LineChart.css';


/**
 * This component use the highcharts library to plot a line chart, based on a series list. To be
 * more precise, it uses the react-highcharts *dependency, which is already integrated with
 * highcharts.
 *
 * By using a unique separated component to plot the chart, I can reuse it multiple times. And
 * if I want my line charts to be plotted by  *another dependency (like react-vis or vx), I just
 * need to update this component.
 */
class LineChart extends Component {
  shouldComponentUpdate(nextProps) {
    // Component will only re-rendered when the "Generate Chart" button is pressed
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
/**
 * https://www.highcharts.com/docs/chart-concepts/series
 */
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
