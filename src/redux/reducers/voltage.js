import * as time from 'd3-time'
import { voltageTypes } from '../types'

const initialState = {
  dataLoad:{ isLoad:false, data:{} },
  voltage:{
    loading:true,
    options:[
      { id:'voltage_a', name:'Voltage AB', code:'Voltage_A', selected:false },
      { id:'voltage_b', name:'Voltage BC', code:'Voltage_B', selected:false },
      { id:'voltage_c', name:'Voltage CA', code:'Voltage_C', selected:false },
      { id:'voltage_ll_avg', name:'Voltage LL AVG', code:'Voltage_LL_Avg', selected:false },
      { id:'voltage_an', name:'Voltage AN', code:'Voltage_AN', selected:true },
      { id:'voltage_bn', name:'Voltage BN', code:'Voltage_BN', selected:false },
      { id:'voltage_cn', name:'Voltage CN', code:'Voltage_CN', selected:false },
      { id:'voltage_ln_avg', name:'Voltage LN AVG', code:'Voltage_LN_Avg', selected:false },
    ],
    voltage_a:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_b:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_c:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_ll_avg:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_an:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_bn:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_cn:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_ln_avg:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    }
  },
  voltage_unbalanced:{
    loading:true,
    options:[
      { id:'voltage_unbalanced_a', name:'Voltage Unbalanced AB', code:'Voltage_UnbalanceAB', selected:false },
      { id:'voltage_unbalanced_b', name:'Voltage Unbalanced BC', code:'Voltage_UnbalanceBC', selected:false },
      { id:'voltage_unbalanced_c', name:'Voltage Unbalanced CA', code:'Voltage_UnbalanceCA', selected:false },
      { id:'voltage_unbalanced_ll_worst', name:'Voltage Unbalanced LL Worst', code:'Voltage_UnbalanceLLWorst', selected:false },
      { id:'voltage_unbalanced_an', name:'Voltage Unbalanced AN', code:'Voltage_UnbalanceAN', selected:true },
      { id:'voltage_unbalanced_bn', name:'Voltage Unbalanced BN', code:'Voltage_UnbalanceBN', selected:false },
      { id:'voltage_unbalanced_cn', name:'Voltage Unbalanced CN', code:'Voltage_UnbalanceCN', selected:false },
      { id:'voltage_unbalanced_ln_worst', name:'Voltage Unbalanced LN Worst', code:'Voltage_UnbalanceLNWorst', selected:false },
    ],
    voltage_unbalanced_a:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_b:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_c:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_ll_worst:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_an:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_bn:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_cn:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    voltage_unbalanced_ln_worst:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    }
  }
}
const voltageReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case voltageTypes.GET_DATA: {
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
    case voltageTypes.SELECT_OPTIONS: {
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
    case voltageTypes.CHANGE_LINE_CHART_DATA: {
      const { dataType, addedRawData } = action.payload
      const option = state[dataType].options.find(x => x.code === addedRawData.topicCode)
      if(option) {
        const slicedData = state[dataType][option.id].rawData.slice(1)
        const rawData = slicedData.concat(addedRawData)
        const timeSeries = rawData.map(item => ({ x:time.timeMinute.offset(new Date(item.created_date), 0), y:item.value }))
        const val = rawData.map(item => item.value)
        const minValue = Math.min(...val)
        const maxValue = Math.max(...val)
        return {
          ...state,
          [dataType]:{
            ...state[dataType],
            [option.id]: {
              rawData,
              timeSeries,
              minValue,
              maxValue
            }
          }
        }
      }
      return { ...state }
    }
    default:
      return {
        ...state
      }
  }
}
export default voltageReducer