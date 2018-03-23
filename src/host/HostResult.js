import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import {
  CSSTransitionGroup,
  CSSTransition,
  transit
} from "react-css-transition";

CSSTransition.childContextTypes = {
  // this can be empty
};

const pos = [
  {
    top: "100px",
    left: "50px"
  },
  {
    top: "300px",
    left: "50px"
  },
  {
    top: "500px",
    left: "50px"
  },
  {
    top: "500px",
    left: "400px"
  },
  {
    top: "500px",
    left: "750px"
  },
  {
    top: "500px",
    left: "1100px"
  },
  {
    top: "300px",
    left: "1100px"
  },
  {
    top: "100px",
    left: "1100px"
  }
]

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

const SlideIn = props => (
  <CSSTransition
    {...props}
    defaultStyle={{
      transform: "translate(0, 1000px)"
    }}
    enterStyle={{
      transform: transit(`translate(0,-500px)`, 1500, "ease-in-out")
    }}
    leaveStyle={{
      transform: transit("translate(0, 1000px)", 500, "ease-in-out")
    }}
    activeStyle={{
      transform: `translate(0,-500px)`
    }}
  />
);

const HostResult = props => {
  const { classes } = props;

  return (
    <div>
      <div className={`rectangle ${props.state}`}>
        <div className="round">Round {props.round} - Results</div>
        <table className="result-table">
          <tbody>
            <tr key="resultkey" style={{ color: 'lightsalmon' }}>
              <td>Results</td>
              <td>Points</td>
              <td>Players</td>
            </tr>
            {props.results.slice(0, 5).map(result => (
              <tr key={result[0]}>
                <td>{result[0]}</td>
                <td>{result[1].points}</td>
                <td>{result[1].players.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CSSTransitionGroup>
        {props.players.map((player, i) => (
          <SlideIn key={i}>
            <div key={player.name} className={`player-result player${i}-result`}>
              <div style={{ color: player.color }}>
                <div>{player.name}'s Choices</div>
                <div>{player.points} Points</div>
                <hr />
                {player.answers[props.round].slice(0, 3).map(answer => (
                  <div key={answer}>
                    {answer}
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        ))}
      </CSSTransitionGroup>
    </div>
  );
};

HostResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostResult);
