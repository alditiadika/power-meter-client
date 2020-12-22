import React from 'react'
import propTypes from 'prop-types'
import './style.css'

const Card = ({
  width,
  height,
  dark = true,
  children,
  style = {}
}) => {
  return (
    <div style={{ width, height, ...style }} className={'custom-card-container' + (!dark ? ' light': '')}>
      {children}
    </div>
  )
}
export default  Card
Card.propTypes = {
  width:propTypes.any,
  height:propTypes.any,
  dark:propTypes.bool,
  children:propTypes.any,
  style:propTypes.object
}