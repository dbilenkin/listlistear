import React, { Component } from "react";

class HostQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`rectangle ${this.props.state}`}>
        <div className="normal-text">Think of a list topic like...</div>
        <ul style={{textAlign: 'left'}}>
          <li className="normal-text">Favorite ice cream flavor</li>
          <li className="normal-text">Craziest made up sandwiches</li>
          <li className="normal-text">Best Disney movies</li>
        </ul>
      </div>
    );
  }
}

export default HostQuestion;
