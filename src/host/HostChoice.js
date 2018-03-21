import React, { Component } from "react";

class HostChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="round">Round {this.props.round}</p>
        <div className="normal-text">{this.props.questions[this.props.round]}</div>
      </div>
    );
  }
}

export default HostChoice;
