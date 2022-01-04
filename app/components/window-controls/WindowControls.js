import React, {useState} from "react"
import {remote} from "electron"

import ControlButton from "./ControlButton"

import windowControlsStyle from "./WindowControls.module.scss"

const WindowControls = () => {
  const win = remote.getCurrentWindow()
  // const [isMaximized, setIsMaximized] = useState(win.isMaximized())

  // win.once("maximize", () => {
  //   setIsMaximized(true)
  //   return () => {win.removeAllListeners("maximize")}
  // })

  // win.once("unmaximize", () => {
  //   setIsMaximized(false)
  //   return () => {win.removeAllListeners("unmaximize")}
  // })

  // win.once("minimize", () => {
  //   // @TODO: This one still causes memory leaks for some reason
  //   setIsMaximized(false)
  //   return () => {win.removeAllListeners("minimize")}
  // })

  const minControl = () => {win.minimize()}
  // const maxControl = () => {win.maximize()}
  // const restoreControl = () => {win.restore()}
  const closeControl = () => {win.close()}

  return (
    <div className={windowControlsStyle.controls}>
      <div
        className={windowControlsStyle.min}
        onClick={() => minControl()}
      >
        <ControlButton icon="min-w" />
      </div>
      {/* {isMaximized
        ? (
          <div
            className={windowControlsStyle.restore}
            onClick={() => restoreControl()}
          >
            <ControlButton icon="restore-w" />
          </div>
        ) : (
          <div
            className={windowControlsStyle.max}
            onClick={() => maxControl()}
          >
            <ControlButton icon="max-w" />
          </div>
        )} */}
      <div
        className={windowControlsStyle.close}
        onClick={() => closeControl()}
      >
        <ControlButton icon="close-w" />
      </div>
    </div>
  )
}

export default WindowControls
