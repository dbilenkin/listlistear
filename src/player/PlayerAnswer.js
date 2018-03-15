import React, { Component } from "react";
import fire from "../fire";

class PlayerAnswer extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.currentPlayer && (
          <h2>Welcome, {this.props.currentPlayer.name}</h2>
        )}
        <h2>Round: {this.props.round}</h2>
        <form onSubmit={this.props.submitAnswers}>
          {[...Array(this.props.numAnswers)].map((_,i) => (
            <input
              key={i}
              id={i}
              type="text"
              value={this.props.answers[i]}
              onChange={this.props.changeAnswer(i)}
            />
          ))}

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default PlayerAnswer;
