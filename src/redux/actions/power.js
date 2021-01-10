import axios from 'axios'
import * as time from 'd3-time'
import moment from 'moment'
import { powerTypes } from '../types'
import { SERVICE } from '../../config/config.json'

const PowerActions = {
  getData:({ sensor, dataType, subDataType, selectedOption }) => async dispatch => {
    const topic = selectedOption.code
    try {
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
    } catch(e) {
      console.log(e)
    }
  },
  changeOptions:(dataType, data) => dispatch => {
    const payload = { dataType, data }
    dispatch({ type:powerTypes.SELECT_OPTIONS, payload })
  },
  changeLineChartData:data => dispatch => {
    const activePowerReg = new RegExp('Active_Power_A|Active_Power_B|Active_Power_C|Active_Power_Total')
    const reactivePowerReg = new RegExp('Reactive_Power_A|Reactive_Power_B|Reactive_Power_C|Reactive_Power_Total')
    const apparentPowerReg = new RegExp('Apparent_Power_A|Apparent_Power_B|Apparent_Power_C|Apparent_Power_Total')
    const powerFactorReg = new RegExp('Power_Factor_A|Power_Factor_B|Power_Factor_C|Power_Factor_Total|Displacement_Power_Factor_A|Displacement_Power_Factor_B|Displacement_Power_Factor_C|Displacement_Power_Factor_Total|Power_Factor_Total_Alt1|Power_Factor_Total_Alt2|Power_Factor_Total_Alt3|Power_Factor_Total_Alt4')

    const { created_date, value, sensor, topic, topicCode } = data
    if(activePowerReg.test(topicCode)) {
      const payload = {
        dataType:'active_power',
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
      dispatch({ type:powerTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(reactivePowerReg.test(topicCode)) {
      const payload = {
        dataType:'reactive_power',
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
      dispatch({ type:powerTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(apparentPowerReg.test(topicCode)) {
      const payload = {
        dataType:'apparent_power',
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
      dispatch({ type:powerTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(powerFactorReg.test(topicCode)) {
      const payload = {
        dataType:'power_factor',
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
      dispatch({ type:powerTypes.CHANGE_LINE_CHART_DATA, payload })
    }
  }
}
export default PowerActions