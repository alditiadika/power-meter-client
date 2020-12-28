import React from 'react'
import propTypes from 'prop-types'
import { arc, } from 'd3-shape'
import './style.css'

const GaugeChart = ({ min, max, value, text }) => {
  const r = 240
  const percentScale = (value - min)/(max - min)
  const color = percentScale <= 0.7 ? '#59B724': percentScale <= 0.9 && percentScale >= 0.7 ? '#CAA226': '#CA3F26'
  const innerRadius = 0.5 * r - 30
  const outerRadius = 0.5 * r
  const angleStartRad = 60 * (Math.PI/180)
  const angleEndRad = 300 * (Math.PI/180)

  const backgroundArc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(angleStartRad)
    .endAngle(angleEndRad)()

  const angleFilledRad = angleStartRad + percentScale * (angleEndRad - angleStartRad)
  const filledArc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(angleStartRad)
    .endAngle(angleFilledRad)()

  return (
    <div style={{ width:r + 60, height:r }}>
      <svg width={r + 60} height={0.5*r + 60}>
        <g>
          <path
            className='gauge-background-arc'
            d={backgroundArc}
            fill='#555555'
            transform='translate(150, 120) rotate(180)'
          />
          <path
            className='gauge-filled-arc'
            d={filledArc}
            fill={color}
            transform='translate(150, 120) rotate(180)'
          />
        </g>
        <path
          className='gauge-needle'
          d='M152 130 L150 0 L147 130 C147 140 153 140 153 130 Z'
          transform={`rotate(${-115 + (230*percentScale)}, 150, 130)`}
          fill='#EEEEEE'
        />
      </svg>
      <div className='gauge-text'>
        <small className='gauge-text-min-max'>
          <strong>{min}</strong>
        </small>
        <strong className='gauge-text-value'>
          {text}
        </strong>
        <small className='gauge-text-min-max'>
          <strong>{max}</strong>
        </small>
      </div>
    </div>
  )
}

GaugeChart.propTypes = {
  min:propTypes.number,
  max:propTypes.number,
  value:propTypes.number,
  text:propTypes.string
}
export default GaugeChart
