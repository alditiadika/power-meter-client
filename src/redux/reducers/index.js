import { combineReducers } from 'redux'
import dashboardReducer from './dashboard'
import voltageReducer from './voltage'
import currentReducer from './current'
import powerReducer from './power'
import energyReducer from './energy'
import settingsReducer from './settings'
import websocketReducer from './websocket'

const rootReducer = combineReducers({
  dashboardReducer,
  voltageReducer,
  currentReducer,
  powerReducer,
  energyReducer,
  settingsReducer,
  websocketReducer
})
export default rootReducer
