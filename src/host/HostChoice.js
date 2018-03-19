import React, { Component } from "react";

class HostChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Round {this.props.round}</h2>
        <h3>{this.props.questions[this.props.round]}</h3>
      </div>
    );
  }
}

export default HostChoice;
