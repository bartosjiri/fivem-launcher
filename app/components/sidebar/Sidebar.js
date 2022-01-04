import React, {Fragment} from "react"
import {connect} from "react-redux"

import ServerInfo from "../server-info/ServerInfo"
import Settings from "../settings/Settings"

const Sidebar = ({selectedServer, serversList, settingsActive}) => {
  if (settingsActive) {
    return (<Settings />)
  }

  if (selectedServer) {
    return (<ServerInfo serverId={selectedServer} />)
  } else {
    return (<ServerInfo serverId={serversList[0].id} />)
  }
}

const mapStateToProps = (state) => ({
  selectedServer: state.sidebar.server,
  serversList: state.servers,
  settingsActive: state.settings.active
})

export default connect(mapStateToProps, null)(Sidebar)
