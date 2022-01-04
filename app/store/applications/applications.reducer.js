import {
  SET_APPLICATIONS
} from "./applications.actions"

import configuredApplicationsParser from "../../utils/parsers/configuredApplicationsParser"
import applications from "../../configuration/applications.json"

const configuredApplications = configuredApplicationsParser(applications)

const initialState = [...configuredApplications]

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_APPLICATIONS:
      return [...action.payload]
    default:
      return state
  }
}