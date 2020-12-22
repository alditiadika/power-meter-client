import React from 'react'
import { useHistory, useLocation } from 'react-router'
import './style.css'

import SidebarContent from './sidebar-content'
import DashboardIcon from '../../assets/img/dashboard.png'
import DashboardSelectedIcon from '../../assets/img/dashboard-selected.png'
import VoltageIcon from '../../assets/img/voltage.png'
import VoltageSelectedIcon from '../../assets/img/voltage-selected.png'
import CurrentIcon from '../../assets/img/current.png'
import CurrentSelectedIcon from '../../assets/img/current-selected.png'
import PowerIcon from '../../assets/img/power.png'
import PowerSelectedIcon from '../../assets/img/power-selected.png'
import EnergyIcon from '../../assets/img/energy.png'
import EnergySelectedIcon from '../../assets/img/energy-selected.png'

const Sidebar = () => {
  const history = useHistory()
  const location = useLocation()
  const changeRoute = path => {
    history.push(path)
  }
  const selectedContent = (path) => {
    const reg = new RegExp(path)
    const isSelected = reg.test(location.pathname)
    return isSelected
  }
  return (
    <div className='sidebar-container'>
      <h1 className='sidebar-title'>Power Meter</h1>
      <div className='sidebar-content'>
        <SidebarContent 
          icon={selectedContent('/dashboard') ? DashboardSelectedIcon :DashboardIcon}
          onClick={changeRoute}
          path={'/'}
          selected={selectedContent('/dashboard')}
          title='Dashboard'
        />
        <SidebarContent 
          icon={selectedContent('/voltage') ? VoltageSelectedIcon :VoltageIcon}
          onClick={changeRoute}
          path={'/voltage'}
          selected={selectedContent('/voltage')}
          title='Voltage'
        />
        <SidebarContent 
          icon={selectedContent('/current') ? CurrentSelectedIcon :CurrentIcon}
          onClick={changeRoute}
          path={'/current'}
          selected={selectedContent('/current')}
          title='Current'
        />
        <SidebarContent 
          icon={selectedContent('/power') ? PowerSelectedIcon :PowerIcon}
          onClick={changeRoute}
          path={'/power'}
          selected={selectedContent('/power')}
          title='Power'
        />
        <SidebarContent 
          icon={selectedContent('/energy') ? EnergySelectedIcon :EnergyIcon}
          onClick={changeRoute}
          path={'/energy'}
          selected={selectedContent('/energy')}
          title='Energy'
        />
      </div>
    </div>
  )
}
export default Sidebar