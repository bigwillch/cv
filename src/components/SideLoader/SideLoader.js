import React, { useContext } from 'react';

import { SideLoaderNav } from 'Components';
import { SideLoaderContext } from 'Contexts';

export const SideLoader = () => {
  const {
    state: {
      href,
      desc,
    },
    actions: {
      sideLoaded,
      sideClose,
    },
  } = useContext(SideLoaderContext);

  return (
    <>
      { href
        && (
        <>
          <iframe
            src={href}
            onLoad={sideLoaded}
          />
          <SideLoaderNav
            sideClose={sideClose}
            description={desc}
          />
        </>
        )}
    </>
  );
};
