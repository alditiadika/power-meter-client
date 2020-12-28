import axios from 'axios'
import * as time from 'd3-time'
import { currentTypes } from '../types'
import { SERVICE } from '../../config/config.json'
import v_current_data from '../../data-dummy/v_current_data.json'

const currentActions = {
  getData:({ sensor = 'gateway_1', dataType, subDataType, selectedOption }) => async dispatch => {
    const topic = selectedOption.code
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor}&topic=${topic}`)
      const rawData = data.message
      const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
      const val = rawData.map(item => item.value)
      const minValue = Math.min(...val)
      const maxValue = Math.max(...val)
      const dataReturn = {
        rawData,
        timeSeries,
        minValue,
        maxValue
      }
      const payload = {
        dataType,
        subDataType,
        data:dataReturn
      }
      dispatch({ type:currentTypes.GET_DATA, payload })
    } catch(e) {
      console.log(e)
      const exactTopic = 'home/sensors/gateway_1/' + topic
      const rawData = v_current_data.filter(x => x.topic === exactTopic)
      const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
      const val = rawData.map(item => item.value)
      const minValue = Math.min(...val)
      const maxValue = Math.max(...val)
      const dataReturn = {
        rawData,
        timeSeries,
        minValue,
        maxValue
      }
      const payload = {
        dataType,
        subDataType,
        data:dataReturn
      }
      dispatch({ type:currentTypes.GET_DATA, payload })
    }
  },
  changeOptions:(dataType, data) => dispatch => {
    const payload = { dataType, data }
    dispatch({ type:currentTypes.SELECT_OPTIONS, payload })
  }
}
export default currentActions