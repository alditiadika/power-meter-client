import axios from 'axios'
import * as time from 'd3-time'
import moment from 'moment'
import { voltageTypes } from '../types'
import { SERVICE } from '../../config/config.json'

const voltageActions = {
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
      dispatch({ type:voltageTypes.GET_DATA, payload })
    } catch(e) {
      console.log(e)
    }
  },
  changeOptions:(dataType, data) => dispatch => {
    const payload = { dataType, data }
    dispatch({ type:voltageTypes.SELECT_OPTIONS, payload })
  },
  changeLineChartData:data => dispatch => {
    const voltageReg = new RegExp('Voltage_A|Voltage_B|Voltage_C|Voltage_LL_Avg|Voltage_LL_Avg|Voltage_AN|Voltage_BN|Voltage_CN|Voltage_LN_Avg')
    const unbalancedVoltageReg = new RegExp('Voltage_UnbalanceAB|Voltage_UnbalanceBC|Voltage_UnbalanceCA|Voltage_UnbalanceLLWorst|Voltage_UnbalanceAN|Voltage_UnbalanceBN|Voltage_UnbalanceCN|Voltage_UnbalanceLNWorst')
    const { created_date, value, sensor, topic, topicCode } = data
    if(voltageReg.test(topicCode)) {
      const payload = {
        dataType:'voltage',
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
      dispatch({ type:voltageTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(unbalancedVoltageReg.test(topicCode)) {
      const payload = {
        dataType:'voltage_unbalanced',
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
      dispatch({ type:voltageTypes.CHANGE_LINE_CHART_DATA, payload })
    }
  }
}
export default voltageActions