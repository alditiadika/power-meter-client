import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import propTypes from 'prop-types'

import { powerActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const PowerFactorChart = ({ power_factor, onChangeOptions }) => {
  const [localData, setLocalData] = useState([])
  useEffect(() => {
    const d = power_factor.options.filter(x => x.selected)
      .map(item => {
        return { id:item.id, data:power_factor[item.id].timeSeries }
      })
    setLocalData(d)
  }, [power_factor])
  const findName = (serieId) => {
    const d = power_factor.options.find(x => x.id === serieId)
    if(d) {
      return d.name
    }
    return ''
  }
  return (
    <Fragment>
      <div className='power-factor-chart'>
        <Card
          height={400}
          width={'calc(100vw - 690px)'}
          style={{ marginBottom:20 }}
        >
          <Cardheader>Power Factor</Cardheader>
          <CardBody>
            <div style={{ height:300 }}>
              <ResponsiveLine
                {...generalChartProperties}
                data={localData}
                axisLeft={{ 
                  tickRotation:-20, 
                  legend:'Power Factor', 
                  legendPosition: 'middle',
                  legendOffset: -60, 
                }}
                axisBottom={{
                  format: '%H:%M',
                  tickRotation:-41,
                  tickValues: 'every 60 minutes',
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
                          <div>Power Factor: {point.data.yFormatted}</div>
                        </Fragment>
                      ))}
                    </div>
                  )
                }}
              />
            </div>
          </CardBody>
        </Card>
        <div className='power-options'>
          <PowerFactorOptions optionsData={power_factor.options} onChangeOptions={onChangeOptions} />
        </div>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s =>({
  ...s.powerReducer
})
const mapDispatchToProps = {
  getData:powerActions.getData,
  onChangeOptions:powerActions.changeOptions
}
PowerFactorChart.propTypes = {
  getData:propTypes.func,
  onChangeOptions:propTypes.func,
  power_factor:propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(PowerFactorChart)
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
const PowerFactorOptions = ({ onChangeOptions, optionsData }) => {
  const [options, setOptions] = useState(optionsData)
  const changeOptions = item => {
    const newItem = { ...item, selected:!item.selected }
    const newOptions = options.map(e => {
      if(e.id === newItem.id) return newItem
      return e
    })
    setOptions(newOptions)
    setTimeout(() => {
      onChangeOptions('power_factor', newItem)
    }, 10)
  }
  return (
    <div className='power-options-item'>
      {options.map(item => (
        <Fragment key={Math.random()}>
          <Toggle selected={item.selected} onChange={() => changeOptions(item)} />
          <strong>{item.name}</strong>
        </Fragment>
      ))}
    </div>
  )
}
PowerFactorOptions.propTypes = {
  onChangeOptions:propTypes.func,
  optionsData:propTypes.array
}