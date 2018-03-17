import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: 800,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    textAlign: 'center',
    margin: '0 auto',
  },
  table: {
    width: 700,
  },
});

class HostSetup extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (

      <div>
        <h2>Players:</h2>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Something</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.players.map(player => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>something else</TableCell>
                </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

HostSetup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HostSetup);
