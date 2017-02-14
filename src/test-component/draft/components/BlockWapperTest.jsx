import React, { Component } from 'react';

class BlockWapperTest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='MyCustomBlock'>
        { this.props.children }
      </div>
      );
  }
}

export default BlockWapperTest;
