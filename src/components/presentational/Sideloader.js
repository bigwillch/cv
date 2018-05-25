import React from 'react'
import classNames from 'classnames'

const Sideloader = (props) => {

  const onLoadHandler = (e) => {
    props.sideLoaded();
  }

  return (
    <React.Fragment>
      { props.src &&
        <iframe 
          src={props.src}
          onLoad={onLoadHandler}
        ></iframe>
      }
    </React.Fragment>
  )

}

export default Sideloader;