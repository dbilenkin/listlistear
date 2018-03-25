import React, { Component } from "react";
import fire from "../fire";
import FuzzySet from "fuzzyset.js";
import PlayerSetup from "./PlayerSetup";
import PlayerQuestion from "./PlayerQuestion";
import PlayerChoice from "./PlayerChoice";
import PlayerAnswer from "./PlayerAnswer";
import PlayerWait from "./PlayerWait";
import PlayerResult from "./PlayerResult";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from "react-reorder";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const questions = [
  "Favorite vacation destinations",
  "Favorite Disney movies",
  "Craziest sounding sandwiches",
  "Best boardgames",
  "Best Beatles Albums",
  "Funniest Movies",
  "Coolest Trees"
];

class PlayerGame extends Component {
  constructor(props) {

    console.log(props);
    super(props);
    this.gameRef = fire.database().ref(props.match.params.id);
    this.state = {
      questions: questions,
      questionsIn: false,
      state: "",
      name: props.match.params.name,
      key: "",
      firstPlayer: false,
      choice: "",
      answers: [],
      choices: [],
      numAnswers: 3,
      numChoices: 3,
      numRounds: 2,
      round: 0,
      gameId: props.match.params.id,
      fuzzyConstant: 0.5
    };
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
    this.gameRef.orderByKey().on("value", snapshot => {
      let round = snapshot.child("round").val();
      if (round !== this.state.round) {
        this.setState({ round: round });
      }
      let state = snapshot.child("state").val();
      console.log("PlayerGame state: " + state);
      console.log(this.props);

      if (state === "question" || state === "wait.question") {
        let questionsIn = snapshot
          .child("questionsIn").val();

        this.setState({ questionsIn: Boolean(questionsIn) });
      }

      if (state !== this.state.state) {
        console.log("state change: " + JSON.stringify(this.state));
        console.log("answersSubmitted: " + this.state.answersSubmitted);
        let playersSnapshot = snapshot.child("players");
        let that = this;
        let playerExists = false;
        let i = 0;
        playersSnapshot.forEach(function (player) {
          if (that.state.name === player.val().name) {
            playerExists = true;
            that.setState({ key: player.key });
            if (i === 0) {
              that.setState({ firstPlayer: true });
            }
          }
          i++;
        });

        if (state === "setup" && !playerExists) {
          this.addPlayer();
        }

        

        let answers = null;
        let questions = null;
        let allChoices = [];
        let allQuestions = [];

        if (this.state.key) {
          answers = snapshot
            .child("players")
            .child(this.state.key)
            .child("answers")
            .val();

          questions = snapshot
            .child("players")
            .child(this.state.key)
            .child("questions")
            .val();

          let choices = snapshot.child("choices").child(this.state.round);

          choices.forEach(choice => {
            allChoices.push(choice.key);
          });

          let questionsSnapshot = snapshot.child("questions");

          questionsSnapshot.forEach(question => {
            allQuestions.push(question.key);
          });

          this.setState({ questions: allQuestions });
        }

        if (
          state === "wait.answer" ||
          state === "choice" ||
          state === "answer"
        ) {
          this.setState({ choices: allChoices, answers: allChoices });
        }

        if (state.split(".")[0] !== "wait") {
          this.setState({ state: state });
        } else {
          if (state == "wait.answer") {
            if (answers && answers[this.state.round]) {
              this.setState({ state: state });
            } else {
              this.setState({ state: "answer" });
            }
          } else if (state == "wait.question") {
            if (questions) {
              this.setState({ state: state });
            } else {
              this.setState({ state: "question" });
            }
          }
        }
      }
    });
  }

  changeQuestion = event => {
    this.setState({ question: event.target.value });
  };

  addQuestion(question) {
    let questionsRef = this.gameRef.child("questions");

    questionsRef.child(question).push(this.state.key);
    this.gameRef
      .child("players")
      .child(this.state.key)
      .child("questions")
      .push(question);

    this.gameRef.update({ state: "wait.question" });
  }

  noQuestion = e => {
    let index = Math.floor(Math.random() * questions.length);
    let question = questions.splice(index, 1)[0];
    this.addQuestion(question);
  }

  submitQuestion = e => {
    let question = this.state.question;
    this.addQuestion(question);
  };

  changeChoice = event => {
    this.setState({ choice: event.target.value });
  };

