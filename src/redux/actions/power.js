import axios from 'axios'
import * as time from 'd3-time'
import { powerTypes } from '../types'
import { SERVICE } from '../../config/config.json'

const PowerActions = {
  getData:({ sensor = 'gateway_1', dataType, subDataType, selectedOption }) => async dispatch => {
    const topic = selectedOption.code
    const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor}&topic=${topic}`)
    const rawData = data.message
    const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
    const val = rawData.map(item => item.value)
    const minValue = Math.min(...val)
    const maxValue = Math.max(...val)
    const dataReturn = {
      rawData:data.message,
      timeSeries,
      minValue,
      maxValue
    }
    const payload = {
      dataType,
      subDataType,
      data:dataReturn
    }
    dispatch({ type:powerTypes.GET_DATA, payload })
  },
  changeOptions:(dataType, data) => dispatch => {
    const payload = { dataType, data }
    dispatch({ type:powerTypes.SELECT_OPTIONS, payload })
  }
}
export default PowerActions