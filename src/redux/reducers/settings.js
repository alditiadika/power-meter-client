import { settingsTypes } from '../types'

const initialState = {
  dataObj: {
    voltage_min:200,
    voltage_max:300,
    current_min:0,
    current_max:2,
    power_min:0,
    power_max:1,
    energy_min:0,
    energy_max:10,
    power_factor_min:-2.54,
    power_factor_max:1,
  },
  dataTable:[
    { id:1, inEdit:false, code:'voltage', title:'Voltage', min_value:200, max_value:300 },
    { id:3, inEdit:false, code:'current', title:'Current', min_value:0, max_value:2 },
    { id:5, inEdit:false, code:'power', title:'Power', min_value:0, max_value:1 },
    { id:7, inEdit:false, code:'energy', title:'Energy', min_value:0, max_value:10 },
    { id:9, inEdit:false, code:'power_factor', title:'Power Factor', min_value:-2.54, max_value:1 }
  ],
  temporaryDataItem:{}
}

const settingsReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case settingsTypes.INITIALIZE_SETTINGS:{
      const { dataTable, isEmpty } = action.payload
      if(isEmpty) {
        localStorage.setItem('settingsDatatable', JSON.stringify(state.dataTable))
        return state
      }
      const dataObj = generator(dataTable)
      return {
        ...state,
        dataObj,
        dataTable
      }
    }
    case settingsTypes.ONCHANGE_DATAITEM:{
      const { field, dataItem, value } = action.payload
      const dataTable = state.dataTable.map(item => {
        if(item.id === dataItem.id) {
          return {
            ...dataItem,
            [field]:value
          }
        }
        return item
      })
      return {
        ...state,
        dataTable
      }
    }
    case settingsTypes.ONCLICK_EDIT:{
      const { dataItem } = action.payload
      const dataTable = state.dataTable.map(item => {
        if(item.id === dataItem.id) {
          return { ...item, inEdit:true }
        }
        if(item.inEdit) {
          return {
            ...state.temporaryDataItem,
            inEdit:false
          }
        }
        return { ...item, inEdit:false }
      })
      return {
        ...state,
        dataTable,
        temporaryDataItem:dataItem
      }
    }
    case settingsTypes.ON_DISCARD: {
      const { dataItem } = action.payload
      const temporaryDataItem = state.temporaryDataItem
      const dataTable = state.dataTable.map(item => {
        if(item.id === dataItem.id) {
          return { ...temporaryDataItem, inEdit:false }
        }
        return item
      })
      return {
        ...state,
        dataTable,
        temporaryDataItem:{}
      }
    }
    case settingsTypes.ON_SAVE:{
      const dataTable = state.dataTable.map(item => ({ ...item, inEdit:false }))
      const dataObj = generator(dataTable)
      localStorage.setItem('settingsDatatable', JSON.stringify(dataTable))
      return {
        ...state,
        dataTable,
        dataObj,
        temporaryDataItem:{}
      }
    }
    default:
      return {
        ...state
      }
  }
}
export default settingsReducer
const generator = (dataTable) => {
  let obj = {}
  dataTable.forEach(item => {
    obj[item.code + '_min'] = item.min_value
    obj[item.code + '_max'] = item.max_value
  })
  return obj
}