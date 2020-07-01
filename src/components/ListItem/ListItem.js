import React from 'react';
import PropTypes from 'prop-types'; 

export const ListItem = ({
  children,
}) => (
  <li>
    <span>{children}</span>
  </li>
);

ListItem.propTypes = {
  children: PropTypes.element.isRequired,
};
