import React, { Component } from "react";
import fire from "../fire";
import PlayerSetup from "./PlayerSetup";
import PlayerChoice from "./PlayerChoice";
import PlayerAnswer from "./PlayerAnswer";
import PlayerWait from "./PlayerWait";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PlayerGame extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      state: "",
      name: props.match.params.name,
      key: "",
      currentPlayer: null,
      firstPlayer: false,
      answers: [],
      choices: [],
      numAnswers: 3,
      numChoices: 3,
      round: 0,
      gameId: props.match.params.id
    };

    //this.changeName = this.changeName.bind(this);
  }

  createPlayer(name) {
    let player = {
      name: name,
      points: 0
    };

    this.setState({ name: name, currentPlayer: player });
    return player;
  }

  componentWillMount() {
    let gameRef = fire.database().ref(this.state.gameId);

    this.addPlayer();

    gameRef.on("value", snapshot => {
      let state = snapshot.child("state").val();
      console.log("PlayerGame state: " + state);
      console.log(this.props);
      if (state !== this.state.state) {
        console.log("state change: " + JSON.stringify(this.state));
        console.log("answersSubmitted: " + this.state.answersSubmitted);

        let answers = null;
        let choices = null;
        if (this.state.key) {
          answers = snapshot
            .child("players")
            .child(this.state.key)
            .child("answers")
            .val();

          choices = snapshot
            .child("players")
            .child(this.state.key)
            .child("choices")
            .val();
        }

        if (state.split(".")[0] !== "wait") {
          this.setState({ state: state });
        } else if (
          (state == "wait.choice" && choices) ||
          (state == "wait.answer" && answers)
        ) {
          this.setState({ state: state });
        }
      }
    });
  }

  changeChoice = id => event => {
    let choices = this.state.choices;
    choices[id] = event.target.value;
    this.setState({ choices: choices });
  };

  submitChoices = e => {
    e.preventDefault();
    let gameRef = fire.database().ref(this.state.gameId);

    gameRef
      .child("players")
      .child(this.state.key)
      .child("choices")
      .update({ [this.state.round]: this.state.choices });

    gameRef.update({ state: "wait.choice" });
  };

  changeAnswer = id => event => {
    let answers = this.state.answers;
    answers[id] = event.target.value;
    this.setState({ answers: answers });
  };

  submitAnswers = e => {
    e.preventDefault();
    let gameRef = fire.database().ref(this.state.gameId);

    gameRef
      .child("players")
      .child(this.state.key)
      .child("answers")
      .update({ [this.state.round]: this.state.answers });

    gameRef.update({ state: "wait.answer" });
  };

  changeName = event => {
    console.log("state before: " + JSON.stringify(this.state));
    this.setState({ name: event.target.value });
    console.log("state after: " + JSON.stringify(this.state));
  };

  addPlayer() {
    //e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the player to Firebase */

    console.log("state: " + JSON.stringify(this.state));
    let gameRef = fire.database().ref(this.state.gameId);

    let player = this.createPlayer(this.state.name);
    console.log("name: " + this.state.name);
    let name = this.state.name;
    let playerString = JSON.stringify(player);
    console.log("player: " + playerString);
    gameRef
      .child("players")
      .push(player)
      .then(snap => {
        const key = snap.key;
        this.setState({ key: key });
      });
    let that = this;

    gameRef
      .orderByKey()
      .limitToFirst(1)
      .once("value", function(snap) {
        console.log(snap.val());
        if (
          Object.values(Object.values(snap.val())[0])[0].name === player.name
        ) {
          that.setState({ firstPlayer: true });
        }
      });
  }

  readyToStart = () => {
    fire
      .database()
      .ref(this.state.gameId)
      .update({ state: "choice" });
  };

  handleDelete(key) {
    console.log(key);
    fire
      .database()
      .ref(this.state.gameId)
      .child(key)
      .remove();
  }

  render() {
    let baseUrl = "/player/game/" + this.state.gameId + "/" + this.state.name;
    return (
      <div>
        <h1>{this.state.gameId}</h1>
        {this.state.state === "setup" && (
          <PlayerSetup
            {...this.state}
            addHandler={this.addPlayer}
            changeHandler={this.changeName}
            readyToStart={this.readyToStart}
          />
        )}
        {this.state.state === "choice" && (
          <PlayerChoice
            {...this.state}
            changeChoice={this.changeChoice.bind(this)}
            submitChoices={this.submitChoices.bind(this)}
          />
        )}
        {this.state.state === "answer" && (
          <PlayerAnswer
            {...this.state}
            changeAnswer={this.changeAnswer.bind(this)}
            submitAnswers={this.submitAnswers.bind(this)}
          />
        )}
        {this.state.state.split(".")[0] === "wait" && (
          <PlayerWait {...this.state} />
        )}
      </div>
    );
  }
}

export default PlayerGame;
