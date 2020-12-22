import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import './style.css'

import { currentActions } from '../../redux/actions'
import Navbar from '../../components/navbar'
import CurrentChart from './sub-components/current-chart'
import THDCurrentChart from './sub-components/thd-current-chart'

const CurrentComponent = ({ getData, current, thd_current,  dataLoad }) => {
  useEffect(() => {
    getDataOnChangeOptions()
  }, [dataLoad.isLoad])
  
  useEffect(() => {
    getCurrent()
    getTHDCurrent()
  }, [])
  const getCurrent = () => {
    current.options.filter(e => e.selected)
      .forEach(item => {
        getData({
          sensor:'gateway_1',
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
          sensor:'gateway_1',
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
      <div className='current-body'>
        <CurrentChart/>
        <THDCurrentChart/>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s => ({
  ...s.currentReducer
})
const mapDispatchToProps = {
  getData:currentActions.getData
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentComponent)
CurrentComponent.propTypes = {
  getData:propTypes.func,
  current:propTypes.object,
  thd_current:propTypes.object,
  dataLoad:propTypes.object
}