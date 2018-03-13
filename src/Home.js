import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HostGame from "./HostGame";
import PlayerGame from "./PlayerGame";

function createNewGame() {
  return Math.floor(Math.random() * 100);
}

const HostButton = ({ title, id, history }) => (
  <button type="button" onClick={() => history.push("host/game/" + id)}>
    {title}
  </button>
);

const JoinButton = (props) => (
  <button
    type="button"
    onClick={() => props.history.push("player/game/" + props.id)}
  >
    Join Game
  </button>
);

const CreateGame = () => (
  <Route
    path="/"
    render={props => (
      <HostButton {...props} title="Host Game" id={createNewGame()} />
    )}
  />
);

const JoinGame = (parentProps) => (
  <div>
    <label>
      Game Id:
      <input
        type="text"
        value={parentProps.id}
        onChange={parentProps.onChange}
      />
    </label>
    <Route
      path="/"
      render={props => <JoinButton {...props} id={parentProps.id} />}
    />
  </div>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: ""
    };

    this.handlePickGame = this.handlePickGame.bind(this);
  }

  handlePickGame(event) {
    this.setState({ gameId: event.target.value });
  }

  render() {
    return (
      <div>
        <CreateGame />
        <JoinGame id={this.state.gameId} onChange={this.handlePickGame} />
      </div>
    );
  }
}

export default Home;
