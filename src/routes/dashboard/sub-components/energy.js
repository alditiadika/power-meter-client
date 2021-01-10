import React, { Fragment, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'

import { dashboardActions } from '../../../redux/actions'
import { Card, CardBody, Cardheader } from '../../../components/card'
import { useHistory } from 'react-router-dom'
import { generalChartProperties } from '../../../utils/general-chart-properties'

const TotalEnergyDelivered = ({ getData, data, settings }) => {
  const selectedGateway = settings.navbarOptions.find(x => x.selected)
  const history = useHistory()
  const [localData, setLocalData] = useState([])
  useEffect(() => {
    getData(selectedGateway.code)
  }, [selectedGateway])
  useEffect(() => {
    setLocalData([{ id:'A', data:data.energy.timeSeries }])
  }, [data.energy.timeSeries])
  return (
    <Fragment>
      <Card
        height={400}
        width={'calc(50vw - 250px)'}
        style={{ marginBottom:20 }}
      >
        <Cardheader onClick={() => history.push('/energy')} style={{ cursor:'pointer' }}>Energy Delivered</Cardheader>
        <CardBody>
          <div style={{ height:300 }}>
            <ResponsiveLine
              {...generalChartProperties}
              data={localData}
              axisLeft={{ 
                tickRotation:-20, 
                legend:'energy (Wh)', 
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
                        <div>Energy: {point.data.yFormatted} Wh</div>
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
  ...s.dashboardReducer,
  settings:s.settingsReducer
})
const mapDispatchToProps = {
  getData:dashboardActions.getDataEnergy
}
export default connect(mapStateToProps, mapDispatchToProps)(TotalEnergyDelivered)
TotalEnergyDelivered.propTypes = {
  getData:propTypes.func,
  data:propTypes.object,
  settings:propTypes.object
}