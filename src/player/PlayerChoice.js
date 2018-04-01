import React, { Component } from "react";
import fire from "../fire";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class PlayerChoice extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }


  componentDidUpdate() {
    document.getElementById('choiceInput').focus();
  }

  render() {

    return (
      <div>

        <h2>Round: {this.props.round}</h2>
        <h2>Alright, {this.props.name}</h2>
        <h3>{this.props.questions[this.props.round]}</h3>

        <TextField
          id='choiceInput'
          label="Type Something"
          value={this.props.choice}
          onChange={this.props.changeChoice}
          autoFocus={true}
        />
        <Button
          variant="raised"
          label="{title}"
          color="primary"
          style={{ margin: 12 }}
          onClick={this.props.submitChoice}
        >
          Submit
        </Button>

      </div>
    );
  }
}

export default PlayerChoice;
