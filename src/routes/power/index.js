import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import './style.css'
import Navbar from '../../components/navbar'
import { powerActions } from '../../redux/actions'

import ActivePowerChart from './sub-components/active-power-chart'
import ReactivePowerChart from './sub-components/reactive-power-chart'
import ApparentPowerChart from './sub-components/apparent-power-chart'
import PowerFactorChart from './sub-components/power-factor-chart'

const PowerComponent = ({ 
  getData, 
  active_power, 
  reactive_power, 
  apparent_power, 
  power_factor, 
  dataLoad, 
  websocket, 
  changeLineChartData,
  settings  
}) => {
  const selectedGateway = settings.navbarOptions.find(x => x.selected)
  useEffect(() => {
    getActivePower()
    getReactivePower()
    getApparentPower()
    getPowerFactor()
  }, [selectedGateway])
  useEffect(() => {
    getDataOnChangeOptions()
  }, [dataLoad.isLoad])
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
  const getActivePower = () => {
    active_power.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'active_power',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getReactivePower = () => {
    reactive_power.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'reactive_power',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getApparentPower = () => {
    apparent_power.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'apparent_power',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getPowerFactor = () => {
    power_factor.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:selectedGateway.code,
          dataType:'power_factor',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getDataOnChangeOptions = () => {
    if(dataLoad.isLoad) {
      if(dataLoad.data.code) {
        const isActivePower = dataLoad.data.id.includes('active') && !dataLoad.data.id.includes('reactive')
        const isReactivePower = dataLoad.data.id.includes('reactive')
        const isApparentPower = dataLoad.data.id.includes('apparent')
        const isPowerFactor = dataLoad.data.id.includes('power_factor')
        if(isActivePower) {
          const dataType = 'active_power'
          const subDataType = dataLoad.data.id
          getData({
            sensor:selectedGateway.code,
            dataType,
            subDataType,
            selectedOption:dataLoad.data
          })
        }
        if(isReactivePower) {
          const dataType = 'reactive_power'
          const subDataType = dataLoad.data.id
          getData({
            sensor:selectedGateway.code,
            dataType,
            subDataType,
            selectedOption:dataLoad.data
          })
        }
        if(isApparentPower) {
          const dataType = 'apparent_power'
          const subDataType = dataLoad.data.id
          getData({
            sensor:selectedGateway.code,
            dataType,
            subDataType,
            selectedOption:dataLoad.data
          })
        }
        if(isPowerFactor) {
          const dataType = 'power_factor'
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
  }
  return (
    <Fragment>
      <Navbar/>
      <div className='power-body'>
        <ActivePowerChart/>
        <ReactivePowerChart/>
        <ApparentPowerChart/>
        <PowerFactorChart/>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s => ({
  ...s.powerReducer,
  websocket:s.websocketReducer,
  settings:s.settingsReducer 
})
const mapDispatchToProps = {
  getData:powerActions.getData,
  changeLineChartData:powerActions.changeLineChartData
}
export default connect(mapStateToProps, mapDispatchToProps)(PowerComponent)
PowerComponent.propTypes = {
  getData:propTypes.func,
  active_power:propTypes.object,
  reactive_power:propTypes.object,
  apparent_power:propTypes.object,
  power_factor:propTypes.object,
  dataLoad:propTypes.object,
  changeLineChartData:propTypes.func,
  websocket:propTypes.object,
  settings:propTypes.object
}