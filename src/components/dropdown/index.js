import React from 'react'
import propTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const CustomDropdown = ({ data, onChange, value, label }) => {

  return (
    <div>
      <InputLabel style={{ color:'white' }} id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        style={{ width:300 }}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value.value}
        onChange={onChange}
      >
        {data.map(item => (
          <MenuItem key={Math.random()} value={item.value}>{item.name}</MenuItem>
        ))}
      </Select>
    </div>
  )
}
CustomDropdown.propTypes = {
  data:propTypes.array,
  style:propTypes.object,
  onChange:propTypes.func,
  value:propTypes.object,
  label:propTypes.string
}
export default CustomDropdown