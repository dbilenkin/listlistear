import React, { Component } from "react";
import fire from "../fire";
import HostSetup from "./HostSetup";
import HostAnswer from "./HostAnswer";
import HostWait from "./HostWait";
import HostResult from "./HostResult";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class HostGame extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      players: [],
      state: "",
      round: 0,
      gameId: props.match.params.id
    };

    fire
      .database()
      .ref(this.state.gameId)
      .set({ state: "setup", round: 0 });
  }

  checkAnswers = () => {
    let numPlayersAnswered = 0;
    this.state.players.forEach(player => {
      if (player.answers && player.answers[this.state.round]) {
        player.answered = true;
        numPlayersAnswered++;
      }
    });

    if (
      this.state.players.length > 0 &&
      numPlayersAnswered === this.state.players.length
    ) {
      fire
        .database()
        .ref(this.state.gameId)
        .update({ state: "result" });
    }
  }

  componentWillMount() {
    /* Create reference to players in Firebase Database */
    let gameRef = fire.database().ref(this.state.gameId);
    let that = this;

    let stateRef = gameRef.child("state");

    gameRef.on("value", snapshot => {
      let newplayers = [];
      let playersSnapshot = snapshot.child("players");
      playersSnapshot.forEach(function (child) {
        newplayers.push({
          name: child.val().name,
          points: child.val().points,
          answers: child.val().answers,
          id: child.key
        });
      });
      console.log(newplayers);
      this.setState({ players: newplayers });
      this.checkAnswers();
    });

    stateRef.on("value", snapshot => {
      let state = snapshot.val();
      if (state !== this.state.state) {
        this.setState({ state: state });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.gameId}</h1>
        {this.state.state === 'setup' && (<HostSetup {...this.state} />)}
        {this.state.state === 'answer' && (<HostAnswer {...this.state} />)}
        {this.state.state === 'wait' && (<HostWait {...this.state} />)}
        {this.state.state === 'result' && (<HostResult {...this.state} />)}
      </div>
    );
  }
}

export default HostGame;
