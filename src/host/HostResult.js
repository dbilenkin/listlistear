import React, { Component } from "react";

class HostResult extends Component {
  constructor(props) {
    console.log("HostResult: " + JSON.stringify(props));
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Round {this.props.round}</h2>
        <h3>Here are the results!</h3>
      </div>
    );
  }
}

export default HostResult;
