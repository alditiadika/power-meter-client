import React from 'react'
import propTypes from 'prop-types'

const Spinner = ({ loading }) => {
  return (
    <div hidden={!loading} className='k-loading-mask'>
      <span className='k-loading-text'>Loading</span>
      <div className='k-loading-image' />
      <div className='k-loading-color' />
    </div>
  )
}
export default Spinner
Spinner.propTypes = {
  loading:propTypes.bool
}
Spinner.defaultProps = {
  loading:true
}