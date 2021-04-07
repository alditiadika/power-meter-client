import axios from 'axios'
import { SERVICE } from '../../config/config.json'
import { settingsTypes } from '../types'

const settingsActions = {
  onInitializeSettings:(selectedGateway) => async dispatch => {
    const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}/extreme-value`)
    if(data.status === 200) {
      const dataTable = data.message.map(item => {
        return { ...item, inEdit:false }
      }).sort((a, b) => a.id < b.id ? -1: 1)
      dispatch({ type:settingsTypes.INITIALIZE_SETTINGS, payload:{ dataTable, selectedGateway } })
    } else dispatch({ type:settingsTypes.INITIALIZE_SETTINGS, payload:{ isEmpty:true } })
  },
  onInitializeNavbar: () => async dispatch => {
    const { data } = await axios.get(`${SERVICE.POWER_METER_SERVICE}/gateway-config`)
    if(data.status === 200) {
      const navbarOptions = data.message.map(item => {
        return { ...item, selected:item.id === 1, inEdit:false }
      }).sort((a, b) => a.id < b.id ? -1: 1)
      dispatch({ type:settingsTypes.INITIALIZE_NAVBAR, payload:{ navbarOptions } })
    } else dispatch({ type:settingsTypes.INITIALIZE_NAVBAR, payload:{ isEmpty:true } })
  },
  onChangeGateway:value => dispatch => {
    dispatch({ type:settingsTypes.CHANGE_GATEWAY, payload:{ value } })
  },
  onClickEdit: dataItem => dispatch => {
    const payload = { dataItem }
    dispatch({ type:settingsTypes.ONCLICK_EDIT, payload })
  },
  onDiscard:dataItem => dispatch => {
    dispatch({ type:settingsTypes.ON_DISCARD, payload:{ dataItem } })
  },
  onChangeDataItem:({ field, dataItem, value }) => dispatch => {
    const payload = { field, dataItem, value }
    dispatch({ type:settingsTypes.ONCHANGE_DATAITEM, payload })
  },
  onSaveDataitem: dataItem => async dispatch => {
    try {
      const { id, min_value, max_value } = dataItem
      const data = { id, min_value, max_value }
      await axios.post(`${SERVICE.POWER_METER_SERVICE}/extreme-value`, data)
      dispatch({ type:settingsTypes.ON_SAVE })
    } catch(e) {
      console.log(e)
      dispatch({ type:settingsTypes.ON_DISCARD, payload:{ dataItem:dataItem } })
    }
  },

  onClickEditGateway: dataItem => dispatch => {
    const payload = { dataItem }
    dispatch({ type:settingsTypes.ON_GATEWAY_EDIT, payload })
  },
  onDiscardGateway:dataItem => dispatch => {
    dispatch({ type:settingsTypes.ON_GATEWAY_DISCARD, payload:{ dataItem } })
  },
  onChangeDataItemGateway:({ field, dataItem, value }) => dispatch => {
    const payload = { field, dataItem, value }
    dispatch({ type:settingsTypes.ON_CHANGE_GATEWAY_NAME, payload })
  },
  onSaveDataitemGateway: selectedGateway => async dispatch => {
    try {
      const data = { gateway_name:selectedGateway.name, gateway_id:selectedGateway.id }
      await axios.post(`${SERVICE.POWER_METER_SERVICE}/gateway-config`, data)
      dispatch({ type:settingsTypes.ON_GATEWAY_SAVE })
    } catch(e) {
      console.log(e)
      dispatch({ type:settingsTypes.ON_GATEWAY_DISCARD, payload:{ dataItem:selectedGateway } })
    }
  }
}
export default settingsActions