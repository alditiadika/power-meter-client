import React, { Fragment, Component } from 'react'
import propTypes from 'prop-types'
import { HashRouter, Switch, Route } from 'react-router-dom'
import socketIO from 'socket.io-client'

import { error } from './routes/routes'
import ErrorBoundary from './components/error/error-boundary'
import MainApp from './routes'
import { connect } from 'react-redux'
import { settingsActions, websocketActions } from './redux/actions'
import { SERVICE } from './config/config.json'

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
  UNSAFE_componentWillMount() {
    this.props.initializeNavbar()
    setTimeout(() => {
      const { navbarOptions } = this.props.settings
      const selectedGateway = navbarOptions.find(x => x.selected)
      this.props.inilializeSettings(selectedGateway)
    }, 1000)
    this.socketConnector()
  }
  socketConnector = () => {
    try {
      if(this.props.ws) {
        console.log('closing old websocket', this.props.ws.close)
        this.props.ws.close()
      }
      const socket = socketIO(SERVICE.POWER_METER_SERVICE)
      socket.on('connect', () => {
        console.log('connected to websocket')
        this.props.initWS(socket)
      })
      socket.on('disconnect', () => {
        console.log('websocket disconnect.. try to reconnect')
        this.socketConnector()
      })
      socket.on('error', () => {
        console.log('websocket error.. try to reconnect')
        this.socketConnector()
      })
      socket.on('notification', data => {
        this.props.dispatchWebsocketData(data)
      })
    } catch(e) {
      console.log('catch error when connect to websocket')
      console.log(e)
    }
  }
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
const mapStateToProps = state => ({
  ...state.websocketReducer,
  settings:state.settingsReducer
})
const mapDispatchToProps = {
  inilializeSettings:settingsActions.onInitializeSettings,
  initializeNavbar:settingsActions.onInitializeNavbar,
  initWS:websocketActions.initialize,
  dispatchWebsocketData:websocketActions.dispatchData
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

RootRoute.propTypes = {
  match: propTypes.object
}
App.propTypes = {
  inilializeSettings:propTypes.func,
  initializeNavbar:propTypes.func,
  initWS:propTypes.func,
  ws:propTypes.any,
  dispatchWebsocketData:propTypes.func,
  settings:propTypes.object
}