import React from 'react'

let SideloaderNav = (props) => {

  return (
    <nav>
      <div className="button button--back" role="button" tabIndex="0" onClick={props.sideClose}>Back</div>
    </nav>
  )
}

export default SideloaderNav
