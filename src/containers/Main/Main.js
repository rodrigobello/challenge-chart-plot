import React, { Component } from 'react';
import './Main.css';

import TextEditor from '../../components/TextEditor/TextEditor';
import LineChart from '../../components/LineChart/LineChart';
import Button from '../../components/UI/Button/Button';

import inputParser from './Utils/inputParser';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      events: [],
    };
    this.handleCharacterInput = this.handleCharacterInput.bind(this);
    this.generateChart = this.generateChart.bind(this);
  }

  handleCharacterInput(input) {
    this.setState({ input });
  }

  generateChart() {
    const { input } = this.state;
    const events = inputParser(input);
    this.setState({ events });
  }

  render() {
    const { events } = this.state;
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
          <LineChart events={events} />
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

export default Main;
