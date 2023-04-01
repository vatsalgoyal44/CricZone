import React from 'react'
import './sidebar.css'
import { sidebarData  } from './sidebarData'


function Sidebar() {
  return (<div className='sidebar'>
    <ul className='sidebarlist'>
        {sidebarData.map((val,key)=>{
            return <li key = {key} onClick={window.location.pathname = val.link} className='row'>
            <div className='rowtitle'>
                {val.title}
            </div></li>
        })}
    </ul>    
    </div>
  )
}


export default Sidebar