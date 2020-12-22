import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { voltageActions } from '../../redux/actions'
import Navbar from '../../components/navbar'
import './style.css'
import VoltageChart from './sub-components/voltage-chart'
import VoltageUnbalancedChart from './sub-components/voltage-unbalanced-chart'

const Voltage = ({ getData, voltage, voltage_unbalanced,  dataLoad }) => {
  useEffect(() => {
    getDataOnChangeOptions()
  }, [dataLoad.isLoad])
  
  useEffect(() => {
    getVoltage()
    getUnbalanceedVoltage()
  }, [])
  const getVoltage = () => {
    voltage.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:'gateway_1',
          dataType:'voltage',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getUnbalanceedVoltage = () => {
    voltage_unbalanced.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:'gateway_1',
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
          sensor:'gateway_1',
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
  ...s.voltageReducer
})
const mapDispatchToProps = {
  getData:voltageActions.getData
}
export default connect(mapStateToProps, mapDispatchToProps)(Voltage)
Voltage.propTypes = {
  getData:propTypes.func,
  voltage:propTypes.object,
  voltage_unbalanced:propTypes.object,
  dataLoad:propTypes.object
}