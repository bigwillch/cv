import React, { useState } from 'react';
import Measure from 'react-measure';
import debounce from 'debounce';
import classNames from 'classnames';

export const List = ({
  children,
}) => {
  const [scrollable, setScrollable] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const checkScroll = (measure, contentRect) => {
    measure();
    setScrolled(contentRect.scroll.left > ((contentRect.scroll.width - contentRect.client.width) / 2));
  };

  const className = classNames(
    scrollable && 'scrollable',
    scrolled && 'scrolled',
  );

  if (navigator.userAgent === 'ReactSnap') {
    return (
      <ul>
        {children}
      </ul>
    );
  }

  return (
    <Measure
      client
      scroll
      onResize={(contentRect) => setScrollable(contentRect.client.width < contentRect.scroll.width)}
    >
      {({ measure, measureRef, contentRect }) => (
        <>
          <ul
            ref={measureRef}
            className={className}
            onScroll={scrollable
              ? () => debounce(checkScroll(measure, contentRect))
              : null}
          >
            {children}
          </ul>
          {scrollable
            && <span>scroll me</span>}
        </>
      )}
    </Measure>
  );
};
