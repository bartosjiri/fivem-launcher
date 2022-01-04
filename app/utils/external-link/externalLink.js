import {shell} from "electron"

const externalLink = (href) => {
  href && shell.openExternal(href)
}

export default externalLink
