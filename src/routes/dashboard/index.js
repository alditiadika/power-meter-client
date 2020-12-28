import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import './style.css'
import Navbar from '../../components/navbar'

import { dashboardActions } from '../../redux/actions'
import GaugeChartData from './sub-components/gauge-chart'
import VoltageAVG from './sub-components/voltage-avg'
import CurrentAvg from './sub-components/current-avg'
import TotalPower from './sub-components/total-power'
import ActiveEnergyDelivered from './sub-components/energy'


const Dashboard = ({ getDataGaugeChart }) => {
  useEffect(() => {
    getDataGaugeChart()
  }, [])
  return (
    <Fragment>
      <Navbar showSettings={true} />
      <GaugeChartData/>
      <div className='dashboard-body'>
        <VoltageAVG/>
        <CurrentAvg/>

        <TotalPower/>
        <ActiveEnergyDelivered/>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s => ({ ...s.dashboardReducer })
const mapDispatchToProps = {
  getDataGaugeChart:dashboardActions.getDataGaugeChart
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
Dashboard.propTypes = {
  getDataGaugeChart:propTypes.func
}