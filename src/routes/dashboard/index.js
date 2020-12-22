import React, { Fragment } from 'react'
import './style.css'
import Navbar from '../../components/navbar'

import VoltageAVG from './sub-components/voltage-avg'
import CurrentAvg from './sub-components/current-avg'
import TotalPower from './sub-components/total-power'
import ActiveEnergyDelivered from './sub-components/energy'
const Dashboard = () => {
  return (
    <Fragment>
      <Navbar/>
      <div className='dashboard-body'>
        <VoltageAVG/>
        <CurrentAvg/>

        <TotalPower/>
        <ActiveEnergyDelivered/>
      </div>
    </Fragment>
  )
}
export default Dashboard