import React from 'react'
import Measure from 'react-measure'
import classNames from 'classnames'

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clientWidth: -1,
      scrollWidth: -1
    };
  }

  render() {
    const { clientWidth, scrollWidth } = this.state
    const className = classNames(
      (clientWidth < scrollWidth) && 'scrollable'
    )

    return (
      <Measure
        client
        scroll
        onResize={(contentRect) => {
          this.setState({ 
            clientWidth: contentRect.client.width,
            scrollWidth: contentRect.scroll.width
          })
        }}
      >
        {({ measureRef }) =>

          <ul ref={measureRef} className={className}>
            {this.props.children}
          </ul>

        }
      </Measure>
    )
  }
}
