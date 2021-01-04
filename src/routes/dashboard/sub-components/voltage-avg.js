import React, { Fragment, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import { useHistory } from 'react-router-dom'

import { dashboardActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const VoltageAVG = ({ getData, data }) => {
  const [localData, setLocalData] = useState([])
  const history = useHistory()
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setLocalData([{ id:'A', data:data.voltage.timeSeries }])
  }, [data.voltage.timeSeries])
  return (
    <Fragment>
      <Card
        height={400}
        width={'calc(50vw - 250px)'}
        style={{ marginBottom:20 }}
      >
        <Cardheader onClick={() => history.push('/voltage')} style={{ cursor:'pointer' }}>Voltage AVG</Cardheader>
        <CardBody>
          <div style={{ height:300 }}>
            <ResponsiveLine
              {...generalChartProperties}
              data={localData}
              axisLeft={{ 
                tickRotation:-20, 
                legend:'Voltage (V)', 
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
                        <div>Date: {moment(point.data.xFormatted).format('DD-MM-YYYY HH:mm:ss')}</div>
                        <div>Voltage: {point.data.yFormatted} V</div>
                      </Fragment>
                    ))}
                  </div>
                )
              }}
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}
const mapStateToProps = s =>({
  ...s.dashboardReducer
})
const mapDispatchToProps = {
  getData:dashboardActions.getDataVoltage
}
export default connect(mapStateToProps, mapDispatchToProps)(VoltageAVG)
VoltageAVG.propTypes = {
  getData:propTypes.func,
  data:propTypes.object
}