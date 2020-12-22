import React from 'react'
import propTypes from 'prop-types'

const SidebarContent = ({ onClick, path, title, icon, selected }) => {
  return (
    <div 
      className={'sidebar-item' + (selected ? ' selected': '')}
      onClick={() => onClick(path)}
    >
      <img className='sideber-icon' src={icon}/>
      <h3 className='sidebar-item-name'>{title}</h3>
      {selected && (
        <div className='sidebar-selected-sign'/>
      )}
    </div>
  )
}
export default SidebarContent
SidebarContent.propTypes = {
  onClick:propTypes.func,
  path:propTypes.string,
  title:propTypes.string,
  icon:propTypes.any,
  selected:propTypes.bool
}