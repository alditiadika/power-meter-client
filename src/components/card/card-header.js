import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import './style.css'

const Card = ({ children, style, onClick = () => {} }) => {
  return (
    <Fragment>
      <div onClick={onClick} style={style} className='custom-card-title'>
        <strong>{children}</strong>
      </div>
      <hr className='custom-card-hr'/>
    </Fragment>
  )
}
export default  Card
Card.propTypes = {
  children:propTypes.any,
  style:propTypes.object,
  onClick:propTypes.func
}