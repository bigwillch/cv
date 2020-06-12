import React, { useState } from 'react'

import classNames from 'classnames'

export const SideloaderNav = ({
  sideClose,
  description,
}) => {

  const [open, setOpen] = useState(false);

  const className = classNames(
    open && 'open'
  );

  const toggleOpen = () => {
    setOpen(!open);
  }

  return (
    <div className={className}>
      <nav>
        <div className="button button--back button--chunky" role="button" tabIndex="0" onClick={sideClose}>Back</div>
        <div 
          className="button button--up toggle" 
          role="button" 
          tabIndex="0"
          onClick={(e) => {
            e.preventDefault()
            this.toggleOpen()
            }
          }
        />
      </nav>
      <p>{description}</p>
    </div>
  )
}
