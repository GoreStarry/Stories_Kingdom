import React, { Component } from 'react';

class StoryCard extends Component {

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const dragged = itemSelected !== 0;
    const shadow = itemSelected * 15 + 1;

    const boxClassName = cx('item', {
      dragged
    });
    const boxStyle = {
      transform: `scale(${scale})`,
      boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
    };

    return (
      <div className={ boxClassName } style={ boxStyle }>
        { dragHandle(<div className="dragHandle" />) }
        <div>123</div>
      </div>
      );
  }
}

export default StoryCard;
