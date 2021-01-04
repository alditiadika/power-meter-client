import axios from 'axios'
import * as time from 'd3-time'
import moment from 'moment'
import { currentTypes } from '../types'
import { SERVICE } from '../../config/config.json'

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
    }
  },
  changeOptions:(dataType, data) => dispatch => {
    const payload = { dataType, data }
    dispatch({ type:currentTypes.SELECT_OPTIONS, payload })
  },
  changeLineChartData:data => dispatch => {
    const currentReg = new RegExp('Current_A|Current_B|Current_C|Current_Avg|MaxCurrentAvg|')
    const thdCurrentReg = new RegExp('THDCurrentA|THDCurrentB|THDCurrentC|THDCurrentN|THDCurrentG')
    const { created_date, value, sensor, topic, topicCode } = data
    if(currentReg.test(topicCode)) {
      const payload = {
        dataType:'current',
        addedRawData:{
          id:moment().format('x'),
          minute_created: moment(new Date(created_date)).format('YYYY-MM-DD HH:mm'),
          created_date:new Date(created_date),
          sensor,
          topic,
          value,
          topicCode
        }
      }
      dispatch({ type:currentTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(thdCurrentReg.test(topicCode)) {
      const payload = {
        dataType:'thd_current',
        addedRawData:{
          id:moment().format('x'),
          minute_created: moment(new Date(created_date)).format('YYYY-MM-DD HH:mm'),
          created_date:new Date(created_date),
          sensor,
          topic,
          value,
          topicCode
        }
      }
      dispatch({ type:currentTypes.CHANGE_LINE_CHART_DATA, payload })
    }
  }
}
export default currentActions