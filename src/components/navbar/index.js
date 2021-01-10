import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import './style.css'
import CustomDropdown from '../dropdown'
import Settings from '../../assets/img/settings-selected.png'
import { settingsActions } from '../../redux/actions'

const NavbarComponent = ({ showSettings = false, navbarOptions, onChangeGateway }) => {
  const history = useHistory()
  const changeRoute = () => {
    history.push('/')
    history.push('/settings')
  }
  const valueSelected = navbarOptions.find(x => x.selected)
  const onChange = e => {
    const { value } = e.target
    onChangeGateway(value)
  }
  return (
    <Fragment>
      <div className='custom-navbar' style={{ padding:20 }}>
        <CustomDropdown
          label='Panel'
          value={valueSelected}
          data={navbarOptions}
          onChange={onChange}
        />
        <img hidden={!showSettings} onClick={changeRoute} src={Settings} className='settings-dashboard' />
      </div>
    </Fragment>
  )
}
const mapStateToProps = state => ({
  ...state.settingsReducer
})
const mapDispatchToProps = {
  onChangeGateway: settingsActions.onChangeGateway
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)
NavbarComponent.propTypes = {
  showSettings:propTypes.bool,
  navbarOptions:propTypes.array,
  onChangeGateway:propTypes.func
}