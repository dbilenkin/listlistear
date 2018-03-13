import React, { Component } from "react";
import fire from "./fire";

class HostGame extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      players: [],
      gameId: "Game " + props.match.params.id
    }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to players in Firebase Database */
    let gameRef = fire
      .database()
      .ref(this.state.gameId)
      .orderByKey()
      .limitToLast(100);

    gameRef.on("value", snapshot => {
      let newplayers = [];
      let playersSnapshot = snapshot.child('players');
      playersSnapshot.forEach(function (child) {
        newplayers.push({
          name: child.val().name,
          points: child.val().points,
          id: child.key
        });
      });
      console.log(newplayers);
      this.setState({ players: newplayers });
    });
  }
  render() {
    return (
      <div>

        <ul>
          {/* Render the list of players */
            this.state.players.map(player => (
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

export default HostGame;
