import React, { Component } from 'react';
import './Main.css';

import TextEditor from '../components/TextEditor/TextEditor';
import LineChart from '../components/LineChart/LineChart';
import Button from '../components/UI/Button/Button';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      events: [],
    };
    this.handleCodeInput = this.handleCodeInput.bind(this);
    this.generateChart = this.generateChart.bind(this);
  }

  handleCodeInput(code) {
    this.setState({ code });
  }

  generateChart() {
    const { code } = this.state;
    const events = code.split('\n').map(e => eval(`(${e})`));
    this.setState({ events });
  }

  render() {
    const { events } = this.state;
    console.log(events);
    return (
      <div className="Main">
        <div className="title-section">
          <h1>
            Rodrigo’s Challenge
          </h1>
        </div>
        <div className="input-section">
          <TextEditor handleCodeInput={this.handleCodeInput} />
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
