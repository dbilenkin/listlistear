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
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  CSSTransitionGroup,
  CSSTransition,
  transit
} from "react-css-transition";
import Transition from "react-motion-ui-pack";
//import Anime from "react-anime";
import { Howl, Howler } from 'howler';
import ReactHowler from 'react-howler'

CSSTransition.childContextTypes = {
  // this can be empty
};

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

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade-enter">
    {children}
  </CSSTransition>
);

const FadeInOut = props => (
  <CSSTransition
    {...props}
    defaultStyle={{
      //opacity: 0,
      //fontSize: 200,
      transform: "scale(10, 10)",
      transform: "transform(100px, -100px)"
    }}
    enterStyle={{
      //opacity: transit(1.0, 1500, "ease-in-out"),
      //fontSize: transit(60, 1500, "ease-in-out"),
      //fontSize: transit(10, 1500, "ease-in-out")
      transform: transit("scale(1, 1)", 1500, "ease-in-out"),
      transform: transit("transform(0, 0)", 1500, "ease-in-out")
    }}
    leaveStyle={{
      //opacity: transit(0, 500, "ease-in-out"),
      //filter: transit("blur(20px)", 1500, "ease-in-out"),
      //fontSize: transit(500, 1500, "ease-in-out"),
      transform: transit("scale(10, 10)", 500, "ease-in-out"),
      transform: transit("transform(100px, -100px)", 1500, "ease-in-out")
    }}
    activeStyle={{
      //opacity: 1.0,
      //fontSize: 60,
      transform: "scale(1, 1)",
      transform: "transform(0,0)"
    }}
  />
);

const MoveIn = props => (
  <CSSTransition
    {...props}
    defaultStyle={{ transform: "translate(0, 0)" }}
    enterStyle={{
      transform: transit("translate(50px, 0)", 500, "ease-in-out")
    }}
    leaveStyle={{
      transform: transit("translate(0, 0)", 500, "ease-in-out")
    }}
    activeStyle={{ transform: "translate(50px, 0)" }}
    active={true}
  />
);

class HostSetup extends Component {
  constructor(props) {
    console.log("HostSetup: " + JSON.stringify(props));
    super(props);
  }

  componentDidMount() {

    // const sound = new Howl({
    //   src: ['KnowingTwilight.mp3']
    // });

    // sound.once('load', function () {
    //   sound.play();
    // });

    var audio = new Audio('/KnowingTwilight.mp3');
    audio.play();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={"rectangle"}>
        {/* <audio
          id="audio"
          src="KnowingTwilight.mp3"
          autoPlay>
          Your browser does not support the <code>audio</code> element.
        </audio> */}
        {/* <ReactHowler
          src='KnowingTwilight.mp3'
          playing={true}
        /> */}
        <div className="names">
          {/* <Anime
            easing="easeOutElastic"
            duration={1000}
            direction="alternate"
            loop={true}
            delay={(el, index) => index * 240}
            translateX="13rem"
            scale={[0.75, 0.9]}
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
          </Anime> */}

          <Transition
            component="div" // don't use a wrapping component
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
              scale: (10, 10)
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

          {/* <CSSTransitionGroup>
            {this.props.players.map((player, i) => (
              <FadeInOut key={player.id}>
                <div
                  className="name"
                  style={{
                    left: (i % 2) * 300 + 'px',
                    top: (Math.floor((i / 2)) % 4) * 60 + 'px',
                    color: player.color
                  }}
                >{player.name}</div>
              </FadeInOut>
            ))}
          </CSSTransitionGroup> */}
        </div>
      </div>
    );
  }
}

HostSetup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostSetup);
