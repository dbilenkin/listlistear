import React, { Component } from "react";
import fire from "../fire";
import HostSetup from "./HostSetup";
import HostChoice from "./HostChoice";
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
      choices: [],
      state: "",
      round: 0,
      numAnswers: 3,
      numChoices: 10,
      choiceTime: 30,
      gameId: props.match.params.id
    };

    fire
      .database()
      .ref(this.state.gameId)
      .set({ state: "setup", round: 0 });
  }

  checkChoices = () => {
    let numPlayersChoiced = 0;
    this.state.players.forEach(player => {
      if (player.choices && player.choices[this.state.round]) {
        player.choiced = true;
        numPlayersChoiced++;
      }
    });

    if (
      numPlayersChoiced >= this.state.numChoices
    ) {
      fire
        .database()
        .ref(this.state.gameId)
        .update({ state: "answer" });
    }
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

  /**
   * 5 points for 1st
   * 3 points for 2nd
   * 1 point for 3rd
   */
  calculateResults() {
    this.state.players.forEach(player => {
      let points = 0;
      for (const [index, value] of player.answers.slice(0,3).entries()) {
        console.log(index, value);
        let choicePoints = 5 - (index * 2);
        let choice = this.state.choices.filter(e => e.choice === value)[0];
        
      }
    });
  }

  componentWillMount() {
    /* Create reference to players in Firebase Database */
    let gameRef = fire.database().ref(this.state.gameId);
    let that = this;

    let stateRef = gameRef.child("state");

    gameRef.on("value", snapshot => {
      let newplayers = [];
      let playersSnapshot = snapshot.child("players");
      playersSnapshot.forEach(function (player) {
        newplayers.push({
          name: player.val().name,
          points: player.val().points,
          answers: player.val().answers,
          choices: player.val().choices,
          id: player.key
        });
      });
      this.setState({ players: newplayers });

      let newchoices = [];
      let choicesSnapshot = snapshot.child("choices").child(this.state.round);
      choicesSnapshot.forEach(function (choice) {
        newchoices.push({
          choice: choice.key,
          playerKeys: choice.val()
        });
      });
      this.setState({ choices: newchoices });

      if (this.state.state === 'choice' || this.state.state === 'wait.choice') {

        setTimeout(() => {
          gameRef.update({ state: "answer" });
        }, this.state.choiceTime * 1000)

        this.checkChoices();
      } else if (this.state.state === 'answer' || this.state.state === 'wait.answer') {
        this.checkAnswers();
      }
      
    });

    stateRef.on("value", snapshot => {
      let state = snapshot.val();

      if (state === 'result') {
        this.calculateResults();
      }
      if (state !== this.state.state) {
        this.setState({ state: state });
      }
    });
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Game {this.state.gameId}</h1>
        {this.state.state === 'setup' && (<HostSetup {...this.state} />)}
        {this.state.state === 'choice' && (<HostChoice {...this.state} />)}
        {this.state.state === 'answer' && (<HostAnswer {...this.state} />)}
        {this.state.state.split('.')[0] === 'wait' && (<HostWait {...this.state} />)}
        {this.state.state === 'result' && (<HostResult {...this.state} />)}
      </div>
    );
  }
}

export default HostGame;
