import React from 'react'
import { connect } from 'react-redux';
import { sideTrigger } from 'Redux/actions/sideloader'

import Obfuscate from 'react-obfuscate'
import classNames from 'classnames'

const mapDispatchToProps = (dispatch) => {
  return {
    sideTrigger: (href) => {
      dispatch(sideTrigger(href))
    }
  }
}

let Link = (props) => {

  switch (props.children) {
    case 'email':
    case 'tel':
      if (!ENV[props.href]) {
        return null
      } 
      const componentProps = {};
      componentProps[props.children] = ENV[props.href]
      return (
        <Obfuscate className={ props.children } { ...componentProps } />
      )
  }

  // check href to check for preview hashtag
  const href = props.href.split('#')

  const sideload = href[1] === 'preview' ? true : false
  
  const className = classNames(
    sideload && 'sideload'
  )

  return (
    <a 
      href={ href[0] }
      // if preview hashtag present trigger sideload action
      onClick={sideload ? (e) => {
        e.preventDefault()
        props.sideTrigger(href[0])
      } : null } 
      className={className}
      target="_blank"
    >
      { props.children }
    </a>
  )
}

export default Link = connect(
  null,
  mapDispatchToProps
)(Link)