import React, { Component } from 'react';
import './Main.css';

import { withAlert } from 'react-alert';

import TextEditor from '../../components/TextEditor/TextEditor';
import LineChart from '../../components/LineChart/LineChart';
import Button from '../../components/UI/Button/Button';

import inputParser from './Utils/inputParser';
import EventsProcessor from './Utils/EventsProcessor';

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
      const eventList = inputParser(input, false);
      const series = (new EventsProcessor(eventList)).requestSeries();
      this.setState({ series });
    } catch (e) {
      e.errors.forEach(message => alert.show(<div style={{ fontSize: '12px' }}>{message}</div>));
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

export default errorAlertHOC(withAlert(Main));
