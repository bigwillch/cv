import React from 'react'
import { Textfit } from 'react-textfit';

const Heading = (props) => {

  const Tag = `h${props.level}`

  return (
    <Textfit {...props.opts} >
      <Tag>{ props.children }</Tag>
    </Textfit>
  )
};
export default Heading;