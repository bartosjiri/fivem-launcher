import React, {Fragment, useRef} from "react"
import {remote} from "electron"
import {connect} from "react-redux"
import SVG from "react-inlinesvg"

import {setSettingsActive, setFivemLocation} from "../../store/settings/settings.actions"
import settingsConfig from "../../configuration/settings.json"

import externalLink from "../../utils/external-link/externalLink"

import Button from "../button/Button"

import settingsStyle from "./Settings.module.scss"

const Settings = ({fivemLocation, fivemInvalid, setFivemLocationAction, setSettingsActiveAction}) => {
  const fivemField = useRef();

  const onFivemClick = () => {
    fivemField.current.click()
  }

  const onFivemSelect = (e) => {
    setFivemLocationAction(e.target.files[0].path)
  }

  const onFivemRestore = () => {
    setFivemLocationAction(settingsConfig.defaultFivemLocation)
  }

  const onSaveClick = (e) => {
    e.preventDefault()
    setSettingsActiveAction(false)
  }

  return (
    <Fragment>
      <section name="fivem-location" className={settingsStyle.section}>
        <div className={settingsStyle.title}>
          <h2>FiveM location</h2>
          <div
            className={settingsStyle.action}
            onClick={() => onFivemRestore()}
          >
            <i className="material-icon">settings_backup_restore</i>
          </div>
        </div>
        <div className={`${settingsStyle.input} ${fivemInvalid && settingsStyle.invalid}`}>
          <div
            className={settingsStyle.field}
            onClick={() => onFivemClick()}
          >
            {fivemLocation}
          </div>
          <input
            ref={fivemField}
            onChange={(e) => onFivemSelect(e)}
            type="file"
            accept=".exe"
            hidden
          />
          <div className={settingsStyle.hint}>
            Select a valid FiveM.exe location
          </div>
        </div>
      </section>
      <section name="exit" className={settingsStyle.section}>
        <Button
          to="/"
          onClick={e => onSaveClick(e)}
          primary
        >
          <span>Close settings</span>
        </Button>
      </section>
      <section name="footnotes" className={settingsStyle.section}>
        <div>
          <span>{`Application version: ${remote.app.getVersion()}`}</span>
        </div>
        <div>
          <span
            className={settingsStyle.credits}
            onClick={() => externalLink("https://github.com/bartosjiri")}
          >
            {"Developed by"}
            <SVG src="./assets/icons/miscellaneous/bartosjiri.svg" />
          </span>
        </div>
      </section>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  fivemLocation: state.settings.fivemLocation,
  fivemInvalid: state.settings.fivemInvalid
})

const mapDispatchToProps = {
  setSettingsActiveAction: setSettingsActive,
  setFivemLocationAction: setFivemLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
