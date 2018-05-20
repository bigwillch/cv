import React from 'react'
import Debounce from 'debounce'
import CV from './CV.md'
import Link from './components/Link.js'
import List from './components/List.js'
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