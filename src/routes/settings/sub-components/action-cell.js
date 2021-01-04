import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import EditIcon from '../../../assets/img/edit.png'
import Cancel from '../../../assets/img/cancel.png'
import Save from '../../../assets/img/check.png'

const EditComponent = ({ onEdit, onDiscard, onSave, inEdit }) => {
  return inEdit ? (
    <Fragment>
      <img style={{ marginRight:15, width:15, height:15 }} onClick={onDiscard} src={Cancel} />
      <img onClick={onSave} src={Save} />
    </Fragment>
  ): (
    <img src={EditIcon} onClick={onEdit} />
  )
}
export default EditComponent
EditComponent.propTypes = { 
  onEdit:propTypes.func,
  inEdit:propTypes.bool,
  onSave:propTypes.func,
  onDiscard:propTypes.func
}