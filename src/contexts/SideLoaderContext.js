import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types'; 

export const SideLoaderContext = createContext({});

export const SideLoaderProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [currentData, setData] = useState({
    href: null,
    desc: null,
  });

  const actions = {
    sideTrigger: (data) => {
      // if current link already loaded open straight away
      if (currentData.href === data.href) {
        return setActive(true);
      }
      setLoading(true);
      setData(data);
      return;
    },
    sideLoaded: () => {
      setLoading(false);
      setActive(true);
      return;
    },
    sideClose: () => setActive(false),
  };

  return (
    <SideLoaderContext.Provider value={{
      state: {
        loading,
        active,
        ...currentData,
      },
      actions,
    }}
    >
      { children }
    </SideLoaderContext.Provider>
  );
};

SideLoaderProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
