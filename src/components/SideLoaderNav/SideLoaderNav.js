import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

export const SideLoaderNav = ({
  sideClose,
  description,
}) => {
  const [open, setOpen] = useState(false);

  const className = classNames(
    open && 'open',
  );

  const toggleOpen = () => {
    setOpen(!open);
  };

  const keyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
      case 'ArrowLeft':
        setOpen(false);
        sideClose();
        return;
      case 'ArrowUp':
        return setOpen(true);
      case 'ArrowDown':
        return setOpen(false);
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDown, false);
  }, []);

  return (
    <div className={className}>
      <nav>
        <div className="button button--back button--chunky" role="button" tabIndex="0" onClick={sideClose}>Back</div>
        <div
          className="button button--up toggle"
          role="button"
          tabIndex="0"
          onClick={(e) => {
            e.preventDefault();
            toggleOpen();
          }}
        />
      </nav>
      <p>{description}</p>
    </div>
  );
};
