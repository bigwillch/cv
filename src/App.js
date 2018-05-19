import React from 'react'
import CV from './CV.md'
import Link from './components/Link.js'
import styles from './styles/main.scss'

const App = () => (
  <CV 
    components={{
      a: Link
    }}
  />
);
export default App;