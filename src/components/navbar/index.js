import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import './style.css'
import Settings from '../../assets/img/settings-selected.png'
import { settingsActions } from '../../redux/actions'

const NavbarComponent = ({ showSettings = false, navbarOptions, onChangeGateway }) => {
  const history = useHistory()
  const changeRoute = () => {
    history.push('/')
    history.push('/settings')
  }
  const valueSelected = navbarOptions.find(x => x.selected) || { name:'' }
  return (
    <Fragment>
      <div className='custom-navbar'>
        <div className='panel-gateway'>
          {navbarOptions.map(item => (
            <div 
              key={Math.random()} 
              className={'tab-gateway' + (item.selected ? ' tab-selected': '') }
              onClick={() => onChangeGateway(item)}
            >
              <strong>
                {item.name}
              </strong>
            </div>
          ))}
        </div>
        <img hidden={!showSettings} onClick={changeRoute} src={Settings} className='settings-dashboard' />
      </div>
      <div className='selected-gateway'>
        <strong >{valueSelected.name}</strong>
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