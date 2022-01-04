import React from "react"
import PropTypes from "prop-types"

import windowControlsStyle from "./WindowControls.module.scss"

const ControlButton = icon => {
  const iconName = icon.icon
  const iconPath = `./assets/icons/windows/${iconName}`
  const source = `
    ${iconPath}-10.png 1x,
    ${iconPath}-12.png 1.25x,
    ${iconPath}-15.png 1.5x,
    ${iconPath}-15.png 1.75x,
    ${iconPath}-20.png 2x,
    ${iconPath}-20.png 2.25x,
    ${iconPath}-24.png 2.5x,
    ${iconPath}-30.png 3x,
    ${iconPath}-30.png 3.5x
  `

  return (
    <img
      className={windowControlsStyle.icon}
      srcSet={source}
      draggable="false"
    />
  )
}

ControlButton.propTypes = {
  icon: PropTypes.string.isRequired
}

export default ControlButton
