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
import { Motion, spring } from "react-motion";
import Transition from "react-motion-ui-pack";
import "./HostResult.css";

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

const HostResult = props => {
  const { classes } = props;

  let waitType = "answers";

  return (
    <div>
      <div className={`flip-container ${props.state}`}>
        <div className="flipper">
          <div className={`front rectangle ${waitType}`}>
            {waitType === "questions" && <p className="round">Categories</p>}
            {waitType === "answers" && (
              <p className="round">Round {props.round + 1} - Results</p>
            )}
            {props.state === "wait.question" &&
              props.questionsIn && (
                <div>
                  <div className="normal-text">All questions are in.</div>
                  <div className="normal-text">
                    {props.firstPlayer.name}, start the first round!
                  </div>
                </div>
              )}
            {((waitType === "questions" && !props.questionsIn) ||
              waitType === "answers") && (
              <div className="normal-text">
                Waiting for everyone to finish...
              </div>
            )}
          </div>

          <div className={`back rectangle ${props.state}`}>
            <div className="round">Round {props.round} - Results</div>
            <table className="result-table">
              <tbody>
                <tr key="resultkey" style={{ color: "lightsalmon" }}>
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
        </div>
      </div>

      <div>
        <div className="start-text">
          {props.firstPlayer.name}, start the next round!
        </div>
      </div>

      {props.state === "result" && (
        <Transition
          component="div" // don't use a wrapping component
          //onEnter={this.playCrash.bind(this)}
          enter={{
            opacity: 1,
            translateY: spring(0, { stiffness: 200, damping: 20 })
            //translateX: spring(0, { stiffness: 200, damping: 20 }),
            //scale: spring(1, { stiffness: 200, damping: 20 })
          }}
          leave={{
            opacity: 0,
            translateY: 1000
            //translateX: -1000,
            //scale: (20, 20)
          }}
        >
          {props.players
            .filter(player => {
              return player[waitType] && player[waitType][props.round];
            })
            .map((player, i) => (
              <div key={player.name} className={`player-flip-container ${props.state}`}>
                <div className="player-flipper">
                  <div
                    
                    className={`player-result player${i}-result`}
                  >
                    <div style={{ color: player.color }}>
                      <div>{player.name}</div>
                    </div>
                  </div>
                  <div
                    className={`player-result player${i}-result`}
                  >
                    <div style={{ color: player.color }}>
                      <div>{player.name}'s Choices</div>
                      <div>{player.points} Points</div>
                      <hr />
                      {player.answers[props.round]
                        .slice(0, 3)
                        .map(answer => <div key={answer}>{answer}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Transition>
      )}
    </div>
  );
};

HostResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostResult);
