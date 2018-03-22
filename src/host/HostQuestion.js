import React, { Component } from "react";

class HostQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="round">Round {this.props.round}</p>
        <div className="normal-text">Think of a topic or question like...</div>
        <div className="normal-text">Favorite ice cream flavor</div>
        <div className="normal-text">Craziest made up sandwiches</div>
        <div className="normal-text">Best disney movies</div>
      </div>
    );
  }
}

export default HostQuestion;
