import React, { Component } from "react";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from "react-reorder";

import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  placeholder: {
    width: "320px",
    height: "36px",
    background: "#ccc",
    margin: "10px 0"
  },
  item: {
    width: "320px",
    height: "36px",
    background: "#3f51b5",
    color: "#FFF",
    padding: "10px",
    textAlign: "center",
    fontSize: "16px",
    margin: "10px 0",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
  },
  top: {
    background: "green"
  },
  dragged: {
    background: "#653BB5"
  }
});

class PlayerAnswer extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.currentPlayer && (
          <h2>Welcome, {this.props.currentPlayer.name}</h2>
        )}
        <h2>Round: {this.props.round}</h2>
        <Grid
          container
          spacing={16}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={12}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <Reorder
                  reorderId="my-list" // Unique ID that is used internally to track this list (required)
                  //reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
                  //getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
                  component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
                  placeholderClassName={classes.placeholder} // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
                  draggedClassName={classes.dragged} // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                  lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                  holdTime={0} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
                  touchHoldTime={0} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
                  mouseHoldTime={0} // Hold time before dragging begins with mouse (optional), defaults to holdTime
                  onReorder={this.props.onReorder} // Callback when an item is dropped (you will need this to update your state)
                  autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                  disabled={false} // Disable reordering (optional), defaults to false
                  disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                  placeholder={
                    <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
                  }
                >
                  {this.props.answers.map((item, i) => (
                    <div className={i < 3 ? `${classes.item} ${classes.top}` : classes.item} key={item}>
                      {item}
                    </div>
                  ))}
                </Reorder>
                <Button
                  onClick={this.props.submitAnswers}
                  variant="raised"
                  color="secondary"
                  fullWidth={true}
                >
                  Submit Answers
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerAnswer);
