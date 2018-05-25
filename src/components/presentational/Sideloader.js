import React from 'react'
import classNames from 'classnames'

const Sideloader = (props) => {

  return (
    <React.Fragment>
      { props.src &&
        <iframe src={props.src}></iframe>
      }
    </React.Fragment>
  )

}

export default Sideloader;