import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import download from "downloadjs";

import classNames from "classnames/bind";
import styles from "./StoryCard.scss";

let cx = classNames.bind(styles);
class StoryCard extends Component {
  _clickDeleteBtn = (e, data) => {
    this.props.commonProps.openDeleteModal(
      data["data-story-id"],
      data["data-story-name"]
    );
  };

  _getStoryBackupFile = async () => {
    const { item: { id: story_id }, commonProps } = this.props;
    await axios.get(`/api/stories/backup/${story_id}`).then(res => {
      download(
        res.data,
        `${commonProps.stories[story_id].name}.txt`,
        "text/plain"
      );
    });
  };

  render() {
    const { item, itemSelected, dragHandle, commonProps } = this.props;
    const dragged = itemSelected !== 0;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15;

    const boxClassName = cx("StoryCard", {
      dragged
    });

    const boxStyle = {
      transform: `scale(${scale})`,
      boxShadow: `rgba(255, 255, 255, 0.3) 0px 0px ${2 * shadow}px 0px`
    };

    return (
      <div className={boxClassName} style={boxStyle}>
        <div className="StoryCard__inner_flex">
          {dragHandle(<Icon disabled name="content" />)}
          <div className={styles.story__detail}>
            <Link to={`/chapter/${item.id}`}>
              <div className="detail__name">
                {commonProps.stories[item.id].name}
              </div>
              <div className="detail__description">
                {commonProps.stories[item.id].description}
              </div>
            </Link>
          </div>
          <Button
            className={`btn__delete ${styles.btn__delete}`}
            icon="save"
            data-story-id={item.id}
            data-story-name={commonProps.stories[item.id].name}
            onClick={this._getStoryBackupFile}
          />
          <Button
            className={`btn__delete ${styles.btn__delete}`}
            icon="delete"
            data-story-id={item.id}
            data-story-name={commonProps.stories[item.id].name}
            onClick={this._clickDeleteBtn}
          />
        </div>
      </div>
    );
  }
}

StoryCard.propTypes = {
  item: PropTypes.object, // data of list
  itemSelected: PropTypes.number.isRequired, // selected state
  dragHandle: PropTypes.func,
  commonProps: PropTypes.object // props pass from DraggableList
};

export default StoryCard;
