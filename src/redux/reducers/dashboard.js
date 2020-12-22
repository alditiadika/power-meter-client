import { dashboardTypes } from '../types'

const initialState = {
  data:{
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
    default:
      return state
  }
}
export default dashboardReducer