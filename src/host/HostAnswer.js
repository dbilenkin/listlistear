import React, { Component } from "react";

class HostAnswer extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    return (
      <div>
        <p className="round">Round {this.props.round}</p>
        <div className="normal-text">Everyone choose the top {this.props.numAnswers}</div>
        <div className="normal-text">based on the choices given!</div>
      </div>
        );
      }
    }
    
    export default HostAnswer;
