import React from 'react'
import { connect } from 'react-redux';
import { sideLoad } from 'Redux/actions/sideloader'

import CV from './CV.md'
import Readme from '../README.md'

import List from 'Containers/List.js'
import Link from 'Presentational/Link.js'

import fontello from './fonts/fontello/config.scss'
import styles from './styles/main.scss'


const mapStateToProps = (state) => {
  return {
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
      </React.Fragment>
    )
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
