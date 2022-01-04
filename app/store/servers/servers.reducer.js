import {
  SET_SERVERS,
  UPDATE_SERVER
} from "./servers.actions"

import configuredServersParser from "../../utils/parsers/configuredServersParser"

import servers from "../../configuration/servers.json"

const configuredServers = configuredServersParser(servers)

const initialState = [...configuredServers]

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SERVERS:
      return [...action.payload]
    case UPDATE_SERVER:
      return state.map(
        server => server.id === action.id
          ? action.payload
          : server
      )
    default:
      return state
  }
}