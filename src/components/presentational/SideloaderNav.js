import React from 'react'

let SideloaderNav = (props) => {

  return (
    <nav>
      <div class="button button--back" role="button" tabindex="0" onClick={props.sideClose}>Back</div>
    </nav>
  )
}

export default SideloaderNav
