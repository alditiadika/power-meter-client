import React from 'react'
import propTypes from 'prop-types'

const EditCell = ({ inEdit, value, onChangeDataItem, dataItem, field, type='number', className='' }) => {
  const onChange = e => {
    if(type === 'number') {
      const numVal = parseFloat(e.target.value)
      const val = isNaN(numVal) ? 0: numVal
      onChangeDataItem({ field, value:val, dataItem })
    } else {
      onChangeDataItem({ field, value:e.target.value, dataItem })
    }
  }
  return !inEdit ? value: (
    <input type={type} value={value} onChange={onChange} className={className} />
  )
}
export default EditCell
EditCell.propTypes = {
  inEdit:propTypes.bool,
  onChangeDataItem:propTypes.func,
  value:propTypes.any,
  field:propTypes.string,
  dataItem:propTypes.object,
  type:propTypes.string,
  className:propTypes.string
}