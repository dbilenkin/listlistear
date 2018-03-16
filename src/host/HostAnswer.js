import React, { Component } from "react";

class HostAnswer extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Round {this.props.round}</h2>
        <h3>Everyone choose the top {this.props.numAnswers} based on the choices given!</h3>
      </div>
    );
  }
}

export default HostAnswer;
