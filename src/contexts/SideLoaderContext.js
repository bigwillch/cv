import React, { createContext, useState } from 'react';

export const SideLoaderContext = createContext({});

export const SideLoaderProvider = ({ children }) => {

  const [currentHref, setCurrentHref] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState({});

  const actions = {
    sideTrigger: (href, data) => {
      // if current link already loaded open straight away
      if (currentHref === href) {
        return setActive(true);
      }
      setLoading(true);
      setCurrentHref(href);
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
        href: currentHref,
        loading,
        active,
        data,
      },
      actions,
    }}
    >
      { children }
    </SideLoaderContext.Provider>
  );
};
