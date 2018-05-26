import React from 'react'
import { connect } from 'react-redux';
import { sideLoaded, sideClose } from 'Redux/actions/sideloader'

import Nav from 'Presentational/SideloaderNav.js'

const mapStateToProps = (state) => {
  return {
    src: state.sideloader.href,
    data: state.sideloader.data
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
        <Nav 
          sideClose={props.sideClose}
          description={props.data.desc}
        />
      </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Sideloader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sideloader)
