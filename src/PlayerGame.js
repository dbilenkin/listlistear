import React, { Component } from "react";
import fire from "./fire";

class PlayerGame extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      players: [],
      currentPlayer: null,
      firstPlayer: false,
      gameId: "Game " + props.match.params.id
    }; // <- set up react state
  }

  createPlayer(name) {
    let player = {
      name: name,
      points: 0,
    }

    this.setState({currentPlayer: player})
    return player;
  }
  addPlayer(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the player to Firebase */
    fire
      .database()
      .ref(this.state.gameId)
      .push(this.createPlayer(this.inputEl.value));
    
  }

  handleDelete(key) {
    console.log(key);
    fire
      .database()
      .ref(this.state.gameId)
      .child(key)
      .remove(); // this removes the parent of test (RemoveTest)
  }

  render() {
    return (
      <div>
        <h1>{this.state.gameId}</h1>
        { !this.state.currentPlayer &&
        <form onSubmit={this.addPlayer.bind(this)}>
          <input type="text" ref={el => (this.inputEl = el)} />
          <input type="submit" />
        </form>
        }
        { this.state.currentPlayer &&
        <h2>Welcome, {this.state.currentPlayer.name}</h2>
        }
      </div>
    );
  }
}

export default PlayerGame;
