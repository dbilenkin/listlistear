import React, { Component } from "react";
import Button from "material-ui/Button";

const PlayerResult = props => (
  <div key="nameDiv">
    {<h2>Hi {props.name}!</h2>}
    {props.firstPlayer && props.round < props.numRounds && (
      <Button
        variant="raised"
        label="{title}"
        color="primary"
        style={{ margin: 12 }}
        onClick={props.nextRound}
      >
        Next Round!
      </Button>
    )}
    {props.firstPlayer && props.round >= props.numRounds && (
      <Button
        variant="raised"
        label="{title}"
        color="primary"
        style={{ margin: 12 }}
        onClick={props.finishGame}
      >
        Finish Game!
      </Button>
    )}
  </div>
);

export default PlayerResult;
