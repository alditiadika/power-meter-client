import { combineReducers } from 'redux'
import dashboardReducer from './dashboard'
import voltageReducer from './voltage'
import currentReducer from './current'
import powerReducer from './power'
import energyReducer from './energy'

const rootReducer = combineReducers({
  dashboardReducer,
  voltageReducer,
  currentReducer,
  powerReducer,
  energyReducer
})
export default rootReducer
