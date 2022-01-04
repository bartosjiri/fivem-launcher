import Store from "electron-store"

const store = new Store();

export const setSettingsConfig = (key, value) => {
  store.set({
    settings: {
      [key]: value
    }
  })
}

export const getSettingsConfig = (key) => {
  const storeData = store.get("settings")
  if (typeof storeData == "undefined") {
    return null
  } else {
    return storeData[key]
  }
}
