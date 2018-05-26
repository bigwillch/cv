import React from 'react'
import Measure from 'react-measure'
import debounce from 'debounce'
import classNames from 'classnames'

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollable: false,
      scrolled: false,
      scrolledAmount: 0
    };
  }

  checkScroll = (measure, contentRect) => {
    measure()
    this.setState({
      scrolled: contentRect.scroll.left > ((contentRect.scroll.width - contentRect.client.width) / 2) ? true : false
    }) 
  }

  render() {
    // const scrollable = this.state.clientWidth < this.state.scrollWidth ? true : false
    const className = classNames(
      this.state.scrollable && 'scrollable',
      this.state.scrolled && 'scrolled'
    )

    return (
      <Measure
        client
        scroll
        onResize={(contentRect) => {
          this.setState({
            scrollable: contentRect.client.width < contentRect.scroll.width ? true : false,
          })
        }}
      >
        {({ measure, measureRef, contentRect }) =>
          <React.Fragment>
            <ul 
              ref={measureRef} 
              className={className}
              onScroll={this.state.scrollable ? (e) => debounce(this.checkScroll(measure, contentRect)) : null }
            >
              {this.props.children}
            </ul>
            { this.state.scrollable &&
              <span>scroll me</span>
            }
          </React.Fragment>
        }
      </Measure>
    )
  }
}
