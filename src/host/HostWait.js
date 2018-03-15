import React, { Component } from "react";

class HostWait extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Round {this.props.round}</h2>
        <h3>Waiting for everyone to finish answering...</h3>
      </div>
    );
  }
}

export default HostWait;
