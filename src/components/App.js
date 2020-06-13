import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { MDXProvider } from '@mdx-js/react';
import { sideTrigger } from 'Redux/actions/sideloader'

import { isMobileSafari } from 'react-device-detect';
import classNames from 'classnames'

import CV from '../CV.md'
import Readme from '../../README.md'

import Link from 'Containers/Link.js'
import { List } from 'Containers/List.js'
import Sideloader from 'Containers/Sideloader.js'
import ListItem from 'Presentational/ListItem.js'

import fontello from 'Fonts/fontello/config.scss'
import styles from 'Styles/main.scss'

const htmlClassList = document.querySelector('html').classList

const mapStateToProps = (state) => {
  return {
    sidebarLoading: state.sideloader.loading,
    sidebarActive: state.sideloader.active
  }
}

const App = ({
  sidebarLoading,
  sidebarActive,
}) => {

  useEffect(() => {
    isMobileSafari &&
    htmlClassList.add('mobileSafari')
  }, []);

  useEffect(() => {
    if (sidebarActive) {
      htmlClassList.add('sidebar-active')
    } else {
      htmlClassList.remove('sidebar-active')
    }

    if (sidebarLoading) {
      htmlClassList.add('loading');
    } else {
      htmlClassList.remove('loading');
    }
  }, [
    sidebarLoading,
    sidebarActive,
  ])

  const className = classNames(
    sidebarLoading && 'sideloader-loading',
    sidebarActive && 'sideloader-active'
  )

  return (
    <>
      <section className={className}>
        <MDXProvider
          components={{
            a: Link,
            ul: List,
            li: ListItem
          }}
        >
          <div>
            <CV />
          </div>
        </MDXProvider>
        <MDXProvider
          components={{
            a: Link,
          }}
        >
          <div>
            <Readme />
          </div>
        </MDXProvider>
      </section>
      <aside>
        <Sideloader />
      </aside>
    </>
  )
}

export default connect(
  mapStateToProps
)(App)
