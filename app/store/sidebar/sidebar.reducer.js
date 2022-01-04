import {
  SET_SERVER
} from "./sidebar.actions"

const initialState = {
  server: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SERVER:
      return {
        ...state,
        server: action.payload
      }
    default:
      return state
  }
}
