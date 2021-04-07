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


const Dashboard = ({ 
  getDataGaugeChart, 
  websocket, 
  changeGaugeData, 
  changeLineChartData, 
  settings,
  getDataCurrent,
  getDataEnergy,
  getDataPower,
  getDataVoltage 
}) => {
  const selectedGateway = settings.navbarOptions.find(x => x.selected)
  useEffect(() => {
    getDataGaugeChart(selectedGateway.code)
    getDataCurrent(selectedGateway.code)
    getDataEnergy(selectedGateway.code)
    getDataPower(selectedGateway.code)
    getDataVoltage(selectedGateway.code)
  }, [selectedGateway])
  useEffect(() => {
    if(websocket.data.topicCode) {
      const { message, gateway, topic, created_date } = websocket.data
      const data = {
        created_date,
        value:parseFloat(message),
        sensor:gateway,
        topic
      }
      if(gateway === selectedGateway.code) {
        switch(websocket.data.topicCode) {
          case 'Voltage_LN_Avg': {
            changeGaugeData('voltage', parseFloat(message))
            changeLineChartData('voltage', data)
            break
          }
          case 'Current_Avg': {
            changeGaugeData('current', parseFloat(message))
            changeLineChartData('current', data)
            break
          }
          case 'Active_Power_Total': {
            changeGaugeData('power', parseFloat(message))
            changeLineChartData('power', data)
            break
          }
          case 'Power_Factor_Total': {
            changeGaugeData('power_factor', parseFloat(message))
            break
          }
          case 'ActiveEnergyDelivered': {
            changeGaugeData('energy', parseFloat(message))
            changeLineChartData('energy', data)
            break
          }
          default:
            break
        }
      }
    }
  }, [websocket.data])
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
const mapStateToProps = s => ({ 
  ...s.dashboardReducer, 
  websocket:s.websocketReducer ,
  settings:s.settingsReducer
})
const mapDispatchToProps = {
  getDataGaugeChart:dashboardActions.getDataGaugeChart,
  changeGaugeData:dashboardActions.changeGaugeData,
  changeLineChartData:dashboardActions.changeLineChartData,
  getDataCurrent:dashboardActions.getDataCurrent,
  getDataEnergy:dashboardActions.getDataEnergy,
  getDataPower:dashboardActions.getDataPower,
  getDataVoltage:dashboardActions.getDataVoltage
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
Dashboard.propTypes = {
  getDataGaugeChart:propTypes.func,
  changeGaugeData:propTypes.func,
  websocket:propTypes.object,
  changeLineChartData:propTypes.func,
  settings:propTypes.object,
  getDataCurrent:propTypes.func,
  getDataEnergy:propTypes.func,
  getDataPower:propTypes.func,
  getDataVoltage:propTypes.func
}