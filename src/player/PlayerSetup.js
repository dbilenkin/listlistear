import React, { Component } from "react";

const PlayerSetup = props => (
  <div key="nameDiv">
    {!props.currentPlayer && (
      <div>
        <label>
          Name:
          <input
            type="text"
            key="nameField"
            value={props.name}
            onChange={props.changeHandler}
          />
        </label>
        <button onClick={props.addHandler}>Join Game</button>
      </div>
    )}
    {props.currentPlayer && <h2>Welcome, {props.currentPlayer.name}</h2>}
    {props.firstPlayer && (
      <button onClick={props.readyToStart}>Start Game!</button>
    )}
  </div>
);

export default PlayerSetup;
