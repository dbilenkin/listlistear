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
      filter: "blur(20px)"
      //transform: "translate(0, 1000px)" 
    }}
    enterStyle={{
      //opacity: transit(1.0, 1500, "ease-in-out"),
      filter: transit("blur(1px)", 1500, "ease-in-out"),
      //fontSize: transit(10, 1500, "ease-in-out")
      //transform: transit("translate(0, 0)", 1500, "ease-in-out")
    }}
    leaveStyle={{
      //opacity: transit(0, 500, "ease-in-out"),
      filter: transit("blur(20px)", 1500, "ease-in-out"),
      fontSize: transit(500, 1500, "ease-in-out")
      //transform: transit("translate(0, 0)", 500, "ease-in-out")
    }}
    activeStyle={{
      //opacity: 1.0, 
      fontSize: 60,
      filter: "blur(1px)"
      //transform: "translate(0, 0)" 
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="names">
          <CSSTransitionGroup>
            {this.props.players.map((player, i) => (
              <FadeInOut key={player.id}>
                <div 
                  className="name" 
                  style={{ 
                    left: (i % 2) * 225 + 'px', 
                    top: (Math.floor((i/2)) % 4) * 60 + 'px', 
                    color: player.color
                  }}
                >{player.name}</div>
              </FadeInOut>
            ))}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

HostSetup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HostSetup);
