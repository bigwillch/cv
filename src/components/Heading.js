import React from 'react'
const ReactFitText = require('react-fittext');

const App = (props) => {

  const Tag = `h${props.level}`

  return (
    <ReactFitText>
      <Tag>{ props.children }</Tag>
    </ReactFitText>
  )
};
export default App;