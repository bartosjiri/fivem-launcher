import settingsConfig from "../../configuration/settings.json"

const fivemLocationParser = (path) => {
  if (path === settingsConfig.defaultFivemLocation) {
    const translatedPath = path.replace("%localappdata%", process.env.LOCALAPPDATA)
    return new URL(`file:///${translatedPath}`)
  } else {
    return new URL(`file:///${path}`)
  }
}

export default fivemLocationParser
