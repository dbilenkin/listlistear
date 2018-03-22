import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

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
      {waitType === 'questions' && (<p className="round">Categories</p>)}
      {waitType === 'answers' && (<p className="round">Round {props.round} - Results</p>)}
      <div className="normal-text">Waiting for everyone to finish...</div>
      {
        props.players.filter(player => {
          if (waitType === 'questions') {
            return (player.questions != undefined);
          } 
          return player[waitType] && player[waitType][props.round]
        }).map((player, i) => (
        <div key={player.name} className={`player-result player${i}-result`}>
          <Paper className={classes.paper} style={{ color: player.color }}>
            <div>{player.name}</div>
            <div>{player.points} Points</div>
            <hr />

          </Paper>
        </div>
      ))}
    </div>
  );

}

HostWait.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostWait);
