import React from 'react'
import { connect } from 'react-redux';
import { sideTrigger } from 'Redux/actions/sideloader'

import Obfuscate from 'react-obfuscate'
import classNames from 'classnames'

const mapDispatchToProps = (dispatch) => {
  return {
    sideTrigger: (href, data) => {
      dispatch(sideTrigger(href, data))
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

  // check href to check for example hashtag
  const href = props.href.split('#'),
        sideload = href[1] === 'example' ? true : false,
        text = sideload ? 'Load example' : props.children,
        className = classNames(
          sideload && 'button button--forward'
        )

  return (
    <a 
      href={ href[0] }
      target="_blank"
      className={className}
      // if preview hashtag present trigger sideload action
      onClick={sideload ? (e) => {
        e.preventDefault()
        props.sideTrigger(
          href[0],
          { desc: props.children }
        )
      } : null } 
    >
      { text }
    </a>
  )
}

export default Link = connect(
  null,
  mapDispatchToProps
)(Link)