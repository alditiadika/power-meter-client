import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import propTypes from 'prop-types'

import { energyActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const ReactiveEnergyChart = ({ reactive_energy, onChangeOptions }) => {
  const [localData, setLocalData] = useState([])
  useEffect(() => {
    const d = reactive_energy.options.filter(x => x.selected)
      .map(item => {
        return { id:item.id, data:reactive_energy[item.id].timeSeries }
      })
    setLocalData(d)
  }, [reactive_energy])
  const findName = (serieId) => {
    const d = reactive_energy.options.find(x => x.id === serieId)
    if(d) {
      return d.name
    }
    return ''
  }
  return (
    <Fragment>
      <div className='energy-chart'>
        <Card
          height={400}
          width={'calc(100vw - 720px)'}
          style={{ marginBottom:20 }}
        >
          <Cardheader>Reactive Energy</Cardheader>
          <CardBody>
            <div style={{ height:300 }}>
              <ResponsiveLine
                {...generalChartProperties}
                data={localData}
                axisLeft={{ 
                  tickRotation:-20, 
                  legend:'Reactive Energy (VARh)', 
                  legendPosition: 'middle',
                  legendOffset: -60, 
                }}
                axisBottom={{
                  format: '%H:%M',
                  tickRotation:-41,
                  tickValues: 'every 15 minutes',
                }}
                sliceTooltip={({ slice }) => {
                  return (
                    <div
                      style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                        color:'black',
                        borderRadius:5
                      }}
                    >
                      {slice.points.map(point => (
                        <Fragment key={point.id}>
                          <strong>{findName(point.serieId)}</strong>
                          <div>Date: {moment(point.data.xFormatted).format('DD-MM-YYYY HH:mm:ss')}</div>
                          <div>Reactive Energy: {point.data.yFormatted} VARh</div>
                        </Fragment>
                      ))}
                    </div>
                  )
                }}
              />
            </div>
          </CardBody>
        </Card>
        <div className='energy-options'>
          <ReactiveEnergyOptions optionsData={reactive_energy.options} onChangeOptions={onChangeOptions} />
        </div>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s =>({
  ...s.energyReducer
})
const mapDispatchToProps = {
  getData:energyActions.getData,
  onChangeOptions:energyActions.changeOptions
}
ReactiveEnergyChart.propTypes = {
  getData:propTypes.func,
  onChangeOptions:propTypes.func,
  reactive_energy:propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactiveEnergyChart)
const Toggle = ({ selected, onChange }) => {
  return (
    <label className='switch'>
      <input type='checkbox' checked={selected} onChange={onChange} />
      <span className='slider round'/>
    </label>
  )
}
Toggle.propTypes = {
  selected:propTypes.bool,
  onChange:propTypes.func
}
const ReactiveEnergyOptions = ({ onChangeOptions, optionsData }) => {
  const [options, setOptions] = useState(optionsData)
  const changeOptions = item => {
    const newItem = { ...item, selected:!item.selected }
    const newOptions = options.map(e => {
      if(e.id === newItem.id) return newItem
      return e
    })
    setOptions(newOptions)
    setTimeout(() => {
      onChangeOptions('reactive_energy', newItem)
    }, 10)
  }
  return (
    <div className='energy-options-item'>
      {options.map(item => (
        <Fragment key={Math.random()}>
          <Toggle selected={item.selected} onChange={() => changeOptions(item)} />
          <strong>{item.name}</strong>
        </Fragment>
      ))}
    </div>
  )
}
ReactiveEnergyOptions.propTypes = {
  onChangeOptions:propTypes.func,
  optionsData:propTypes.array
}