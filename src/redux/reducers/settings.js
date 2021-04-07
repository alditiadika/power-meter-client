import { settingsTypes } from '../types'
import { DEFAULT_NAVBAR_OPTIONS } from '../../config/config.json'

const dataTable = [
  { inEdit:false, code:'voltage', title:'Voltage', min_value:200, max_value:300 },
  { inEdit:false, code:'current', title:'Current', min_value:0, max_value:2 },
  { inEdit:false, code:'power', title:'Power', min_value:0, max_value:1 },
  { inEdit:false, code:'energy', title:'Energy', min_value:0, max_value:10 },
  { inEdit:false, code:'power_factor', title:'Power Factor', min_value:-2.54, max_value:1 }
]

const arr = new Array(16 * 5).fill(0).map((_, index) => {
  const id = index + 1
  const dataTableIndex = index % 5
  const gateway = 'gateway_' + (1 + parseInt(index/5))
  const item = dataTable[dataTableIndex]
  return { ...item, id, gateway }
})
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
  navbarOptions:DEFAULT_NAVBAR_OPTIONS,
  dataTable:arr,
  temporaryDataItem:{},
  temporaryDataItemNav:{}
}

const settingsReducer = (state = { ...initialState }, action) => {
  switch(action.type) {
    case settingsTypes.INITIALIZE_SETTINGS: {
      const { dataTable, isEmpty, selectedGateway } = action.payload
      if(isEmpty) {
        return state
      }
      const settingsSelectedGateway = dataTable.filter(e => e.gateway === selectedGateway.code)
      const dataObj = generator(settingsSelectedGateway)
      return {
        ...state,
        dataObj,
        dataTable
      }
    }
    case settingsTypes.INITIALIZE_NAVBAR: {
      const { navbarOptions, isEmpty } = action.payload
      if(isEmpty) {
        return state
      }
      return {
        ...state,
        navbarOptions
      }
    }
    case settingsTypes.CHANGE_GATEWAY: {
      const { value } = action.payload
      const navbarOptions = state.navbarOptions.map(item => {
        if(item.code === value.code) {
          return {
            ...item,
            selected:true
          }
        }
        return {
          ...item,
          selected:false
        }
      })
      const selectedGateway = navbarOptions.find(x => x.selected)
      const settingsSelectedGateway = state.dataTable.filter(e => e.gateway === selectedGateway.code)
      const dataObj = generator(settingsSelectedGateway)
      return {
        ...state,
        navbarOptions,
        dataObj
      }
    }
    case settingsTypes.ONCHANGE_DATAITEM: {
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
    case settingsTypes.ONCLICK_EDIT: {
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
    case settingsTypes.ON_SAVE: {
      const dataTable = state.dataTable.map(item => ({ ...item, inEdit:false }))
      const selectedGateway = state.navbarOptions.find(x => x.selected)
      const settingsSelectedGateway = dataTable.filter(e => e.gateway === selectedGateway.code)
      const dataObj = generator(settingsSelectedGateway)
      return {
        ...state,
        dataTable,
        dataObj,
        temporaryDataItem:{}
      }
    }

    case settingsTypes.ON_CHANGE_GATEWAY_NAME: {
      const { field, dataItem, value } = action.payload
      const navbarOptions = state.navbarOptions.map(item => {
        if(item.code === dataItem.code) {
          return {
            ...dataItem,
            [field]:value
          }
        }
        return item
      })
      return {
        ...state,
        navbarOptions
      }
    }
    case settingsTypes.ON_GATEWAY_EDIT: {
      const { dataItem } = action.payload
      const navbarOptions = state.navbarOptions.map(item => {
        if(item.code === dataItem.code) {
          return { ...item, inEdit:true }
        }
        if(item.inEdit) {
          return {
            ...state.temporaryDataItemNav,
            inEdit:false
          }
        }
        return { ...item, inEdit:false }
      })
      return {
        ...state,
        navbarOptions,
        temporaryDataItemNav:dataItem
      }
    }
    case settingsTypes.ON_GATEWAY_DISCARD: {
      const { dataItem } = action.payload
      const temporaryDataItemNav = state.temporaryDataItemNav
      const navbarOptions = state.navbarOptions.map(item => {
        if(item.code === dataItem.code) {
          return { ...temporaryDataItemNav, inEdit:false }
        }
        return item
      })
      return {
        ...state,
        navbarOptions,
        temporaryDataItemNav:{}
      }
    }
    case settingsTypes.ON_GATEWAY_SAVE: {
      const navbarOptions = state.navbarOptions.map(item => ({ ...item, inEdit:false }))
      return {
        ...state,
        navbarOptions,
        temporaryDataItemNav:{}
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