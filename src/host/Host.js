import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import "../assets/css/Host.css";

function createNewGame() {
  return Math.floor(Math.random() * 100);
}

class Host extends Component {
  constructor(props) {
    super(props);
    let id = createNewGame();
    this.state = {
      gameId: id
    };
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
