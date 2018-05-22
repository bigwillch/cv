import React from 'react'
import CV from './CV.md'
import Readme from '../README.md'
import Link from 'Presentational/Link.js'
import List from 'Containers/List.js'
import fontello from './fonts/fontello/config.scss'
import styles from './styles/main.scss'

const App = () => (
  <React.Fragment>
    <CV
      components={{
        a: Link,
        ul: List
      }}
    />
    <Readme />
  </React.Fragment>
)

export default App