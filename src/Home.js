import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function createNewGame() {
  return Math.floor(Math.random() * 100);
}

const HostButton = ({ title, id, history }) => (
  <button type="button" onClick={() => history.push("host/game/" + id)}>
    {title}
  </button>
);

const JoinButton = props => (
  <button
    type="button"
    onClick={() => props.history.push("player/game/" + props.id + "/" + props.name)}
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

const JoinGame = parentProps => (
  <div>
    <label>
      Game Id:
      <input
        type="text"
        value={parentProps.gameId}
        onChange={parentProps.onGameChange}
      />
    </label>
    <label>
      Name:
      <input
        type="text"
        value={parentProps.name}
        onChange={parentProps.onNameChange}
      />
    </label>
    <Route
      path="/"
      render={props => <JoinButton {...props} id={parentProps.gameId} name={parentProps.name}/>}
    />
  </div>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      name: ""
    };

    //this.handlePickGame = this.handlePickGame.bind(this);
  }

  pickGame = event => {
    this.setState({ gameId: event.target.value });
  };

  pickName = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <CreateGame />
        <JoinGame {...this.state} onGameChange={this.pickGame} onNameChange={this.pickName}/>
      </div>
    );
  }
}

export default Home;
