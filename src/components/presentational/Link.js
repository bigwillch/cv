import React from 'react'
import Obfuscate from 'react-obfuscate'

const Link = (props) => {

  switch (props.children) {
    case 'email':
    case 'tel':
      if (!ENV[props.href]) {
        return null
      } 
      const componentProps = {};
      componentProps[props.children] = ENV[props.href]
      return (
        <Obfuscate { ...componentProps } />
      )
  default:
    return (
      <a href={ props.href }>{ props.children }</a>
    )
  }

};
export default Link;