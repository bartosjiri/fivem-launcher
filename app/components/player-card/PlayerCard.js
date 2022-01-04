import React from "react"

import playerCardStyle from "./PlayerCard.module.scss"

const PlayerCard = ({playerName}) => {
  return (
    <li className={playerCardStyle.card}>
      <div className={playerCardStyle.avatar}>{playerName.charAt(0).toUpperCase()}</div>
      <span className={playerCardStyle.name}>{playerName}</span>
    </li>
  )
}

export default PlayerCard
