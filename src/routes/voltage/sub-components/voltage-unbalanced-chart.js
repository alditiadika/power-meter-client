import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import propTypes from 'prop-types'

import { voltageActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const VoltageChart = ({ voltage_unbalanced, onChangeOptions }) => {
  const [localData, setLocalData] = useState([])
  useEffect(() => {
    const d = voltage_unbalanced.options.filter(x => x.selected)
      .map(item => {
        return { id:item.id, data:voltage_unbalanced[item.id].timeSeries }
      })
    setLocalData(d)
  }, [voltage_unbalanced])
  const findName = (serieId) => {
    const d = voltage_unbalanced.options.find(x => x.id === serieId)
    if(d) {
      return d.name
    }
    return ''
  }
  return (
    <Fragment>
      <div className='voltage-unbalanced-chart'>
        <Card
          height={400}
          width={'calc(100vw - 670px)'}
          style={{ marginBottom:20 }}
        >
          <Cardheader>Voltage Unbalanced</Cardheader>
          <CardBody>
            <div style={{ height:300 }}>
              <ResponsiveLine
                {...generalChartProperties}
                data={localData}
                axisLeft={{ 
                  tickRotation:-20, 
                  legend:'Voltage (%)', 
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
                          <div>Voltage Unbalanced: {point.data.yFormatted} %</div>
                        </Fragment>
                      ))}
                    </div>
                  )
                }}
              />
            </div>
          </CardBody>
        </Card>
        <div className='voltage-options'>
          <VoltageOptions optionsData={voltage_unbalanced.options} onChangeOptions={onChangeOptions} />
        </div>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s =>({
  ...s.voltageReducer
})
const mapDispatchToProps = {
  getData:voltageActions.getData,
  onChangeOptions:voltageActions.changeOptions
}
VoltageChart.propTypes = {
  getData:propTypes.func,
  onChangeOptions:propTypes.func,
  voltage_unbalanced:propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(VoltageChart)
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
const VoltageOptions = ({ onChangeOptions, optionsData }) => {
  const [options, setOptions] = useState(optionsData)
  const changeOptions = item => {
    const newItem = { ...item, selected:!item.selected }
    const newOptions = options.map(e => {
      if(e.id === newItem.id) return newItem
      return e
    })
    setOptions(newOptions)
    setTimeout(() => {
      onChangeOptions('voltage_unbalanced', newItem)
    }, 10)
  }
  return (
    <div className='voltage-options-item'>
      {options.map(item => (
        <Fragment key={Math.random()}>
          <Toggle selected={item.selected} onChange={() => changeOptions(item)} />
          <strong>{item.name}</strong>
        </Fragment>
      ))}
    </div>
  )
}
VoltageOptions.propTypes = {
  onChangeOptions:propTypes.func,
  optionsData:propTypes.array
}