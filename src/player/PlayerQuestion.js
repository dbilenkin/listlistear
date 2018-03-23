import React, { Component } from "react";
import fire from "../fire";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class PlayerQuestion extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Alright, {this.props.name}</h2>
        <h3>Come up with a topic or question!</h3>

        <TextField
          style={{width: '300px'}}
          label="Topic or Question"
          value={this.props.question}
          onChange={this.props.changeQuestion}
          autoFocus={true}
        />
        <Button
          variant="raised"
          label="{title}"
          color="primary"
          style={{ margin: 12 }}
          onClick={this.props.submitQuestion}
        >
          Submit Question
        </Button>

      </div>
    );
  }
}

export default PlayerQuestion;
