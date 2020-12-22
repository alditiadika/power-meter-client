import React, { Fragment, Component } from 'react'
import propTypes from 'prop-types'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { error } from './routes/routes'
import ErrorBoundary from './components/error/error-boundary'
import MainApp from './routes'

const RootRoute = ({ match }) => {
  return (
    <Fragment>
      <ErrorBoundary>
        <Switch>
          <Route path='/error' component={error} />
          <Route path={`${match.url}`} component={MainApp} />
        </Switch>
      </ErrorBoundary>
    </Fragment>
  )
}
class App extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Route path='/' component={RootRoute} />
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}
export default App

RootRoute.propTypes = {
  match: propTypes.object
}
App.propTypes = {
  checkAuthentication: propTypes.func
}