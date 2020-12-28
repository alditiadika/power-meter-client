import { combineReducers } from 'redux'
import dashboardReducer from './dashboard'
import voltageReducer from './voltage'
import currentReducer from './current'
import powerReducer from './power'
import energyReducer from './energy'
import settingsReducer from './settings'

const rootReducer = combineReducers({
  dashboardReducer,
  voltageReducer,
  currentReducer,
  powerReducer,
  energyReducer,
  settingsReducer
})
export default rootReducer
