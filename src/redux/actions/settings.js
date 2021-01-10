import { settingsTypes } from '../types'

const settingsActions = {
  onInitializeSettings:(selectedGateway) => dispatch => {
    const val = localStorage.getItem('settingsDatatable')
    if(val !== null) {
      const dataTable = JSON.parse(val)
      dispatch({ type:settingsTypes.INITIALIZE_SETTINGS, payload:{ dataTable, selectedGateway } })
    } else {
      dispatch({ type:settingsTypes.INITIALIZE_SETTINGS, payload:{ isEmpty:true } })
    }
  },
  onInitializeNavbar:() => dispatch => {
    const val = localStorage.getItem('navbarOptions')
    if(val !== null) {
      const navbarOptions = JSON.parse(val)
      dispatch({ type:settingsTypes.INITIALIZE_NAVBAR, payload:{ navbarOptions } })
    } else {
      dispatch({ type:settingsTypes.INITIALIZE_NAVBAR, payload:{ isEmpty:true } })
    }
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
  onSaveDataitem:() => dispatch => {
    dispatch({ type:settingsTypes.ON_SAVE })
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
  onSaveDataitemGateway:() => dispatch => {
    dispatch({ type:settingsTypes.ON_GATEWAY_SAVE })
  }
}
export default settingsActions