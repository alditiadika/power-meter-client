import { websocketTypes } from '../types'

const websocketActions = {
  initialize: ws => dispatch => {
    dispatch({ type:websocketTypes.INIT, payload:{ ws } })
  },
  dispatchData:data => dispatch => {
    const { topic, message, created_date } = data
    const [_home, _sensor, gateway, topicCode] = topic.split('/')
    const dataReturn = {
      topic,
      message,
      created_date,
      _home,
      _sensor,
      gateway,
      topicCode
    }
    dispatch({ type:websocketTypes.DISPATCH_DATA, payload:{ data:dataReturn } })
  }
}
export default websocketActions