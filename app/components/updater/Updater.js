import React, {useState} from "react"
import {ipcRenderer} from "electron"

import updaterStyle from "./Updater.module.scss"

const Updater = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [restartReady, setRestartReady] = useState(false)

  ipcRenderer.on('status', function (event, data) {
    if (data.status === "update_progress") {
      setNotificationMessage(data.message)
    } else if (data.status === "update_downloaded") {
      setNotificationMessage("Update available")
      setRestartReady(true)
    } else {
      setNotificationMessage(null)
      setRestartReady(false)
    }
  })

  const onRestart = () => {
    ipcRenderer.send('mainprocess_action', {action: "app_restart"})
  }

  const onDismiss = () => {
    setNotificationActive(false)
  }

  return (
    <div className={`${updaterStyle.updater} ${notificationMessage && updaterStyle.active} ${restartReady && updaterStyle.restartable}`}>
      <div className={updaterStyle.content}>
        {notificationMessage}
      </div>
      {restartReady && (
        <div
          className={updaterStyle.action}
          onClick={() => onRestart()}
        >
          <i className="material-icon">refresh</i>
        </div>
      )}
    </div>
  )
}

export default Updater
