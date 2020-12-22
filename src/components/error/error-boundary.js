import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log({ error, errorInfo })
  }
  
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Fragment>
          <h1>{'Oops, There\'s Something error, please check your console.'}</h1>
          <Button className='ml-2' 
            onClick={() => {
              window.location.href = '/'
            }} 
            color='primary'
          >
            {'Back to Home'}
          </Button>
        </Fragment>
      )
    }
  
    return this.props.children
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.any
}
export default ErrorBoundary