import { powerTypes } from '../types'
import { timeSeriesObjectCreator } from '../../utils/timeseries-object-creator'
const emptyData = timeSeriesObjectCreator()
const initialState = {
  dataLoad:{ isLoad:false, data:{} },
  active_power:{
    loading:true,
    options:[
      { id:'active_power_a', name:'Active Power A', code:'Active_Power_A', selected:true },
      { id:'active_power_b', name:'Active Power B', code:'Active_Power_B', selected:false },
      { id:'active_power_c', name:'Active Power C', code:'Active_Power_C', selected:false },
      { id:'active_power_total', name:'Active Power Total', code:'Active_Power_Total', selected:false }
    ],
    active_power_a:emptyData,
    active_power_b:emptyData,
    active_power_c:emptyData,
    active_power_avg:emptyData,
    active_power_total:emptyData
  },
  reactive_power:{
    loading:true,
    options:[
      { id:'reactive_power_a', name:'Reactive Power A', code:'Reactive_Power_A', selected:true },
      { id:'reactive_power_b', name:'Reactive Power B', code:'Reactive_Power_B', selected:false },
      { id:'reactive_power_c', name:'Reactive Power C', code:'Reactive_Power_C', selected:false },
      { id:'reactive_power_total', name:'Reactive Power Total', code:'Reactive_Power_Total', selected:false }
    ],
    reactive_power_a:emptyData,
    reactive_power_b:emptyData,
    reactive_power_c:emptyData,
    reactive_power_total:emptyData
  },
  apparent_power:{
    loading:true,
    options:[
      { id:'apparent_power_a', name:'Apparent Power A', code:'Apparent_Power_A', selected:true },
      { id:'apparent_power_b', name:'Apparent Power B', code:'Apparent_Power_B', selected:false },
      { id:'apparent_power_c', name:'Apparent Power C', code:'Apparent_Power_C', selected:false },
      { id:'apparent_power_total', name:'Apparent Power Total', code:'Apparent_Power_Total', selected:false }
    ],
    apparent_power_a:emptyData,
    apparent_power_b:emptyData,
    apparent_power_c:emptyData,
    apparent_power_total:emptyData
  },
  power_factor:{
    loading:true,
    options:[
      { id:'power_factor_a', name:'Power Factor A', code:'Power_Factor_A', selected:true },
      { id:'power_factor_b', name:'Power Factor B', code:'Power_Factor_B', selected:false },
      { id:'power_factor_c', name:'Power Factor C', code:'Power_Factor_C', selected:false },
      { id:'power_factor_total', name:'Power Factor Total', code:'Power_Factor_Total', selected:false },
      { id:'displacement_power_factor_a', name:'Displacement Power Factor A', code:'Displacement_Power_Factor_A', selected:false },
      { id:'displacement_power_factor_b', name:'Displacement Power Factor B', code:'Displacement_Power_Factor_B', selected:false },
      { id:'displacement_power_factor_c', name:'Displacement Power Factor C', code:'Displacement_Power_Factor_C', selected:false },
      { id:'displacement_power_factor_total', name:'Displacement Power Factor Total', code:'Displacement_Power_Factor_Total', selected:false },
      { id:'power_factor_total_alt_1', name:'Power Factor Total Alt 1', code:'Power_Factor_Total_Alt1', selected:false },
      { id:'power_factor_total_alt_2', name:'Power Factor Total Alt 2', code:'Power_Factor_Total_Alt2', selected:false },
      { id:'power_factor_total_alt_3', name:'Power Factor Total Alt 3', code:'Power_Factor_Total_Alt3', selected:false },
      { id:'power_factor_total_alt_4', name:'Power Factor Total Alt 4', code:'Power_Factor_Total_Alt4', selected:false }
    ],
    power_factor_a:emptyData,
    power_factor_b:emptyData,
    power_factor_c:emptyData,
    power_factor_total:emptyData,
    displacement_power_factor_a:emptyData,
    displacement_power_factor_b:emptyData,
    displacement_power_factor_c:emptyData,
    displacement_power_factor_total:emptyData,
    power_factor_total_alt_1:emptyData,
    power_factor_total_alt_2:emptyData,
    power_factor_total_alt_3:emptyData,
    power_factor_total_alt_4:emptyData
  }
}
const powerReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case powerTypes.GET_DATA: {
      const { dataType, subDataType, data } = action.payload
      return { 
        ...state,
        dataLoad:{ isLoad:false, data:{} },
        [dataType]:{
          loading:false,
          ...state[dataType],
          [subDataType]:data
        } 
      }
    }
    case powerTypes.SELECT_OPTIONS: {
      const { dataType, data } = action.payload
      const options = state[dataType].options.map(item => {
        if(data.id === item.id) return data
        return item
      })
      return {
        ...state,
        dataLoad:{
          isLoad:data.selected,
          data
        },
        [dataType]:{
          ...state[dataType],
          loading:data.selected,
          options
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}
export default powerReducer