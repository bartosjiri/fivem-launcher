import React, {Fragment, useEffect, useState} from "react"
import {ipcRenderer} from "electron"
import {connect} from "react-redux"
import {Link, useParams} from "react-router-dom"
import SVG from "react-inlinesvg"

import {setServer} from "../../store/sidebar/sidebar.actions"
import {updateServerStatus} from "../../store/servers/servers.actions"
import {setFivemInvalid} from "../../store/settings/settings.actions"

import externalLink from "../../utils/external-link/externalLink"

import Select from "../select/Select"
import Button from "../button/Button"
import PlayerCard from "../player-card/PlayerCard"

import serverInfoStyle from "./ServerInfo.module.scss"

const ServerInfo = ({
  serverId,
  serversList,
  fivemLocation,
  setServerAction,
  updateServerStatusAction,
  setFivemInvalidAction
}) => {
  const server = serversList.find(s => s.id == serverId)

  const {id, address} = server
  const {label} = server.info
  const {teamspeak, tokovoip} = server.applications
  const {online, players_list, players_max} = server.status

  useEffect(() => {
    updateServerStatusAction(server.id)
  }, [serverId])

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    updateServerStatusAction(server.id)
    let refreshCooldown = setTimeout(() => {
      setTimer(timer + 1)
    }, 20000)
    return () => clearTimeout(refreshCooldown);
  }, [timer])

  ipcRenderer.on("status", function (event, data) {
    if (data.status === "fivem_invalid") {
      setFivemInvalidAction(true)
    }
  })

  const onJoinClick = (e, serverAddress) => {
    e.preventDefault()
    ipcRenderer.send('mainprocess_action', {
      action: "fivem_process",
      payload: {
        command: fivemLocation,
        arguments: [`fivem://connect/${serverAddress}`],
        path: serverAddress
      }
    })
    console.log("[@DEUBG] command: ", `${fivemLocation} +connect ${serverAddress}`)
    // setTimeout(() => {
    //   if (typeof window !== "undefined") {
    //     window.location.href = `fivem://connect/${serverAddress}`
    //   }
    // }, 1000)
  }

  let players = null
  if (players_list.length > 0) {
    players = players_list.map(player => (
      <div className={serverInfoStyle.player} key={player.id}>
        <PlayerCard playerName={player.name}/>
      </div>
    ))
  }

  return (
    <Fragment>
      {serversList.length > 1 && (
        <section name="servers" className={serverInfoStyle.section}>
          <div className={serverInfoStyle.servers}>
            <Select
              current={{label: label, value: id}}
              onSelect={(v) => setServerAction(v)}
              options={serversList.map(s => ({
                value: s.id,
                label: s.info.label
              }))}
            />
          </div>
        </section>
      )}
      <section name="actions" className={serverInfoStyle.section}>
        <div className={serverInfoStyle.title}>
          <h2>Actions</h2>
        </div>
        <div className={serverInfoStyle.actions}>
          {address && (
            <div className={serverInfoStyle.action}>
              <Button to="/" onClick={e => (online && onJoinClick(e, address))} primary disabled={!online}>
                <SVG src="./assets/icons/applications/fivem.svg" />
                <span>Join server</span>
              </Button>
            </div>
          )}
          {teamspeak && (
            <div className={serverInfoStyle.action}>
              <Button href={`ts3server://${teamspeak}`}>
                <SVG src="assets/icons/applications/teamspeak.svg" />
                <span>Open comms</span>
              </Button>
              {tokovoip && (
                <div className={serverInfoStyle.description}>
                  {/* <span className={serverInfoStyle.link} onClick={() => externalLink(`https://github.com/Itokoyamato/TokoVOIP_TS3/releases/tag/v${tokovoip}`)} target="_blank">TokoVOIP v{tokovoip}</span> */}
                  <span className={serverInfoStyle.link} onClick={() => externalLink(`https://github.com/Itokoyamato/TokoVOIP_TS3/releases/download/v${tokovoip}/tokovoip-${tokovoip}.ts3_plugin`)} target="_blank">TokoVOIP v{tokovoip}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <section name="players" className={serverInfoStyle.section}>
        <div className={serverInfoStyle.title}>
          <h2>Players {players && `(${players.length}/${players_max})`}</h2>
        </div>
        <div className={serverInfoStyle.players}>
          {online ? (players ? players : "No players online") : "Server is offline"}
        </div>
      </section>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  serversList: state.servers,
  fivemLocation: state.settings.fivemLocation
})

const mapDispatchToProps = {
  setServerAction: setServer,
  updateServerStatusAction: updateServerStatus,
  setFivemInvalidAction: setFivemInvalid
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerInfo)
