import React from "react"
import {Link} from "react-router-dom"

import Updater from "../../components/updater/Updater"
import SettingsControl from "../../components/settings/SettingsControl"
import WindowControls from "../../components/window-controls/WindowControls"

import headerStyle from "./Header.module.scss"

const Header = () => {
  return (
    <header className={headerStyle.bar}>
      <div className={headerStyle.updater}>
        <Updater />
      </div>
      <div className={headerStyle.settings}>
        <SettingsControl />
      </div>
      <div className={headerStyle.controls}>
        <WindowControls />
      </div>
    </header>
  )
}

export default Header
