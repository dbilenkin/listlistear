import React, { Component } from "react";

class HostChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
      time: props.choiceTime
    }
  }

  componentDidMount() {
    let interval = setInterval(() => {
      console.log(this.state.time);
      if (this.state.time <= 0) {
        window.clearInterval(interval);
        this.props.startAnswers();
        return;
      }
      if (this.state.time < 10) {
        this.setState({ color: 'red' });
      } else if (this.state.time < 20) {
        this.setState({ color: 'yellow' });
      }
      this.setState({ time: this.state.time - .1 })
    }, 100);

  }

  render() {
    return (
      <div>
        <div className={`rectangle ${this.props.state}`}>
          <p className="round">Round {this.props.round + 1}</p>
          <div className="normal-text">{this.props.questions[this.props.round].question}</div>
        </div>
        <div className="timer-holder">
          <div style={{ width: (this.state.time * 100) / this.props.choiceTime + '%', background: this.state.color }} id="timer-bar" />
        </div>
      </div>
    );
  }
}

export default HostChoice;
