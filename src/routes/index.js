import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import propTypes from 'prop-types'

import { MainRoutesComponent, dashboard } from './routes'
import Sidebar from '../components/sidebar'
import './style.css'

const MainRoutes = ({ location }) => {
  return (
    <Fragment>
      <Sidebar/>
      <div className='main-component'>
        <Switch>
          <Route path='/dashboard' component={dashboard} />
          <MainRoutesComponent location={location}/>
        </Switch>
      </div>
    </Fragment>
  )
}
export default MainRoutes
MainRoutes.propTypes = {
  location: propTypes.object
}