import axios from 'axios'
import * as time from 'd3-time'
import moment from 'moment'
import { dashboardTypes } from '../types'
import { SERVICE } from '../../config/config.json'

const dashboardActions = {
  getDataVoltage: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor}&topic=Voltage_LN_Avg`)
      if(data.status === 200) {
        const rawData = data.message
        const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
        const val = rawData.map(item => item.value)
        const minValue = Math.min(...val)
        const maxValue = Math.max(...val)
        const payload = {
          isError:false,
          rawData,
          timeSeries,
          minValue,
          maxValue
        }
        dispatch({ type:dashboardTypes.GET_DATA_VOLTAGE, payload })
      } else {
        console.log('error backend')
        dispatch({ type:dashboardTypes.GET_DATA_VOLTAGE, payload:{ isError:true } })
      }
      
    } catch(e) {
      console.log('error catch')
      console.log(e)
      dispatch({ type:dashboardTypes.GET_DATA_VOLTAGE, payload:{ isError:true } })
    }
  },
  getDataCurrent: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor}&topic=Current_Avg`)
      if(data.status === 200) {
        const rawData = data.message
        const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
        const val = rawData.map(item => item.value)
        const minValue = Math.min(...val)
        const maxValue = Math.max(...val)
        const payload = {
          isError:false,
          rawData,
          timeSeries,
          minValue,
          maxValue
        }
        dispatch({ type:dashboardTypes.GET_DATA_CURRENT, payload })
      } else {
        console.log('error backend')
        dispatch({ type:dashboardTypes.GET_DATA_CURRENT, payload:{ isError:true } })
      }
      
    } catch(e) {
      console.log('error catch')
      console.log(e)
      dispatch({ type:dashboardTypes.GET_DATA_CURRENT, payload:{ isError:true } })
    }
  },
  getDataPower: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor}&topic=Active_Power_Total`)
      if(data.status === 200) {
        const rawData = data.message
        const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
        const val = rawData.map(item => item.value)
        const minValue = Math.min(...val)
        const maxValue = Math.max(...val)
        const payload = {
          isError:false,
          rawData,
          timeSeries,
          minValue,
          maxValue
        }
        dispatch({ type:dashboardTypes.GET_DATA_POWER, payload })
      } else {
        console.log('error backend')
        console.log(data.message)
        dispatch({ type:dashboardTypes.GET_DATA_POWER, payload:{ isError:true } })
      }
      
    } catch(e) {
      console.log('error catch')
      console.log(e)
      dispatch({ type:dashboardTypes.GET_DATA_POWER, payload:{ isError:true } })
    }
  },
  getDataEnergy: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor}&topic=ActiveEnergyDelivered`)
      if(data.status === 200) {
        const rawData = data.message
        const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
        const val = rawData.map(item => item.value)
        const minValue = Math.min(...val)
        const maxValue = Math.max(...val)
        const payload = {
          isError:false,
          rawData,
          timeSeries,
          minValue,
          maxValue
        }
        dispatch({ type:dashboardTypes.GET_DATA_ENERGY, payload })
      } else {
        console.log('error backend')
        console.log(data.message)
        dispatch({ type:dashboardTypes.GET_DATA_ENERGY, payload:{ isError:true } })
      }
      
    } catch(e) {
      console.log('error catch')
      console.log(e)
      dispatch({ type:dashboardTypes.GET_DATA_ENERGY, payload:{ isError:true } })
    }
  },
  getDataGaugeChart: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}/gauge?sensor=${sensor}`)
      if(data.status === 200) {
        const payload = {
          isError:false,
          data:data.message
        }
        dispatch({ type:dashboardTypes.GET_DATA_GAUGE_CHART, payload })
      }
    } catch(e) {
      console.log('error catch')
      console.log(e)
      dispatch({ type:dashboardTypes.GET_DATA_GAUGE_CHART, payload:{ isError:true } })
    }
  },
  changeGaugeData: (dataType, value) => dispatch => {
    dispatch({ type:dashboardTypes.CHANGE_GAUGE_DATA, payload:{ dataType, value } })
  },
  changeLineChartData:(dataType, data) => dispatch => {
    const { created_date, value, sensor, topic } = data
    const payload = {
      dataType,
      addedRawData:{
        id:moment().format('x'),
        minute_created: moment(new Date(created_date)).format('YYYY-MM-DD HH:mm'),
        created_date:new Date(created_date),
        sensor,
        topic,
        value
      }
    }
    dispatch({ type:dashboardTypes.CHANGE_LINE_CHART_DATA, payload })
  }
}
export default dashboardActions