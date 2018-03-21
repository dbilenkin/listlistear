import React, { Component } from "react";
import fire from "../fire";
import HostSetup from "./HostSetup";
import HostChoice from "./HostChoice";
import HostAnswer from "./HostAnswer";
import HostWait from "./HostWait";
import HostResult from "./HostResult";
import HostFinish from "./HostFinish";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { calculateResults } from "../services/calcService";
import '../assets/css/Host.css';

class HostGame extends Component {
  constructor(props) {
    const questions = [
      "Best ice cream flavor",
      "Best Disney Movie",
      "Best TV Show"
    ];

    const colors = [
      'darkgoldenrod',
      'green',
      'red',
      'darkblue',
      'blueviolet',
      'brown',
      'coral',
      'teal'
    ]

    console.log(props);
    super(props);
    this.state = {
      colors: colors.sort(() => Math.random() - 0.5),
      questions: questions,
      players: [],
      choices: [],
      results: [],
      state: "",
      round: 0,
      numAnswers: 3,
      numChoices: 10,
      choiceTime: 30,
      maxPlayers: 8,
      gameId: props.match.params.id
    };

    fire
      .database()
      .ref(this.state.gameId)
      .child("state")
      .once("value", snapshot => {
        let state = snapshot.val();
        if (!state) {
          fire
            .database()
            .ref(this.state.gameId)
            .set({ state: "setup", round: 0 });
        }
      });
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
  };

  /**
   * 50 points for 1st
   * 30 points for 2nd
   * 10 point for 3rd
   */
  calculateResults() {
    console.log(this.state.players);
    let players = [...this.state.players];
    let choices = [...this.state.choices];
    let result = calculateResults(players, choices, this.state.round);

    result.players.forEach(player => {
      fire
        .database()
        .ref(this.state.gameId)
        .child("players")
        .child(player.id)
        .update({ points: player.points });
    });

    this.setState({ players: result.players, results: result.results });
  }

  componentWillMount() {
    /* Create reference to players in Firebase Database */
    let gameRef = fire.database().ref(this.state.gameId);
    let that = this;

    let stateRef = gameRef.child("state");

    gameRef.on("value", snapshot => {
      let round = snapshot.child("round").val();
      if (round !== this.state.round) {
        this.setState({ round: round });
      }

      let newplayers = [];
      let playersSnapshot = snapshot.child("players");
      let playerCount = 0;
      let that = this;
      playersSnapshot.forEach(function (player) {
        newplayers.push({
          name: player.val().name,
          points: player.val().points,
          answers: player.val().answers,
          choices: player.val().choices,
          color: that.state.colors[playerCount],
          id: player.key
        });
        playerCount++;
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

      if (this.state.state === "choice" || this.state.state === "wait.choice") {
        let that = this;
        let answerTimer = setTimeout(() => {
          if (that.state.state === "choice") {
            gameRef.update({ state: "answer" });
          }
        }, this.state.choiceTime * 1000);

        if (newchoices.length >= 10) {
          window.clearTimeout(answerTimer);
          gameRef.update({ state: "answer" });
        }
      } else if (
        this.state.state === "answer" ||
        this.state.state === "wait.answer"
      ) {
        this.checkAnswers();
      }
    });

    stateRef.on("value", snapshot => {
      let state = snapshot.val();

      if (state === "result") {
        setTimeout(() => this.calculateResults(), 100);
      }
      if (state && state !== this.state.state) {
        this.setState({ state: state });
      }
      if (state === "finish") {
        setTimeout(() => {
          let sortedPlayers = this.state.players.sort((a, b) => b.points - a.points);
          this.setState({ players: sortedPlayers });
        }, 100);
      }
    });
  }
  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <div className={`rectangle ${this.state.state}`}></div>
        <a href="/host" className="back-button">Back</a>
        <div className="title game-title">Game {this.state.gameId}</div>
        {this.state.state === "setup" && <HostSetup {...this.state} />}
        {this.state.state === "choice" && <HostChoice {...this.state} />}
        {this.state.state === "answer" && <HostAnswer {...this.state} />}
        {this.state.state.split(".")[0] === "wait" && (
          <HostWait {...this.state} />
        )}
        {this.state.state === "result" && <HostResult {...this.state} />}
        {this.state.state === "finish" && <HostFinish {...this.state} />}
      </div>
    );
  }
}

export default HostGame;
