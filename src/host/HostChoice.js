import React, { Component } from "react";

class HostChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Round {this.props.round}</h2>
        <h3>Everyone list your top {this.props.numChoices} favorite beatles songs!</h3>
      </div>
    );
  }
}

export default HostChoice;
