import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import propTypes from 'prop-types'

import Spinner from '../components/spinner'

const Loading = () => <Spinner loading={true} />

const error = Loadable({
  loader: () => import('../components/error/404'),
  loading: Loading,
})
const dashboard = Loadable({
  loader: () => import('./dashboard'),
  loading: Loading,
})

const current = Loadable({
  loader: () => import('./current'),
  loading: Loading,
})

const voltage = Loadable({
  loader: () => import('./voltage'),
  loading: Loading,
})

const power = Loadable({
  loader: () => import('./power'),
  loading: Loading,
})

const energy = Loadable({
  loader: () => import('./energy'),
  loading: Loading,
})

const MainRoutesComponent = ({ location }) => {
  if (location.pathname === '/') return <Redirect to='/dashboard' />

  return (
    <Switch>
      <Route path='/dashboard' component={dashboard} />
      <Route path='/current' component={current} />
      <Route path='/voltage' component={voltage} />
      <Route path='/power' component={power} />
      <Route path='/energy' component={energy} />
      <Redirect to='/error' />
    </Switch>
  )
}

export { error, dashboard, MainRoutesComponent }
MainRoutesComponent.propTypes = {
  location: propTypes.object
}
