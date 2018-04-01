import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import fire from "../fire";
import "../assets/css/Host.css";

function createNewGame() {
  return Math.floor(Math.random() * 100);
}

class Host extends Component {
  constructor(props) {
    super(props);
    //let id = createNewGame();
    this.state = {
      gameId: 0
    };
  }

  componentDidMount() {
    let existingGames = [];
    let ref = fire.database().ref();
    let lastKey = 0;
    ref.once("value", snapshot => {
      snapshot.forEach(game => {
        lastKey = game.key;
      })
      console.log(lastKey);
      let newKey = parseInt(lastKey) + 1
      this.setState({ gameId: newKey });
    });
    

  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    return (
      <div className="container">
        <div className="title">List List Ear</div>
        <div className="rectangle start">
          <Route
            path="/host"
            render={props => (
              <a
                className="button"
                onClick={() =>
                  props.history.push("host/game/" + this.state.gameId)
                }
              >
                Start Game
            </a>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Host;