  submitChoice = e => {
    let choice = this.state.choice
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ");
    this.setState({ choice: "" });

    let choicesRef = this.gameRef.child("choices").child(this.state.round);

    let fuzzyChoices = FuzzySet();

    choicesRef.once("value", choices => {
      choices.forEach(choice => {
        fuzzyChoices.add(choice.key);
      });

      let fuzzyChoice = fuzzyChoices.get(choice);
      console.log(fuzzyChoice);
      if (fuzzyChoice && fuzzyChoice[0][0] > this.state.fuzzyConstant) {
        choice = fuzzyChoice[0][1]; //matches existing
      }
      choicesRef.child(choice).push(this.state.key);

      this.gameRef
        .child("players")
        .child(this.state.key)
        .child("choices")
        .child(this.state.round)
        .push(choice);

      //this.gameRef.update({ state: "wait.choice" });
    });
  };

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    this.setState({
      answers: reorder(this.state.answers, previousIndex, nextIndex)
    });
  }

  changeAnswer = id => event => {
    let answers = this.state.answers;
    answers[id] = event.target.value;
    this.setState({ answers: answers });
  };

  submitAnswers = e => {
    e.preventDefault();

    this.gameRef
      .child("players")
      .child(this.state.key)
      .child("answers")
      .update({ [this.state.round]: this.state.answers });

    this.gameRef.update({ state: "wait.answer" });
  };

  changeName = event => {
    console.log("state before: " + JSON.stringify(this.state));
    this.setState({ name: event.target.value });
    console.log("state after: " + JSON.stringify(this.state));
  };

  addPlayer() {
    let player = this.createPlayer(this.state.name);
    console.log("name: " + this.state.name);
    let name = this.state.name;
    let playerString = JSON.stringify(player);
    console.log("player: " + playerString);
    this.gameRef
      .child("players")
      .push(player)
      .then(snap => {
        const key = snap.key;
        this.setState({ key: key });
      });
    let that = this;

    this.gameRef
      .orderByKey()
      .limitToFirst(1)
      .once("value", function (snap) {
        console.log(snap.val());
        if (
          Object.values(Object.values(snap.val())[0])[0].name === player.name
        ) {
          that.setState({ firstPlayer: true });
        }
      });
  }

  readyToStart = () => {
    this.gameRef.update({ state: "question" });
  };

  startRound = () => {
    this.gameRef.update({ state: "choice" });
  }

  nextRound = () => {
    let nextRound = this.state.round + 1;
    this.setState({ round: nextRound });
    this.gameRef.update({ state: "choice", round: nextRound });
  };

  finishGame = () => {
    this.gameRef.update({ state: "finish" });
  };

  handleDelete(key) {
    console.log(key);
    this.gameRef.child(key).remove();
  }

  render() {
    let baseUrl = "/player/game/" + this.state.gameId + "/" + this.state.name;
    return (
      <div style={{ textAlign: "center" }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              style={{ color: 'white' }}
              onClick={() => { window.location = "/" }}>
              <Icon>home</Icon>
            </IconButton>
            <Typography variant="title" color="inherit">
              Game {this.state.gameId}
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.state === "setup" && (
          <PlayerSetup
            {...this.state}
            addHandler={this.addPlayer}
            changeHandler={this.changeName}
            readyToStart={this.readyToStart}
          />
        )}
        {this.state.state === "question" && (
          <PlayerQuestion
            {...this.state}
            changeQuestion={this.changeQuestion.bind(this)}
            submitQuestion={this.submitQuestion.bind(this)}
            noQuestion={this.noQuestion.bind(this)}
          />
        )}
        {this.state.state === "choice" && (
          <PlayerChoice
            {...this.state}
            changeChoice={this.changeChoice.bind(this)}
            submitChoice={this.submitChoice.bind(this)}
          />
        )}
        {this.state.state === "answer" && (
          <PlayerAnswer
            {...this.state}
            changeAnswer={this.changeAnswer.bind(this)}
            submitAnswers={this.submitAnswers.bind(this)}
            onReorder={this.onReorder.bind(this)}
          />
        )}
        {this.state.state.split(".")[0] === "wait" && (
          <PlayerWait {...this.state}
            startRound={this.startRound.bind(this)} />
        )}
        {this.state.state === "result" && (
          <PlayerResult
            {...this.state}
            nextRound={this.nextRound.bind(this)}
            finishGame={this.finishGame.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default PlayerGame;
