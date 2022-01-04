import React from "react"
import {connect} from "react-redux"
import SVG from "react-inlinesvg"

import {setSettingsActive} from "../../store/settings/settings.actions"

import settingscontrolStyle from "./SettingsControl.module.scss"

const SettingsControl = ({settingsActive, setSettingsActiveAction}) => {
  return (
    <div
      className={`${settingscontrolStyle.action} ${settingsActive && settingscontrolStyle.active}`}
      onClick={() => setSettingsActiveAction(!settingsActive)}
    >
      <SVG src="assets/icons/miscellaneous/settings.svg" />
    </div>
  )
}

const mapStateToProps = (state) => ({
  settingsActive: state.settings.active
})

const mapDispatchToProps = {
  setSettingsActiveAction: setSettingsActive
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsControl)
