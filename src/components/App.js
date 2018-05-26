import React from 'react'
import { connect } from 'react-redux';
import { sideTrigger } from 'Redux/actions/sideloader'

import { isMobileSafari } from "react-device-detect";
import classNames from 'classnames'

import CV from '../CV.md'
import Readme from '../../README.md'

import Link from 'Containers/Link.js'
import List from 'Containers/List.js'
import Sideloader from 'Containers/Sideloader.js'
import ListItem from 'Presentational/ListItem.js'

import fontello from 'Fonts/fontello/config.scss'
import styles from 'Styles/main.scss'


const mapStateToProps = (state) => {
  return {
    sidebarLoading: state.sideloader.loading,
    sidebarActive: state.sideloader.active
  }
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    isMobileSafari &&
    document.querySelector('html').classList.add('mobileSafari');
  }

  render() {
    const className = classNames(
      this.props.sidebarLoading && 'sideloader-loading',
      this.props.sidebarActive && 'sideloader-active'
    )
    return (
      <React.Fragment>
        <section className={className}>
          <CV
            components={{
              a: Link,
              ul: List,
              li: ListItem
            }}
          />
          <Readme 
            components={{
              a: Link
            }}
          />
        </section>
        <aside>
          <Sideloader />
        </aside>
      </React.Fragment>
    )
  }
}

export default App = connect(
  mapStateToProps
)(App)
