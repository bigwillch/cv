import React from 'react'
import CV from './CV.md'
import Heading from './components/Heading.js'
import styles from './styles/main.scss'

const h1 = props => <Heading {...props} level={1} />
const h2 = props => <Heading {...props} level={2} />

const App = () => (
  <CV 
    components={{
      h1,
      h2
    }}
  />
);
export default App;