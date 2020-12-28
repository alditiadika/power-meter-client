import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import propTypes from 'prop-types'
import './style.css'
import CustomDropdown from '../dropdown'
import Settings from '../../assets/img/settings-selected.png'

const NavbarComponent = ({ showSettings = false }) => {
  const history = useHistory()
  const changeRoute = () => {
    history.push('/')
    history.push('/settings')
  }
  return (
    <Fragment>
      <div className='custom-navbar' style={{ padding:20 }}>
        <CustomDropdown
          label='Panel'
          value={{ value:'gateway_1', name:'Gateway 1' }}
          data={[{ name:'Gateway 1', value:'gateway_1' }]}
          onChange={() => {}}
        />
        <img hidden={!showSettings} onClick={changeRoute} src={Settings} className='settings-dashboard' />
      </div>
    </Fragment>
  )
}
export default NavbarComponent
NavbarComponent.propTypes = {
  showSettings:propTypes.bool
}