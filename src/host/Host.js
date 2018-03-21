import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import Background from "../images/bricks.jpg";
import '../assets/css/Host.css';

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

    //this.handlePickGame = this.handlePickGame.bind(this);
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    return (
      <div className="container">
        <div className='title'>List List Ear</div>
        <Route
          path="/host"
          render={props => (
            <div className="button" onClick={() => props.history.push("host/game/" + this.state.gameId)}>
              Start Game
        </div>
          )}
        />

      </div>
    );
  }
}

export default Host;
