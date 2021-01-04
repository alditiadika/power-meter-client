import axios from 'axios'
import * as time from 'd3-time'
import moment from 'moment'
import { energyTypes } from '../types'
import { SERVICE } from '../../config/config.json'

const energyActions = {
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
      dispatch({ type:energyTypes.GET_DATA, payload })
    } catch(e) {
      console.log(e)
    }
  },
  changeOptions:(dataType, data) => dispatch => {
    const payload = { dataType, data }
    dispatch({ type:energyTypes.SELECT_OPTIONS, payload })
  },
  changeLineChartData:data => dispatch => {
    const activeEnergyReg = new RegExp('ActiveEnergyDelivered|ActiveEnergyReceived|ActiveEnergyDeliveredReceived|ActiveEnergyDeliveredMinusReceived')
    const reactiveEnergyReg = new RegExp('ReactiveEnergyDelivered|ReactiveEnergyReceived|ReactiveEnergyDeliveredReceived|ReactiveEnergyDeliveredMinusReceived')
    const apparentenergyReg = new RegExp('ApparentEnergyEnergyDelivered|ApparentEnergyEnergyReceived|ApparentEnergyEnergyDeliveredReceived|ApparentEnergyEnergyDeliveredMinusReceived')

    const { created_date, value, sensor, topic, topicCode } = data
    if(activeEnergyReg.test(topicCode)) {
      const payload = {
        dataType:'active_energy',
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
      dispatch({ type:energyTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(reactiveEnergyReg.test(topicCode)) {
      const payload = {
        dataType:'reactive_energy',
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
      dispatch({ type:energyTypes.CHANGE_LINE_CHART_DATA, payload })
    }
    if(apparentenergyReg.test(topicCode)) {
      const payload = {
        dataType:'apparent_energy',
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
      dispatch({ type:energyTypes.CHANGE_LINE_CHART_DATA, payload })
    }
  }
}
export default energyActions