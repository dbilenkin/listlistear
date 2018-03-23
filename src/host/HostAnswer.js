import React, { Component } from "react";

class HostAnswer extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    return (
      <div className={`rectangle ${this.props.state}`}>
        <p className="round">Round {this.props.round + 1}</p>
        <div className="normal-text">Everyone rank the top {this.props.numAnswers}</div>
        <div className="normal-text">by dragging the choices on your phone!</div>
      </div>
        );
      }
    }
    
    export default HostAnswer;
