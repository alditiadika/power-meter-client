import { websocketTypes } from '../types'

const initialState = {
  ws:undefined,
  data:{}
}
const webSocketReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case websocketTypes.INIT: {
      const { ws } = action.payload
      return {
        ...state,
        ws
      }
    }
    case websocketTypes.DISPATCH_DATA: {
      const { data } = action.payload
      return {
        ...state,
        data
      }
    }
    default:
      return { ...state }
  }
}
export default webSocketReducer