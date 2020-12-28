import { settingsTypes } from '../types'

const settingsActions = {
  onInitializeSettings:() => dispatch => {
    const val = localStorage.getItem('settingsDatatable')
    if(val !== null) {
      const dataTable = JSON.parse(val)
      dispatch({ type:settingsTypes.INITIALIZE_SETTINGS, payload:{ dataTable } })
    } else {
      dispatch({ type:settingsTypes.INITIALIZE_SETTINGS, payload:{ isEmpty:true } })
    }
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
  }
}
export default settingsActions