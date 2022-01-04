const configuredServersParser = (serversObj) => {
  const parsedServers = Object.keys(serversObj)
    .filter(s => serversObj[s].enabled)
    .sort((a, b) => ((serversObj[a].priority > serversObj[b].priority) ? 1 : -1))
    .map(s => ({
      id: s,
      info: {
        priority: serversObj[s].priority,
        label: serversObj[s].label,
        official: true
      },
      address: serversObj[s].address,
      status: {
        online: false,
        players_online: null,
        players_max: null,
        players_list: []
      },
      applications: {
        teamspeak: serversObj[s].teamspeak,
        tokovoip: serversObj[s].tokovoip
      }
    }))
  return parsedServers
}

export default configuredServersParser
