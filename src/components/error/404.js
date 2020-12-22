import React, { useState, Fragment } from 'react'
import './style.css'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const index = () => {
  const [isClick, setClick] = useState(false)
  return isClick ? <Redirect to='/' /> :  (
    <Fragment>
      <h1 className='h1-404'>
      404<br/>
      Page Not Found<br/>
        <Button 
          onClick={() => setClick(true)}
          style={{ cursor:'pointer' }} 
          color='primary'
        >
          Go Back
        </Button>
      </h1>
      <div className='frame'/>

    </Fragment>

      
  )
}
export default index
