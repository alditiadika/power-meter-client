import React from 'react'
import propTypes from 'prop-types'

const EditCell = ({ inEdit, value, onChangeDataItem, dataItem, field }) => {
  const onChange = e => {
    const numVal = parseFloat(e.target.value)
    const val = isNaN(numVal) ? 0: numVal
    onChangeDataItem({ field, value:val, dataItem })
  }
  return !inEdit ? value: (
    <input type='number' value={value} onChange={onChange} />
  )
}
export default EditCell
EditCell.propTypes = {
  inEdit:propTypes.bool,
  onChangeDataItem:propTypes.func,
  value:propTypes.any,
  field:propTypes.string,
  dataItem:propTypes.object
}