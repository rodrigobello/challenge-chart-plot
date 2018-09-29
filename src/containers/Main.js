import React, { Component } from 'react';
import './Main.css';

import Button from '../components/UI/Button/Button';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="title-container">
          <h1>Rodrigo's Challenge</h1>
        </div>
        <div className="input-container">
          {/* <TextEditor /> */}
        </div>
        <div className="chart-container">
          {/* <LineChart /> */}
        </div>
        <div className="button-container">
          <Button color="primary">Generate Chart</Button>
        </div>
      </div>
    );
  }
}

export default Main;
