import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import config from './config/config.json'
import store from './redux/store'
import App from './app'
import serviceWorker from './sw'
import './assets/css/all.css'

const Root = () => {
  return (
    <Provider store={store(config.App.DEVELOPMENT)}>
      <App />
    </Provider>
  )
}
const element = document.getElementById('root')
render(<Root />, element)
serviceWorker()
