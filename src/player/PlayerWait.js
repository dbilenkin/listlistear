import React, { Component } from "react";
import fire from "../fire";

class PlayerWait extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.currentPlayer && (
          <h2>Welcome, {this.props.currentPlayer.name}</h2>
        )}
        <h2>Round: {this.props.round}</h2>
        <h3>Waiting for other players to answer.</h3>
      </div>
    );
  }
}

export default PlayerWait;
