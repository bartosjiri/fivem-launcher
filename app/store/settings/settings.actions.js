export const SET_SETTINGS_ACTIVE = "SET_SETTINGS_ACTIVE"
export const SET_FIVEM_LOCATION = "SET_FIVEM_LOCATION"
export const SET_FIVEM_INVALID = "SET_FIVEM_INVALID"

export const setSettingsActive = (status) => {
  return {
    type: SET_SETTINGS_ACTIVE,
    payload: status
  }
}

import {setSettingsConfig} from "../../utils/settings-storage/settingsStorage"
export const setFivemLocation = (path) => {
  setSettingsConfig("fivemLocation", path)
  return {
    type: SET_FIVEM_LOCATION,
    payload: path
  }
}

export const setFivemInvalid = (status) => {
  return {
    type: SET_FIVEM_INVALID,
    payload: status
  }
}
