import React from 'react'
import { connect } from 'react-redux';
import { sideLoaded, sideClose } from 'Redux/actions/sideloader'

import classNames from 'classnames'

const mapStateToProps = (state) => {
  return {
    src: state.sideloader.href
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sideLoaded: () => {
      dispatch(sideLoaded())
    },
    sideClose: () => {
      dispatch(sideClose())
    }
  }
}

let Sideloader = (props) => {

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

export default Sideloader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sideloader)
