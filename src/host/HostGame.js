import React, { Component } from "react";
import fire from "../fire";
import HostSetup from "./HostSetup";
import HostChoice from "./HostChoice";
import HostAnswer from "./HostAnswer";
import HostWait from "./HostWait";
import HostResult from "./HostResult";
import HostFinish from "./HostFinish";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class HostGame extends Component {
  constructor(props) {
    const questions = [
      "What are your favorite vacation destinations?",
      "What is your favorite Disney Movie?",
      "Who is the best villain?"
    ];

    console.log(props);
    super(props);
    this.state = {
      questions: questions,
      players: [],
      choices: [],
      results: [],
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

  getPlayerByKey(key) {
    return this.state.players.filter(player => player.id === key)[0];
  }

  /**
   * 50 points for 1st
   * 30 points for 2nd
   * 10 point for 3rd
   */
  calculateResults() {
    console.log(this.state.players);
    let players = [...this.state.players];
    let results = {};
    players.forEach(player => {
      let points = 0;
      let top3answers = player.answers[this.state.round].slice(0, 3);
      console.log(top3answers);
      for (const [index, value] of top3answers.entries()) {
        console.log(index, value);
        let choicePoints = 50 - index * 20;
        let choice = this.state.choices.filter(e => e.choice === value)[0];
        let choicePlayerKeys = Object.values(choice.playerKeys);
        for (const [index, playerKey] of choicePlayerKeys.entries()) {
          let player = this.state.players.filter(p => p.id === playerKey)[0];
          player.points += choicePoints - index * 5;
          let playerName = this.getPlayerByKey(playerKey).name;
          if (results[choice.choice]) {
            results[choice.choice].points += player.points;
            
            if (results[choice.choice].players.indexOf(playerName) === -1) {
              results[choice.choice].players.push(playerName);
            }
          } else {
            results[choice.choice] = {};
            results[choice.choice].points = player.points;
            results[choice.choice].players = [playerName];
          }
        }
      }
      fire
        .database()
        .ref(this.state.gameId)
        .child("players")
        .child(player.id)
        .update({ points: player.points });
    });

    let resultArray = Object.entries(results);
    resultArray.sort((a, b) => a[1].points - b[1].points);
    this.setState({players: players, results: resultArray});
  }

  componentWillMount() {
    /* Create reference to players in Firebase Database */
    let gameRef = fire.database().ref(this.state.gameId);
    let that = this;

    let stateRef = gameRef.child("state");

    gameRef.on("value", snapshot => {
      let round = snapshot.child("round").val();
      if (round !== this.state.round) {
        this.setState({ round: round});
      }    

      let newplayers = [];
      let playersSnapshot = snapshot.child("players");
      playersSnapshot.forEach(function(player) {
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
      choicesSnapshot.forEach(function(choice) {
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
        this.calculateResults();
      }
      if (state && state !== this.state.state) {
        this.setState({ state: state });
      }
    });
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Game {this.state.gameId}</h1>
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
