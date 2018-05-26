import React from 'react'

let SideloaderNav = (props) => {

  return (
    <nav>
      <div className="button button--back button--chunky" onClick={props.sideClose}>Back</div>
    </nav>
  )
}

export default SideloaderNav
