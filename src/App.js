import React from 'react'
import CV from './CV.md'
import Link from 'Presentational/Link.js'
import List from 'Containers/List.js'
import styles from './styles/main.scss'

const App = () => (
  <CV
    components={{
      a: Link,
      ul: List
    }}
  />
)

export default App