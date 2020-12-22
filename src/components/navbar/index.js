import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import './style.css'
import CustomDropdown from '../dropdown'

const NavbarComponent = () => {
  return (
    <Fragment>
      <div style={{ padding:20 }}>
        <CustomDropdown
          label='Gateway'
          value={{ value:'gateway_1', name:'Gateway 1' }}
          data={[{ name:'Gateway 1', value:'gateway_1' }]}
          onChange={() => {}}
        />
      </div>
    </Fragment>
  )
}
export default NavbarComponent
NavbarComponent.propTypes = {
  logout:propTypes.func,
  colapsed:propTypes.bool,
  setLanguage:propTypes.func,
  lang:propTypes.any
}