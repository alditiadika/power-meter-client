import * as time from 'd3-time'
import { currentTypes } from '../types'

const initialState = {
  dataLoad:{ isLoad:false, data:{} },
  current:{
    loading:true,
    options:[
      { id:'current_a', name:'Current A', code:'Current_A', selected:false },
      { id:'current_b', name:'Current B', code:'Current_B', selected:false },
      { id:'current_c', name:'Current C', code:'Current_C', selected:false },
      { id:'current_avg', name:'Current AVG', code:'Current_Avg', selected:true },
      { id:'max_current_avg', name:'Max Current AVG', code:'MaxCurrentAvg', selected:false }
    ],
    current_a:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    current_b:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    current_c:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    current_avg:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    max_current_avg:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    }
  },
  thd_current:{
    loading:true,
    options:[
      { id:'thd_current_a', name:'THD Current A', code:'THDCurrentA', selected:true },
      { id:'thd_current_b', name:'THD Current B', code:'THDCurrentB', selected:false },
      { id:'thd_current_c', name:'THD Current C', code:'THDCurrentC', selected:false },
      { id:'thd_current_n', name:'THD Current N', code:'THDCurrentN', selected:false },
      { id:'thd_current_g', name:'THD Current G', code:'THDCurrentG', selected:false },
    ],
    thd_current_a:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    thd_current_b:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    thd_current_c:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    thd_current_n:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    },
    thd_current_g:{
      rawData:[],
      timeSeries:[],
      minValue:0,
      maxValue:0
    }
  }
}
const currentReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case currentTypes.GET_DATA: {
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
    case currentTypes.SELECT_OPTIONS: {
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
    case currentTypes.REFRESH_REDUCER: {
      return {
        ...initialState,
        current:{
          ...initialState.current,
          options:state.current.options
        },
        thd_current:{
          ...initialState.thd_current,
          options:state.thd_current.options
        }
      }
    }
    case currentTypes.CHANGE_LINE_CHART_DATA: {
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
export default currentReducer