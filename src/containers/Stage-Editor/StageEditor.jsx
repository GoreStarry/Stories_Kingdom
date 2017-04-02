import React, { PureComponent, PropTypes } from 'react';

class StageEditor extends PureComponent {
  componentDidMount() {
    console.log('done');
  }

  render() {
    const {story_id, article_id} = this.props.match.params;
    return (
      <div>
        <h1>Stage Editor</h1>
        <h2>story id:{ story_id }</h2>
        <h2>article id:{ article_id }</h2>
      </div>
      );
  }
}

StageEditor.propTypes = {
  match: PropTypes.object.isRequired,
};

export default StageEditor;
