import React from 'react'
import { connect } from 'react-redux';
import { sideLoad } from 'Redux/actions/sideloader'

import CV from './CV.md'
import Readme from '../README.md'

import List from 'Presentational/List.js'
import Link from 'Presentational/Link.js'
import Sideloader from 'Presentational/Sideloader.js'

import fontello from './fonts/fontello/config.scss'
import styles from './styles/main.scss'


const mapStateToProps = (state) => {
  return {
    sideloaderSrc: state.sideloader.href
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    triggerSideload: (href) => {
      dispatch(sideLoad(href))
    }
  }
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    
    const a = props => <Link {...props} triggerSideload={this.props.triggerSideload} />

    return (
      <React.Fragment>
        <CV
          components={{
            a,
            ul: List
          }}
        />
        <Readme 
          components={{
            a
          }}
        />
        <Sideloader src={this.props.sideloaderSrc} />
      </React.Fragment>
    )
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
