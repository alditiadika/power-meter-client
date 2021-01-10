import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { voltageActions } from '../../redux/actions'
import Navbar from '../../components/navbar'
import './style.css'
import VoltageChart from './sub-components/voltage-chart'
import VoltageUnbalancedChart from './sub-components/voltage-unbalanced-chart'

const Voltage = ({ getData, voltage, voltage_unbalanced,  dataLoad, websocket, changeLineChartData, settings }) => {
  const selectedGateway = settings.navbarOptions.find(x => x.selected)
  useEffect(() => {
    getDataOnChangeOptions()
  }, [dataLoad.isLoad])
  
  useEffect(() => {
    getVoltage()
    getUnbalancedVoltage()
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
  const getVoltage = () => {
    voltage.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'voltage',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getUnbalancedVoltage = () => {
    voltage_unbalanced.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'voltage_unbalanced',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getDataOnChangeOptions = () => {
    if(dataLoad.isLoad) {
      if(dataLoad.data.code) {
        const isUnbalanced = dataLoad.data.id.includes('unbalanced')
        const dataType = isUnbalanced ? 'voltage_unbalanced': 'voltage'
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
      <div className='voltage_body'>
        <VoltageChart/>
        <VoltageUnbalancedChart/>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s => ({
  ...s.voltageReducer,
  websocket:s.websocketReducer,
  settings:s.settingsReducer 
})
const mapDispatchToProps = {
  getData:voltageActions.getData,
  changeLineChartData:voltageActions.changeLineChartData
}
export default connect(mapStateToProps, mapDispatchToProps)(Voltage)
Voltage.propTypes = {
  getData:propTypes.func,
  voltage:propTypes.object,
  voltage_unbalanced:propTypes.object,
  dataLoad:propTypes.object,
  websocket:propTypes.object,
  changeLineChartData:propTypes.func,
  settings:propTypes.object
}