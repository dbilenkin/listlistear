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
        <ul>
          {/* Render the list of players */
            this.props.players.filter(player => player.answers).map(player => (
              <li
                key={player.id}
              >
                {player.name}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default HostWait;
