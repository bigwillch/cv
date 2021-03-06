import React, { useContext } from 'react';
import PropTypes from 'prop-types'; 
import Obfuscate from 'react-obfuscate';
import classNames from 'classnames';

import { SideLoaderContext } from 'Contexts';

export const Link = ({
  children,
  href,
}) => {
  const {
    actions: {
      sideTrigger,
    },
  } = useContext(SideLoaderContext);

  // contact details need to be set as env vars
  // CONTACTEMAIL
  // CONTACTTEL
  switch (children) {
    case 'email':
    case 'tel':
      if (!ENV[href]) {
        return null;
      }
      return (
        <Obfuscate
          className={children}
          {...{ [children]: ENV[href] }}
        />
      );
    default:
  }

  // check href for example hashtag
  const hrefSplit = href.split('#');
  const sideload = hrefSplit[1] === 'example';
  const text = sideload ? 'Load example' : children;
  const className = classNames(
    sideload && 'button button--forward',
  );

  return (
    <a
      href={hrefSplit[0]}
      target="_blank"
      rel="noreferrer"
      className={className}
      // if preview hashtag present trigger sideload action
      onClick={sideload ? (e) => {
        e.preventDefault();
        sideTrigger({
          href: hrefSplit[0],
          desc: children,
        });
      } : null}
    >
      { text }
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
