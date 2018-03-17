import React, { Component } from "react";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';

import Button from "material-ui/Button";
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  placeholder: {
    width: '340px',
    height: '40px',
    background: '#ccc',
    margin: '10px'
  },
  item: {
    width: '340px',
    height: '40px',
    background: '#3f51b5',
    color: '#FFF',
    padding: '10px',
    textAlign: 'center',
    fontSize: '16px',
    margin: '10px'
  },
});

class ListFun extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      answers: ['a', 'b', 'c']
    };

    //this.changeName = this.changeName.bind(this);
  }

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    this.setState({
      answers: reorder(this.state.answers, previousIndex, nextIndex)
    });
  }

  onReorderGroup(event, previousIndex, nextIndex, fromId, toId) {
    if (fromId === toId) {
      const list = reorderImmutable(this.state[fromId], previousIndex, nextIndex);

      this.setState({
        [fromId]: list
      });
    } else {
      const lists = reorderFromToImmutable({
        from: this.state[fromId],
        to: this.state[toId]
      }, previousIndex, nextIndex);

      this.setState({
        [fromId]: lists.from,
        [toId]: lists.to
      });
    }
  }



  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.currentPlayer && (
          <h2>Welcome, {this.props.currentPlayer.name}</h2>
        )}
        <h2>Round: {this.props.round}</h2>
        <Reorder
          reorderId="my-list" // Unique ID that is used internally to track this list (required)
          //reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
          //getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
          component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
          placeholderClassName={classes.placeholder} // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
          draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
          lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
          holdTime={100} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
          touchHoldTime={300} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
          mouseHoldTime={100} // Hold time before dragging begins with mouse (optional), defaults to holdTime
          onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
          autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
          disabled={false} // Disable reordering (optional), defaults to false
          disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
          placeholder={
            <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
          }
        >

          {/* <ul>
            {this.state.answers.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul> */}

          {this.state.answers.map((item) => (
            <div className={classes.item} key={item}>
              {item}
            </div>
          ))}


        </Reorder>
        <Button
          onClick={this.props.submitAnswers}
          variant="raised"
          color="secondary"
          fullWidth={true}
          style={{ margin: 12 }}
        >
          Submit Answers
          </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ListFun);
