import React, { Component } from "react";
import fire from "../fire";

class PlayerChoice extends Component {
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
        <form onSubmit={this.props.submitChoices}>
          {[...Array(this.props.numChoices)].map((_,i) => (
            <input
              key={i}
              id={i}
              type="text"
              value={this.props.choices[i]}
              onChange={this.props.changeChoice(i)}
            />
          ))}

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default PlayerChoice;
