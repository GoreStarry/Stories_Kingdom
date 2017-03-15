import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './StoryCard.scss';

let cx = classNames.bind(styles);

class StoryCard extends Component {

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const dragged = itemSelected !== 0;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;

    const boxClassName = cx('StoryCard', {
      dragged,
    });

    const boxStyle = {
      transform: `scale(${scale})`,
      boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
    };

    return (
      <div className={ boxClassName } style={ boxStyle }>
        { dragHandle(<div>
                       <span>123</span>
                     </div>) }
      </div>
      );
  }
}

export default StoryCard;
