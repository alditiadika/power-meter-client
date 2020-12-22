import React from 'react'
import propTypes from 'prop-types'
import './style.css'

const Card = ({ children, style }) => {
  return (
    <div style={style} className='custom-card-body'>
      {children}
    </div>
  )
}
export default  Card
Card.propTypes = {
  children:propTypes.any,
  style:propTypes.object
}