import React, { Component } from 'react';
import './Main.css';

import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';

import TextEditor from '../../components/TextEditor/TextEditor';
import LineChart from '../../components/LineChart/LineChart';
import Button from '../../components/UI/Button/Button';

import inputParser from '../../lib/utils/inputParser';
import EventsProcessor from '../../lib/EventsProcessor';

import errorAlertHOC from '../../hoc/errorAlertHOC';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleCharacterInput = this.handleCharacterInput.bind(this);
    this.generateChart = this.generateChart.bind(this);
  }

  handleCharacterInput(input) {
    this.setState({ input });
  }

  generateChart() {
    const { input } = this.state;
    const { alert } = this.props;
    try {
      const eventList = inputParser(input, true);
      const series = (new EventsProcessor(eventList)).requestSeries();
      this.setState({ series });
    } catch (e) {
      alert.show(<div style={{ fontSize: '12px' }}>{e.message}</div>);
    }
  }

  render() {
    const { series } = this.state;
    return (
      <div className="Main">
        <div className="title-section">
          <h1>
            Rodrigo’s Challenge
          </h1>
        </div>
        <div className="input-section">
          <TextEditor handleCharacterInput={this.handleCharacterInput} />
        </div>
        <div className="chart-section">
          <LineChart series={series} />
        </div>
        <div className="button-section">
          <Button color="primary" onClick={this.generateChart}>
            Generate Chart
          </Button>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  alert: PropTypes.shape({
    show: PropTypes.func.isRequired,
  }).isRequired,
};

export default errorAlertHOC(withAlert(Main));
