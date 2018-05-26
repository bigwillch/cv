import React from 'react'

import classNames from 'classnames'


export default class SideloaderNav extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  
  toggleOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    const className = classNames(
      this.state.open && 'open'
    )
    return (
      <div className={className}>
        <nav>
          <div className="button button--back button--chunky" role="button" tabIndex="0" onClick={this.props.sideClose}>Back</div>
          <div 
            className="button button--up button--chunky" 
            role="button" 
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault()
              this.toggleOpen()
              }
            }
          >Info</div>
        </nav>
        <p>{this.props.description}</p>
      </div>
    )
  }
}
