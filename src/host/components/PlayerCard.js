import React from "react";

export const PlayerCard = props => {

  return (
    <div key={props.player.name} className={`player-result player${props.i}-result`}>
      <div style={{ color: props.player.color }}>
        {props.children}
      </div>
    </div>
  )
}