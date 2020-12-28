import React from 'react'
import propTypes from 'prop-types'
import GaugeChart from '../../../components/gauge-chart'
import { connect } from 'react-redux'

const GaugeChartComponentView = ({ dataObj, data }) => {
  const {
    voltage_min,
    voltage_max,
    current_min,
    current_max,
    power_min,
    power_max,
    energy_min,
    energy_max,
    power_factor_min,
    power_factor_max
  } = dataObj
  const { voltage, current, power, energy, power_factor } = data.gaugeChartData
  return (
    <div className='gauge-chart'>
      <div className='gauge-chart-item'>
        <strong className='gauge-chart-desc'>Voltage AVG</strong>
        <GaugeChart
          min={voltage_min}
          max={voltage_max}
          value={voltage}
          text={`${voltage} V`}
        />
      </div>
      <div className='gauge-chart-item'>
        <strong className='gauge-chart-desc'>Current AVG</strong>
        <GaugeChart
          min={current_min}
          max={current_max}
          value={current}
          text={`${current} A`}
        />
      </div>
      <div className='gauge-chart-item'>
        <strong className='gauge-chart-desc'>Power Total</strong>
        <GaugeChart
          min={power_min}
          max={power_max}
          value={power}
          text={`${power} kW`}
        />
      </div>
      <div className='gauge-chart-item'>
        <strong className='gauge-chart-desc'>Energy Total</strong>
        <GaugeChart
          min={energy_min}
          max={energy_max}
          value={energy}
          text={`${energy} Wh`}
        />
      </div>
      <div className='gauge-chart-item'>
        <strong className='gauge-chart-desc'>Power Factor</strong>
        <GaugeChart
          min={power_factor_min}
          max={power_factor_max}
          value={power_factor}
          text={`${power_factor}`}
        />
      </div>
    </div>
  )
}
const mapStateToProps = state => ({ ...state.settingsReducer, ...state.dashboardReducer })
export default connect(mapStateToProps)(GaugeChartComponentView)
GaugeChartComponentView.propTypes = {
  dataObj:propTypes.object,
  data:propTypes.object
}