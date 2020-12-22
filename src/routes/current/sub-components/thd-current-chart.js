import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import propTypes from 'prop-types'

import { currentActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const THDCurrentChart = ({ thd_current, onChangeOptions }) => {
  const [localData, setLocalData] = useState([])
  useEffect(() => {
    const d = thd_current.options.filter(x => x.selected)
      .map(item => {
        return { id:item.id, data:thd_current[item.id].timeSeries }
      })
    setLocalData(d)
  }, [thd_current])
  const findName = (serieId) => {
    const d = thd_current.options.find(x => x.id === serieId)
    if(d) {
      return d.name
    }
    return ''
  }
  return (
    <Fragment>
      <div className='thd-current-chart'>
        <Card
          height={400}
          width={'calc(100vw - 600px)'}
          style={{ marginBottom:20 }}
        >
          <Cardheader>THD Current</Cardheader>
          <CardBody>
            <div style={{ height:300 }}>
              <ResponsiveLine
                {...generalChartProperties}
                data={localData}
                axisLeft={{ 
                  tickRotation:-20, 
                  legend:'THD Current (%)', 
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
                          <div>THD Current: {point.data.yFormatted} %</div>
                        </Fragment>
                      ))}
                    </div>
                  )
                }}
              />
            </div>
          </CardBody>
        </Card>
        <div className='current-options'>
          <THDCurrent onChangeOptions={onChangeOptions} />
        </div>
      </div>
    </Fragment>
  )
}
const mapStateToProps = s =>({
  ...s.currentReducer
})
const mapDispatchToProps = {
  getData:currentActions.getData,
  onChangeOptions:currentActions.changeOptions
}
THDCurrentChart.propTypes = {
  getData:propTypes.func,
  onChangeOptions:propTypes.func,
  thd_current:propTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(THDCurrentChart)
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
const THDCurrent = ({ onChangeOptions }) => {
  const [options, setOptions] = useState([
    { id:'thd_current_a', name:'THD Current A', code:'THDCurrentA', selected:true },
    { id:'thd_current_b', name:'THD Current B', code:'THDCurrentB', selected:false },
    { id:'thd_current_c', name:'THD Current C', code:'THDCurrentC', selected:false },
    { id:'thd_current_n', name:'THD Current N', code:'THDCurrentN', selected:false },
    { id:'thd_current_g', name:'THD Current G', code:'THDCurrentG', selected:false }
  ])
  const changeOptions = item => {
    const newItem = { ...item, selected:!item.selected }
    const newOptions = options.map(e => {
      if(e.id === newItem.id) return newItem
      return e
    })
    setOptions(newOptions)
    setTimeout(() => {
      onChangeOptions('thd_current', newItem)
    }, 10)
  }
  return (
    <div className='current-options-item'>
      {options.map(item => (
        <Fragment key={Math.random()}>
          <Toggle selected={item.selected} onChange={() => changeOptions(item)} />
          <strong>{item.name}</strong>
        </Fragment>
      ))}
    </div>
  )
}
THDCurrent.propTypes = {
  onChangeOptions:propTypes.func
}