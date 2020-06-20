import React, { useContext } from 'react'

import { SideLoaderNav } from 'Components';
import { SideLoaderContext } from 'Contexts';

export const SideLoader = () => {

  const {
    state: {
      href: src,
      data: {
        desc,
      },
    },
    actions: {
      sideLoaded,
      sideClose,
    }
  } = useContext(SideLoaderContext);

  return (
    <>
      { src &&
        <>
          <iframe 
            src={src}
            onLoad={sideLoaded}
          />
          <SideLoaderNav 
            sideClose={sideClose}
            description={desc}
          />
        </>
      }
    </>
  )
};
