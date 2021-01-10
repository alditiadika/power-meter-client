import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import './style.css'

import { currentActions } from '../../redux/actions'
import Navbar from '../../components/navbar'
import CurrentChart from './sub-components/current-chart'
import THDCurrentChart from './sub-components/thd-current-chart'

const CurrentComponent = ({ getData, current, thd_current, dataLoad, websocket, changeLineChartData, settings }) => {
  const selectedGateway = settings.navbarOptions.find(x => x.selected)
  useEffect(() => {
    getDataOnChangeOptions()
  }, [dataLoad.isLoad])
  
  useEffect(() => {
    getCurrent()
    getTHDCurrent()
  }, [selectedGateway])
  useEffect(() => { 
    const { topicCode, message, created_date, topic, gateway } = websocket.data
    if(gateway === selectedGateway.code) {
      if(topicCode) {
        const addedData = {
          created_date,
          value:parseFloat(message),
          sensor:gateway,
          topic,
          topicCode
        }
        changeLineChartData(addedData)
      }
    }
  }, [websocket.data])
  const getCurrent = () => {
    current.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'current',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getTHDCurrent = () => {
    thd_current.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'thd_current',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getDataOnChangeOptions = () => {
    if(dataLoad.isLoad) {
      if(dataLoad.data.code) {
        const isUnbalanced = dataLoad.data.id.includes('thd')
        const dataType = isUnbalanced ? 'thd_current': 'current'
        const subDataType = dataLoad.data.id
        getData({
          sensor:selectedGateway.code,
          dataType,
          subDataType,
          selectedOption:dataLoad.data
        })
      }
    }
  }
  return (
    <Fragment>
      <Navbar/>
      <div className='current-body'>
        <CurrentChart/>
        <THDCurrentChart/>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s => ({
  ...s.currentReducer,
  websocket:s.websocketReducer,
  settings:s.settingsReducer
})
const mapDispatchToProps = {
  getData:currentActions.getData,
  changeLineChartData:currentActions.changeLineChartData
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentComponent)
CurrentComponent.propTypes = {
  getData:propTypes.func,
  current:propTypes.object,
  thd_current:propTypes.object,
  dataLoad:propTypes.object,
  changeLineChartData:propTypes.func,
  websocket:propTypes.object,
  settings:propTypes.object
}