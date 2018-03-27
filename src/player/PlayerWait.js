import React, { Component } from "react";
import Button from "material-ui/Button";

class PlayerWait extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <div>
        <h2>Hi, {this.props.name}</h2>
        {!props.questionsIn && (<h3>Waiting for other players.</h3>)}
        {props.questionsIn && (<h3>All topics are in.</h3>)}
        {props.state === "wait.question" && props.firstPlayer && props.questionsIn && (
          <Button
            variant="raised"
            label="{title}"
            color="primary"
            style={{ margin: 12 }}
            onClick={props.startRound}
          >
            Start First Round!
        </Button>
        )}
      </div>

    );
  }
}

export default PlayerWait;
