import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { Motion, spring } from "react-motion";
import Transition from "react-motion-ui-pack";
import { Howl, Howler } from "howler";
import ReactHowler from "react-howler";
import glasscrash from "../assets/sounds/glass-crash.wav";
import music from "../assets/sounds/KnowingTwilight.mp3";

const styles = theme => ({
  root: {
    width: 800,
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    textAlign: "center",
    margin: "0 auto"
  },
  table: {
    width: 700
  }
});

class HostSetup extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  componentDidMount() {
    // const sound = new Howl({
    //   src: [music]
    // }).play();

    // sound.once('load', function () {
    //   sound.play();
    // });
  }

  playCrash() {
    if (this.props.players.length > 0) {
      var audio = new Audio(glasscrash);
      //audio.play();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="rectangle setup">
          <div className="join-text">
            Join the game at{" "}
            <span className="highlight"> listlistear.firebaseapp.com </span>
            <br />
            and type in <span className="highlight">
              {this.props.gameId}
            </span>{" "}
            for the Game Id.
          </div>

          <div className="names">
            <Transition
              component="div" // don't use a wrapping component
              onEnter={this.playCrash.bind(this)}
              enter={{
                opacity: 1,
                translateY: spring(0, { stiffness: 200, damping: 20 }),
                translateX: spring(0, { stiffness: 200, damping: 20 }),
                scale: spring(1, { stiffness: 200, damping: 20 })
              }}
              leave={{
                opacity: 0,
                translateY: -1000,
                translateX: -1000,
                scale: (20, 20)
              }}
            >
              {this.props.players.map((player, i) => (
                <div
                  key={player.id}
                  className="name"
                  style={{
                    left: (i % 2) * 300 + "px",
                    top: (Math.floor(i / 2) % 4) * 60 + "px",
                    color: player.color
                  }}
                >
                  {player.name}
                </div>
              ))}
            </Transition>
          </div>
        </div>

        {this.props.players.length > 2 && (
          <div>
            <div className="start-text">
              {this.props.firstPlayer.name}, start the game <br /> when everyone
              is in!
            </div>
          </div>
        )}
      </div>
    );
  }
}

HostSetup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostSetup);
