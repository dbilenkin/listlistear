import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Motion, spring } from 'react-motion';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CSSTransition, TransitionGroup } from 'react-transition-group'


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

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
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
        <TransitionGroup className='todo-list'>
          {this.props.players.map(player => (
            <Fade key={player.id}>
              <div>
                {`${player.name} `}
              </div>
            </Fade>
          ))}
        </TransitionGroup>

      </div>
    );
  }
}

HostSetup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HostSetup);
