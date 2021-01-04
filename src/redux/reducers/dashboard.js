import * as time from 'd3-time'
import { dashboardTypes } from '../types'

const initialState = {
  data:{
    gaugeChartData:{
      voltage:0,
      current:0,
      power:0,
      power_factor:0,
      energy:0
    },
    voltage:{ 
      loading:true, 
      rawData:[], 
      minValue:0,
      maxValue:0,
      timeSeries: [] 
    },
    current:{ 
      loading:true, 
      rawData:[], 
      minValue:0,
      maxValue:0,
      timeSeries: [] 
    },
    power:{ 
      loading:true, 
      rawData:[], 
      minValue:0,
      maxValue:0,
      timeSeries: [] 
    },
    energy:{ 
      loading:true, 
      rawData:[], 
      minValue:0,
      maxValue:0,
      timeSeries: [] 
    }
  }
}
const dashboardReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case dashboardTypes.GET_DATA_VOLTAGE: {
      const { isError, rawData, timeSeries, minValue, maxValue } = action.payload
      if(!isError) {
        return {
          ...state,
          data:{
            ...state.data,
            voltage:{
              ...state.data.voltage,
              rawData,
              timeSeries,
              minValue, 
              maxValue,
              loading:false
            }
          }
        }
      }  
      return {
        ...state,
        data:{
          ...state.data,
          voltage:{
            ...state.data.voltage,
            loading:false
          }
        }
      }
    }
    case dashboardTypes.GET_DATA_CURRENT: {
      const { isError, rawData, timeSeries, minValue, maxValue } = action.payload
      if(!isError) {
        return {
          ...state,
          data:{
            ...state.data,
            current:{
              ...state.data.current,
              rawData,
              timeSeries,
              minValue, 
              maxValue,
              loading:false
            }
          }
        }
      }  
      return {
        ...state,
        data:{
          ...state.data,
          current:{
            ...state.data.current,
            loading:false
          }
        }
      }
    }
    case dashboardTypes.GET_DATA_POWER: {
      const { isError, rawData, timeSeries, minValue, maxValue } = action.payload
      if(!isError) {
        return {
          ...state,
          data:{
            ...state.data,
            power:{
              ...state.data.power,
              rawData,
              timeSeries,
              minValue, 
              maxValue,
              loading:false
            }
          }
        }
      }  
      return {
        ...state,
        data:{
          ...state.data,
          power:{
            ...state.data.power,
            loading:false
          }
        }
      }
    }
    case dashboardTypes.GET_DATA_ENERGY: {
      const { isError, rawData, timeSeries, minValue, maxValue } = action.payload
      if(!isError) {
        return {
          ...state,
          data:{
            ...state.data,
            energy:{
              ...state.data.energy,
              rawData,
              timeSeries,
              minValue, 
              maxValue,
              loading:false
            }
          }
        }
      }  
      return {
        ...state,
        data:{
          ...state.data,
          energy:{
            ...state.data.energy,
            loading:false
          }
        }
      }
    }
    case dashboardTypes.GET_DATA_GAUGE_CHART: {
      const { isError, data } = action.payload
      if(!isError) {
        return {
          ...state,
          data:{
            ...state.data,
            gaugeChartData:data
          }
        }
      }
      return state
    }
    case dashboardTypes.CHANGE_GAUGE_DATA: {
      const { dataType, value } = action.payload
      return {
        ...state,
        data:{
          ...state.data,
          gaugeChartData:{
            ...state.data.gaugeChartData,
            [dataType]:value
          }
        }
      }
    }
    case dashboardTypes.CHANGE_LINE_CHART_DATA: {
      const { dataType, addedRawData } = action.payload
      const slicedData = state.data[dataType].rawData.slice(1)
      const rawData = slicedData.concat(addedRawData)
      const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
      const val = rawData.map(item => item.value)
      const minValue = Math.min(...val)
      const maxValue = Math.max(...val)
      return {
        ...state,
        data:{
          ...state.data,
          [dataType]:{
            loading:false,
            rawData,
            timeSeries,
            minValue,
            maxValue
          }
        }
      }
    }
    default:
      return state
  }
}
export default dashboardReducer