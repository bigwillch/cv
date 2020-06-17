import React, { useEffect, useContext } from 'react'
import { MDXProvider } from '@mdx-js/react';

import { isMobileSafari } from 'react-device-detect';
import classNames from 'classnames'

import CV from './CV.md'
import Readme from '../README.md'

import {
  Link,
  List,
  ListItem,
  SideLoader,
} from 'Components'
import { SideLoaderContext } from 'Contexts';

import fontello from 'Fonts/fontello/config.scss'
import styles from 'Styles/main.scss'

const htmlClassList = document.querySelector('html').classList

export const App = () => {

  const {
    state: {
      loading: sidebarLoading,
      active: sidebarActive,
    },
  } = useContext(SideLoaderContext);

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
  ]);

  const className = classNames(
    sidebarLoading && 'sideloader-loading',
    sidebarActive && 'sideloader-active'
  );

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
        <SideLoader />
      </aside>
    </>
  )
}
