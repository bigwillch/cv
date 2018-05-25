import React from 'react'
import classNames from 'classnames'

const Sideloader = (props) => {

  return (
    <React.Fragment>
      { props.src &&
        <React.Fragment>
        <iframe 
          src={props.src}
          onLoad={props.sideLoaded}
        ></iframe>
        <div role="button" tabindex="0" onClick={props.sideClose}>Back</div>
      </React.Fragment>
      }
    </React.Fragment>
  )

}

export default Sideloader;