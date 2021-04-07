import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import ActionCell from './sub-components/action-cell'
import EditCell from './sub-components/edit-cell'
import Navbar from '../../components/navbar'

import './style.css'
import { settingsActions } from '../../redux/actions'

const SettingsDashboard = ({ 
  dataTable, 
  onClickEdit, 
  onChangeDataItem, 
  onDiscard, 
  onSaveDataItem, 
  navbarOptions,
  onClickEditGateway,
  onDiscardGateway,
  onSaveDataitemGateway,
  onChangeDataItemGateway 
}) => {
  const selectedGateway = navbarOptions.find(x => x.selected)
  const tableRendered = dataTable.filter(x => x.gateway === selectedGateway.code)
  return (
    <Fragment>
      <h2 className='settings-title'>Dashboard Settings</h2>
      <Navbar/>
      <div className='navbar-settings'>
        <div className={'navbar-settings-item ' + (selectedGateway.inEdit ? 'inedit': '')}>
          <strong>Name :</strong>
          <EditCell
            className='navbar-settings-edit-name'
            inEdit={selectedGateway.inEdit} 
            value={selectedGateway.name} 
            onChangeDataItem={onChangeDataItemGateway}
            field='name' 
            dataItem={selectedGateway}
            type='string'
          />
          <ActionCell 
            inEdit={selectedGateway.inEdit}
            onEdit={() => onClickEditGateway(selectedGateway)}
            onDiscard={() => onDiscardGateway(selectedGateway)}
            onSave={() => onSaveDataitemGateway(selectedGateway)}
          />
        </div>
      </div>
      <div className='table-settings'>
        <table>
          <tbody>
            <tr className='table-header'>
              <th style={{ width:100, textAlign:'center' }}>Actions</th>
              <th style={{ width:295 }}>Parameter</th>
              <th>Min. Value</th>
              <th>Max. Value</th>
            </tr>
            {tableRendered.map(item => (
              <tr key={item.id}>
                <td style={{ textAlign:'center' }}>
                  <ActionCell 
                    inEdit={item.inEdit}
                    onEdit={() => onClickEdit(item)}
                    onDiscard={() => onDiscard(item)}
                    onSave={() => onSaveDataItem(item)}
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
  onSaveDataItem:settingsActions.onSaveDataitem,

  onClickEditGateway:settingsActions.onClickEditGateway,
  onDiscardGateway:settingsActions.onDiscardGateway,
  onChangeDataItemGateway:settingsActions.onChangeDataItemGateway,
  onSaveDataitemGateway:settingsActions.onSaveDataitemGateway
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard)
SettingsDashboard.propTypes = {
  dataTable:propTypes.array,
  onClickEdit:propTypes.func,
  onDiscard:propTypes.func,
  onChangeDataItem:propTypes.func,
  onSaveDataItem:propTypes.func,
  navbarOptions:propTypes.array,
  onClickEditGateway:propTypes.func,
  onDiscardGateway:propTypes.func,
  onChangeDataItemGateway:propTypes.func,
  onSaveDataitemGateway:propTypes.func
}