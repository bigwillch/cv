import React, { useState } from 'react'
import Measure from 'react-measure'
import debounce from 'debounce'
import classNames from 'classnames'

export const List = ({
  children,
}) => {

  const [state, setState] = useState({
    scrollable: false,
    scrolled: false,
  })

  const checkScroll = (measure, contentRect) => {
    measure();
    setState({
      ...state,
      scrolled: contentRect.scroll.left > ((contentRect.scroll.width - contentRect.client.width) / 2) ? true : false,
    })
  }

  const className = classNames(
    state.scrollable && 'scrollable',
    state.scrolled && 'scrolled'
  )

  return (
    <Measure
      client
      scroll
      onResize={(contentRect) => {
        setState({
          ...state,
          scrollable: contentRect.client.width < contentRect.scroll.width ? true : false,
        })
      }}
    >
      {({ measure, measureRef, contentRect }) =>
        <React.Fragment>
          <ul
            ref={measureRef}
            className={className}
            onScroll={state.scrollable
              ? () => debounce(checkScroll(measure, contentRect))
              : null
            }
          >
            {children}
          </ul>
          {state.scrollable &&
            <span>scroll me</span>
          }
        </React.Fragment>
      }
    </Measure>
  )
}
