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

const HostFinish = props => {
  const { classes } = props;

  return (
    <div className={`rectangle ${props.state}`}>
      <p className="round">Game Over!</p>
      <table className="result-table">
        <tbody>
          <tr key="resultkey" style={{ color: 'black' }}>
            <td>Rank</td>
            <td>Player</td>
            <td>Points</td>
          </tr>
          {props.players.map((player, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{player.name}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

HostFinish.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostFinish);
