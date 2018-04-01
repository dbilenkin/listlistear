import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import { PlayerCard } from "./components/PlayerCard";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "90%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    textAlign: "center",
    margin: "0 auto"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  table: {
    //width: 700,
  }
});

const HostWait = props => {

  const { classes } = props;

  let waitType = props.state.split('.')[1] === 'question' ? 'questions' : 'answers';

  return (
    <div>
      <div className={`rectangle ${waitType}`}>
        {waitType === 'questions' && (<p className="round">Categories</p>)}
        {waitType === 'answers' && (<p className="round">Round {props.round + 1} - Results</p>)}
        {props.state === "wait.question" && props.questionsIn && (
          <div>
            <div className="normal-text">All questions are in.</div>
            <div className="normal-text">{props.firstPlayer.name}, start the first round!</div>
          </div>
        )}
        {((waitType === 'questions' && !props.questionsIn) || waitType === 'answers') && (
          <div className="normal-text">Waiting for everyone to finish...</div>
        )}
      </div>
      {
        props.players.filter(player => {
          if (waitType === 'questions') {
            return (player.questions != undefined);
          }
          return player[waitType] && player[waitType][props.round]
        }).map((player, i) => (
          <PlayerCard key={i} player={player} i={i} >
            <div>{player.name}</div>
            <div>Ready!</div>
          </PlayerCard>
        ))}
    </div>
  );

}

HostWait.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostWait);
