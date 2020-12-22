import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import propTypes from 'prop-types'

import { powerActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const ApparentPowerChart = ({ apparent_power, onChangeOptions }) => {
  const [localData, setLocalData] = useState([])
  useEffect(() => {
    const d = apparent_power.options.filter(x => x.selected)
      .map(item => {
        return { id:item.id, data:apparent_power[item.id].timeSeries }
      })
    setLocalData(d)
  }, [apparent_power])
  const findName = (serieId) => {
    const d = apparent_power.options.find(x => x.id === serieId)
    if(d) {
      return d.name
    }
    return ''
  }
  return (
    <Fragment>
      <div className='apparent-power-chart'>
        <Card
          height={400}
          width={'calc(100vw - 600px)'}
          style={{ marginBottom:20 }}
        >
          <Cardheader>Apparent Power</Cardheader>
          <CardBody>
            <div style={{ height:300 }}>
              <ResponsiveLine
                {...generalChartProperties}
                data={localData}
                axisLeft={{ 
                  tickRotation:-20, 
                  legend:'Apparent Power (kVA)', 
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
                          <div>Apparent Power: {point.data.yFormatted} kVA</div>
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
          <ApparentPowerOptions onChangeOptions={onChangeOptions} />
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
ApparentPowerChart.propTypes = {
  getData:propTypes.func,
  onChangeOptions:propTypes.func,
  apparent_power:propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(ApparentPowerChart)
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
const ApparentPowerOptions = ({ onChangeOptions }) => {
  const [options, setOptions] = useState([
    { id:'apparent_power_a', name:'Apparent Power A', code:'Apparent_Power_A', selected:true },
    { id:'apparent_power_b', name:'Apparent Power B', code:'Apparent_Power_B', selected:false },
    { id:'apparent_power_c', name:'Apparent Power C', code:'Apparent_Power_C', selected:false },
    { id:'apparent_power_total', name:'Apparent Power Total', code:'Apparent_Power_Total', selected:false }
  ])
  const changeOptions = item => {
    const newItem = { ...item, selected:!item.selected }
    const newOptions = options.map(e => {
      if(e.id === newItem.id) return newItem
      return e
    })
    setOptions(newOptions)
    setTimeout(() => {
      onChangeOptions('apparent_power', newItem)
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
ApparentPowerOptions.propTypes = {
  onChangeOptions:propTypes.func,
}