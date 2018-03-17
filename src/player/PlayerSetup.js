import React, { Component } from "react";
import Button from "material-ui/Button";

const PlayerSetup = props => (
  <div key="nameDiv">
    {props.currentPlayer && <h2>Hi {props.currentPlayer.name}!</h2>}
    {props.firstPlayer && (
      <Button
        variant="raised"
        label="{title}"
        color="primary"
        style={{ margin: 12 }}
        onClick={props.readyToStart}
      >
        Start Game!
      </Button>
    )}
  </div>
);

export default PlayerSetup;
