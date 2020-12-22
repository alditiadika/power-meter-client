import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import './style.css'
import Navbar from '../../components/navbar'
import { energyActions } from '../../redux/actions'

import ActiveEnergyChart from './sub-components/active-energy-chart'
import ReactiveEnergyChart from './sub-components/reactive-energy-chart'
import ApparentEnergy from './sub-components/apparent-energy-chart'

const EnergyComponent = ({ getData, active_energy, reactive_energy, apparent_energy, dataLoad }) => {
  useEffect(() => {
    getActiveEnergy()
    getReactiveEnergy()
    getApparentEnergy()
  }, [])
  useEffect(() => {
    getDataOnChangeOptions()
  }, [dataLoad.isLoad])
  const getActiveEnergy = () => {
    active_energy.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:'gateway_1',
          dataType:'active_energy',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getReactiveEnergy = () => {
    reactive_energy.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:'gateway_1',
          dataType:'reactive_energy',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getApparentEnergy = () => {
    apparent_energy.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:'gateway_1',
          dataType:'apparent_energy',
          subDataType:item.id,
          selectedOption:item
        })
      })
  }
  const getDataOnChangeOptions = () => {
    if(dataLoad.isLoad) {
      if(dataLoad.data.code) {
        const isActiveEnergy = dataLoad.data.id.includes('active') && !dataLoad.data.id.includes('reactive')
        const isReactiveEnergy = dataLoad.data.id.includes('reactive')
        const isApparentEnergy = dataLoad.data.id.includes('apparent')
        if(isActiveEnergy) {
          const dataType = 'active_energy'
          const subDataType = dataLoad.data.id
          getData({
            sensor:'gateway_1',
            dataType,
            subDataType,
            selectedOption:dataLoad.data
          })
        }
        if(isReactiveEnergy) {
          const dataType = 'reactive_energy'
          const subDataType = dataLoad.data.id
          getData({
            sensor:'gateway_1',
            dataType,
            subDataType,
            selectedOption:dataLoad.data
          })
        }
        if(isApparentEnergy) {
          const dataType = 'apparent_energy'
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
  }
  return (
    <Fragment>
      <Navbar/>
      <div className='energy-body'>
        <ActiveEnergyChart/>
        <ReactiveEnergyChart/>
        <ApparentEnergy/>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s => ({
  ...s.energyReducer
})
const mapDispatchToProps = {
  getData:energyActions.getData
}
export default connect(mapStateToProps, mapDispatchToProps)(EnergyComponent)
EnergyComponent.propTypes = {
  getData:propTypes.func,
  active_energy:propTypes.object,
  reactive_energy:propTypes.object,
  apparent_energy:propTypes.object,
  dataLoad:propTypes.object
}