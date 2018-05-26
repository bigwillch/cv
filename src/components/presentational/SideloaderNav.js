import React from 'react'

let SideloaderNav = (props) => {

  return (
    <nav>
      <div className="button button--back button--chunky" role="button" tabIndex="0" onClick={props.sideClose}>Back</div>
      <p>{props.description}</p>
    </nav>
  )
}

export default SideloaderNav
