import React, { createContext, useState, ReactNode } from 'react';

interface ISideLoaderContext {
  state: Record<string, unknown>;
  actions: Record<string, unknown>;
}

type Props = {
  children: ReactNode;
};

export const SideLoaderContext = createContext<ISideLoaderContext>({});

export const SideLoaderProvider: React.FC<Props> = ({ children }) => {
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
        });
      }
      return setState({
        ...state,
        href,
        loading: true,
        data,
      });
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
  };

  return (
    <SideLoaderContext.Provider value={{
      state,
      actions,
    }}
    >
      { children }
    </SideLoaderContext.Provider>
  );
};
