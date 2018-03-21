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

const HostResult = props => {
  const { classes } = props;

  return (
    <div>
      <h2>Round {props.round} Results</h2>
      <div className={classes.root}>
        <Grid container spacing={8}>
        <Grid key="results" item xs>
              <Paper className={classes.paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Overall Results</TableCell>
                      <TableCell numeric>Points</TableCell>
                      <TableCell>Player</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.results.map(result => (
                      <TableRow key={result[0]}>
                        <TableCell>{result[0]}</TableCell>
                        <TableCell numeric>{result[1].points}</TableCell>
                        <TableCell>{result[1].players.join(", ")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          {props.players.map(player => (
            <Grid key={player.name} item xs={2}>
              <Paper className={classes.paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{player.name}'s Choices -  {player.points} Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {player.answers[props.round].slice(0,3).map(answer => (
                      <TableRow key={answer}>
                        <TableCell>{answer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

HostResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostResult);
