import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import ActionCell from './sub-components/action-cell'
import EditCell from './sub-components/edit-cell'

import './style.css'
import { settingsActions } from '../../redux/actions'

const SettingsDashboard = ({ dataTable, onClickEdit, onChangeDataItem, onDiscard, onSaveDataItem }) => {
  return (
    <Fragment>
      <h2 className='settings-title'>Dashboard Settings</h2>
      <div className='table-settings'>
        <table>
          <tbody>
            <tr className='table-header'>
              <th style={{ width:100, textAlign:'center' }}>Actions</th>
              <th style={{ width:295 }}>Parameter</th>
              <th>Min. Value</th>
              <th>Max. Value</th>
            </tr>
            {dataTable.map(item => (
              <tr key={item.id}>
                <td style={{ textAlign:'center' }}>
                  <ActionCell 
                    inEdit={item.inEdit}
                    onEdit={() => onClickEdit(item)}
                    onDiscard={() => onDiscard(item)}
                    onSave={onSaveDataItem}
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  <EditCell 
                    inEdit={item.inEdit} 
                    value={item.min_value} 
                    onChangeDataItem={onChangeDataItem}
                    field='min_value' 
                    dataItem={item}
                  />
                </td>
                <td>
                  <EditCell 
                    inEdit={item.inEdit} 
                    value={item.max_value}  
                    onChangeDataItem={onChangeDataItem}
                    field='max_value' 
                    dataItem={item}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({ ...state.settingsReducer })
const mapDispatchToProps = {
  onClickEdit:settingsActions.onClickEdit,
  onDiscard:settingsActions.onDiscard,
  onChangeDataItem:settingsActions.onChangeDataItem,
  onSaveDataItem:settingsActions.onSaveDataitem
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard)
SettingsDashboard.propTypes = {
  dataTable:propTypes.array,
  onClickEdit:propTypes.func,
  onDiscard:propTypes.func,
  onDiscard:propTypes.func,
  onSaveDataItem:propTypes.func
}