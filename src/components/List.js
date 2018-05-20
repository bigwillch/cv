import React from 'react'
import Measure from 'react-measure'
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
    measure();
    this.setState({
      scrolled: contentRect.scroll.left > 5 ? true : false,
      scrolledAmount: contentRect.scroll.left / (contentRect.client.width / 100)
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
              onScroll={(e) => this.checkScroll(measure, contentRect)}
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
