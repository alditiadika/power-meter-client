import axios from 'axios'
import * as time from 'd3-time'
import { dashboardTypes } from '../types'
import { SERVICE } from '../../config/config.json'
import v_voltage_data from '../../data-dummy/v_voltage_data.json' 
import v_current_data from '../../data-dummy/v_current_data.json'
import v_power_data from '../../data-dummy/v_power_data.json'
import v_energy_data from '../../data-dummy/v_energy_data.json'

const dashboardActions = {
  getDataVoltage: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor ? sensor:'gateway_1'}&topic=Voltage_LN_Avg`)
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
      const rawData = v_voltage_data.filter(x => x.topic === 'home/sensors/gateway_1/Voltage_LN_Avg')
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
      // dispatch({ type:dashboardTypes.GET_DATA_VOLTAGE, payload:{ isError:true } })
    }
  },
  getDataCurrent: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor ? sensor:'gateway_1'}&topic=Current_Avg`)
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
      const rawData = v_current_data.filter(x => x.topic === 'home/sensors/gateway_1/Current_Avg')
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
      // dispatch({ type:dashboardTypes.GET_DATA_CURRENT, payload:{ isError:true } })
    }
  },
  getDataPower: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor ? sensor:'gateway_1'}&topic=Active_Power_Total`)
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
      const rawData = v_power_data.filter(x => x.topic === 'home/sensors/gateway_1/Active_Power_Total')
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
      // dispatch({ type:dashboardTypes.GET_DATA_POWER, payload:{ isError:true } })
    }
  },
  getDataEnergy: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}?sensor=${sensor ? sensor:'gateway_1'}&topic=ActiveEnergyDelivered`)
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
      const rawData = v_energy_data.filter(x => x.topic === 'home/sensors/gateway_1/ActiveEnergyDelivered')
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
      // dispatch({ type:dashboardTypes.GET_DATA_ENERGY, payload:{ isError:true } })
    }
  },
  getDataGaugeChart: sensor => async dispatch => {
    try {
      const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}/gauge?sensor=${sensor ? sensor:'gateway_1'}`)
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
      const dataDummy = {
        voltage:219.67,
        current:0.35,
        power:0.04,
        power_factor:0.04,
        energy:5.52
      }
      const payload = {
        isError:false,
        data:dataDummy
      }
      dispatch({ type:dashboardTypes.GET_DATA_GAUGE_CHART, payload })
      // dispatch({ type:dashboardTypes.GET_DATA_GAUGE_CHART, payload:{ isError:true } })
    }
  }
}
export default dashboardActions