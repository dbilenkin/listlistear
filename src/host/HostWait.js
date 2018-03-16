import React, { Component } from "react";

class HostWait extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    let waitType = this.props.state.split('.')[1] === 'choice' ? 'choices' : 'answers';
    return (
      <div>
        <h2>Round {this.props.round}</h2>
        <h3>Waiting for everyone to finish ...</h3>
        <ul>
          {/* Render the list of players */
            this.props.players.filter(player => player[waitType]).map(player => (
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
