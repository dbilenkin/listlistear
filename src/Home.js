import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";

function createNewGame() {
  return Math.floor(Math.random() * 100);
}

const HostButton = ({ title, id, history }) => (
  <Button
    variant="raised"
    label="{title}"
    color="primary"
    style={{ margin: 12 }}
    onClick={() => history.push("host/game/" + id)}
  >
    Host Game
  </Button>
);

const JoinButton = props => (
  <Button
    variant="raised"
    label="{title}"
    color="primary"
    style={{ margin: 12 }}
    onClick={() =>
      props.history.push("player/game/" + props.id + "/" + props.name)
    }
  >
    Join Game
  </Button>
);

const CreateGame = () => (
  <Route
    path="/"
    render={props => (
      <HostButton {...props} title="Host Game" id={createNewGame()} />
    )}
  />
);

const JoinGame = parentProps => (
  <div>
    <TextField
      label="Game Id"
      value={parentProps.gameId}
      onChange={parentProps.onGameChange}
    />
    <TextField
      label="Name"
      value={parentProps.name}
      onChange={parentProps.onNameChange}
    />
    <Route
      path="/"
      render={props => (
        <JoinButton
          {...props}
          id={parentProps.gameId}
          name={parentProps.name}
        />
      )}
    />
  </div>
);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: "100px",
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      name: ""
    };

    //this.handlePickGame = this.handlePickGame.bind(this);
  }

  pickGame = event => {
    this.setState({ gameId: event.target.value });
  };

  pickName = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={16}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" direction="column">
              <Grid item>
                <CreateGame />
              </Grid>

              <Grid item>
                <JoinGame
                  {...this.state}
                  onGameChange={this.pickGame}
                  onNameChange={this.pickName}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
