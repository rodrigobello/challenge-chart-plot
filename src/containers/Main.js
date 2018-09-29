import React, { Component } from 'react';
import './Main.css';

import TextEditor from '../components/TextEditor/TextEditor';
import Button from '../components/UI/Button/Button';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleCodeInput = this.handleCodeInput.bind(this);
    this.state = {
      code: null,
    };
  }

  handleCodeInput(code) {
    this.setState({ code });
  }


  render() {
    const { code } = this.state;
    return (
      <div className="Main">
        <div className="title-container">
          <h1>
            Rodrigo’s Challenge
          </h1>
        </div>
        <div className="input-container">
          <TextEditor handleCodeInput={this.handleCodeInput} />
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
