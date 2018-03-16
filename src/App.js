import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HostGame from "./host/HostGame";
import PlayerGame from "./player/PlayerGame";
import Home from "./Home";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import CssBaseline from "material-ui/CssBaseline";

const styles = theme => ({
  root: {
    flexGrow: 2
  }
});

const App = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <div>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Link to="/" style={{textDecoration:'none', color:'white'}}>
                <Button color="inherit">Home</Button>
              </Link>
            </Toolbar>
          </AppBar>

          <Route exact path="/" component={Home} />
          <Route path="/host/game/:id" component={HostGame} />
          <Route path="/player/game/:id/:name" component={PlayerGame} />
        </div>
      </Router>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
