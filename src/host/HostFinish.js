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
    <div>
      <h2>Game Over!</h2>
      <div className={classes.root}>
        <Grid container spacing={24}>
          {props.players.map(player => (
            <Grid key={player.name} item xs>
              <Paper className={classes.paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{player.name}'s Choices</TableCell>
                      <TableCell numeric>{player.points} Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {player.answers[props.round].map(answer => (
                      <TableRow key={answer}>
                        <TableCell>{answer}</TableCell>
                        <TableCell numeric>{player.points}</TableCell>
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

HostFinish.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostFinish);
