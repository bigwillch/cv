import React, { useContext } from 'react'

import Obfuscate from 'react-obfuscate'
import classNames from 'classnames';

import { SideLoaderContext } from 'Contexts';

export const Link = ({
  children,
  href,
}) => {

  const {
    actions: {
      sideTrigger
    }
  } = useContext(SideLoaderContext);

  // contact details need to be set as env vars
  // CONTACTEMAIL
  // CONTACTTEL
  switch (children) {
    case 'email':
    case 'tel':
      if (!ENV[href]) {
        return null
      } 
      return (
        <Obfuscate
          className={children}
          {...{ [children]: ENV[href]} }
        />
      )
      default:
  }

  // check href to check for example hashtag
  const hrefSplit = href.split('#'),
        sideload = hrefSplit[1] === 'example' ? true : false,
        text = sideload ? 'Load example' : children,
        className = classNames(
          sideload && 'button button--forward'
        )

  return (
    <a 
      href={ hrefSplit[0] }
      target="_blank"
      rel="noreferrer"
      className={className}
      // if preview hashtag present trigger sideload action
      onClick={sideload ? (e) => {
        e.preventDefault()
        sideTrigger(
          hrefSplit[0],
          { desc: children }
        )
      } : null } 
    >
      { text }
    </a>
  )
}