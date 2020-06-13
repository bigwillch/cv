import React from 'react'
import { connect } from 'react-redux';
import { sideLoaded, sideClose } from 'Redux/actions/sideloader'

import { SideloaderNav } from 'Presentational/SideloaderNav.js'

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

const Sideloader = ({
  src,
  sideLoaded,
  sideClose,
  data: {
    desc,
  },
}) => (
  <>
    { src &&
      <>
      <iframe 
        src={src}
        onLoad={sideLoaded}
      ></iframe>
      <SideloaderNav 
        sideClose={sideClose}
        description={desc}
      />
    </>
    }
  </>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sideloader)
