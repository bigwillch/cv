import React from 'react'
import { connect } from 'react-redux';
import { sideTrigger, sideLoaded, sideClose } from 'Redux/actions/sideloader'

import classNames from 'classnames'

import CV from './CV.md'
import Readme from '../README.md'

import List from 'Presentational/List.js'
import Link from 'Presentational/Link.js'
import Sideloader from 'Presentational/Sideloader.js'

import fontello from './fonts/fontello/config.scss'
import styles from './styles/main.scss'


const mapStateToProps = (state) => {
  return {
    sideloaderSrc: state.sideloader.href,
    sidebarLoading: state.sideloader.loading,
    sidebarActive: state.sideloader.active
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sideTrigger: (href) => {
      dispatch(sideTrigger(href))
    },
    sideLoaded: () => {
      dispatch(sideLoaded())
    },
    sideClose: () => {
      dispatch(sideClose())
    }
  }
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    
    const a = props => <Link {...props} sideTrigger={this.props.sideTrigger} />

    const className = classNames(
      this.props.sidebarLoading && 'sideloader-loading',
      this.props.sidebarActive && 'sideloader-active'
    )

    return (
      <React.Fragment>
        <section className={className}>
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
        </section>
        <aside>
          <Sideloader 
            src={this.props.sideloaderSrc}
            sideLoaded={this.props.sideLoaded}
            sideClose={this.props.sideClose}
          />
        </aside>
      </React.Fragment>
    )
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
