import React, { Component } from "react";

class HostChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`rectangle ${this.props.state}`}>
        <p className="round">Round {this.props.round + 1}</p>
        <div className="normal-text">{this.props.questions[this.props.round].question}</div>
      </div>
    );
  }
}

export default HostChoice;
