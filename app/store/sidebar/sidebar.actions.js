export const SET_SERVER = "SET_SERVER"

export const setServer = (serverId) => {
  console.log("serverId: ", serverId)
  return {
    type: SET_SERVER,
    payload: serverId
  }
}
