import React, { Component } from "react";
import fire from "../fire";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class PlayerChoice extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div>

        <h2>Round: {this.props.round}</h2>
        {this.props.currentPlayer && (
          <h2>Alright, {this.props.currentPlayer.name}</h2>
        )}

        <TextField
          label="Type Something"
          value={this.props.choice}
          onChange={this.props.changeChoice}
        />
        <Button
          variant="raised"
          label="{title}"
          color="primary"
          style={{ margin: 12 }}
          onClick={this.props.submitChoice}
        >
          Submit Choice
        </Button>

      </div>
    );
  }
}

export default PlayerChoice;
