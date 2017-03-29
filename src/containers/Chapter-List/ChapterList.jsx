import React, { PureComponent, PropTypes } from 'react';

// TODO: 初創故事的連帶創建起始article，並帶預設chapter name
// TODO: fetch 拿所有該story的article
// TODO: 只取有chapter name的render機制
// TODO: 進入最尾編輯頁
// TODO: 進入上次編輯頁
class ChapterList extends PureComponent {
  render() {
    return (
      <div>
        <h1>Chapter List</h1>
        <span>{ this.props.match.params.story_id }</span>
      </div>
      );
  }
}

ChapterList.propTypes = {
  match: PropTypes.object,
};

export default ChapterList;
