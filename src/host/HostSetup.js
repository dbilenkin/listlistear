import React, { Component } from "react";

class HostSetup extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Game Setup</h2>
        <ul>
          {/* Render the list of players */
            this.props.players.map(player => (
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

export default HostSetup;
