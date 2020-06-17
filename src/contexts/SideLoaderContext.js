import React, { createContext, useState } from 'react';

export const SideLoaderContext = createContext({});

export const SideLoaderProvider = ({ children }) => {

  const [state, setState] = useState({
    href: null,
    loading: false,
    active: false,
    data: {},
  });

  const actions = {
    sideTrigger: (href, data) => {
      // if current link already loaded open straight away
      if (state.href === href) {
        return setState({
          ...state,
          active: true,
        })
      }
      return setState({
        ...state,
        href,
        loading: true,
        data,
      })
    },
    sideLoaded: () => setState({
      ...state,
      loading: false,
      active: true,
    }),
    sideClose: () => setState({
      ...state,
      active: false,
    }),
  }

  return (
    <SideLoaderContext.Provider value={{
      state,
      actions,
    }}>
      { children }
    </SideLoaderContext.Provider>
  )
}