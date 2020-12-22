import { energyTypes } from '../types'
import { timeSeriesObjectCreator } from '../../utils/timeseries-object-creator'
const emptyData = timeSeriesObjectCreator()

const initialState = {
  dataLoad:{ isLoad:false, data:{} },
  active_energy:{
    loading:true,
    options:[
      { id:'active_energy_delivered', name:'Active Energy Delivered', code:'ActiveEnergyDelivered', selected:true },
      { id:'active_energy_received', name:'Active Energy Received', code:'ActiveEnergyReceived', selected:false },
      { id:'active_energy_delivered_received', name:'Active Energy Delivered Received', code:'ActiveEnergyDeliveredReceived', selected:false },
      { id:'active_energy_delivered_minus_received', name:'Active Energy Delivered - Received', code:'ActiveEnergyDeliveredMinusReceived', selected:false }
    ],
    active_energy_delivered:emptyData,
    active_energy_received:emptyData,
    active_energy_delivered_received:emptyData,
    active_energy_delivered_minus_received:emptyData
  },
  reactive_energy:{
    loading:true,
    options:[
      { id:'reactive_energy_delivered', name:'Reactive Energy Delivered', code:'ReactiveEnergyDelivered', selected:true },
      { id:'reactive_energy_received', name:'Reactive Energy Received', code:'ReactiveEnergyReceived', selected:false },
      { id:'reactive_energy_delivered_received', name:'Reactive Energy Delivered Received', code:'ReactiveEnergyDeliveredReceived', selected:false },
      { id:'reactive_energy_delivered_minus_received', name:'Reactive Energy Delivered - Received', code:'ReactiveEnergyDeliveredMinusReceived', selected:false }
    ],
    reactive_energy_delivered:emptyData,
    reactive_energy_received:emptyData,
    reactive_energy_delivered_received:emptyData,
    reactive_energy_delivered_minus_received:emptyData
  },
  apparent_energy:{
    loading:true,
    options:[
      { id:'apparent_energy_delivered', name:'Apparent Energy Delivered', code:'ApparentEnergyEnergyDelivered', selected:true },
      { id:'apparent_energy_received', name:'Apparent Energy Received', code:'ApparentEnergyEnergyReceived', selected:false },
      { id:'apparent_energy_delivered_received', name:'Apparent Energy Delivered Received', code:'ApparentEnergyEnergyDeliveredReceived', selected:false },
      { id:'apparent_energy_delivered_minus_received', name:'Apparent Energy Delivered - Received', code:'ApparentEnergyEnergyDeliveredMinusReceived', selected:false }
    ],
    apparent_energy_delivered:emptyData,
    apparent_energy_received:emptyData,
    apparent_energy_delivered_received:emptyData,
    apparent_energy_delivered_minus_received:emptyData
  }
}
const energyReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case energyTypes.GET_DATA: {
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
    case energyTypes.SELECT_OPTIONS: {
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
export default energyReducer