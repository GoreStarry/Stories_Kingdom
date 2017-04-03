import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import _findIndex from 'lodash/fp/findIndex';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, CompositeDecorator, Modifier, convertToRaw, genKey, ContentBlock } from 'draft-js';
import { TransitionMotion, spring } from 'react-motion';


import classNames from 'classnames/bind';
import styles from './StageEditor.scss';
const cx = classNames.bind(styles);

import ArticleDetial from './components/Article-Detial/ArticleDetial.jsx';

class StageEditor extends PureComponent {

  state = {
    now_page: 1,
    editorState_now: false,
    editorState_prev: false,
    editorState_next: false,
  }

  async componentWillMount() {
    const {stories, articles} = this.props;
    const {story_id, article_id} = this.props.match.params;

    await this._setInitPageByParamsArticle()

    // TODO: 檢查初始頁是否包含draft content,沒有則創建

    // TODO: 當前頁的控管
    // TODO: 按鍵控管：新增後頁/前頁

  }


  /**
   * if article id be given by route params
   * set init page number by target article id
   * 
   * @memberOf StageEditor
   */
  _setInitPageByParamsArticle = () => new Promise((resolve) => {

    const {story_id, article_id} = this.props.match.params;

    if (article_id) {
      resolve()
      return false
    }

    const {stories} = this.props;

    const indexOfInitArticle = _findIndex(stories[story_id].ArticleOrder)(['id', article_id]);
    this.setState({
      now_page: indexOfInitArticle + 1
    }, resolve);

  })


  _initDraftEditorState = () => {
    const {now_page} = this.state;
    const {stories} = this.props;
    const {story_id} = this.props.match.params;


  }

  _checkArticleDraftContentExist = (article_id) => {
    const {stories, articles} = this.props;

  }

  componentDidMount() {}


  /**
   * for page transition animation
   * 
   * @returns 
   * 
   * @memberOf StageEditor
   */
  render() {
    const {now_page} = this.state;
    const {stories, articles} = this.props;
    const {story_id, article_id} = this.props.match.params;
    return (
      <div className="flex--col flex--extend ">
        <h1>Stage Editor</h1>
        <div className={ "flex--extend " + styles.body__editors }>
          { stories[story_id].articleOrder.map(({id}, index) => {
              return
            }) }
        </div>
        <ArticleDetial now_page={ now_page } />
      </div>
      );
  }
}

StageEditor.propTypes = {
  stories: PropTypes.any,
  articles: PropTypes.any,
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    stories: state.stories.stories,
    articles: state.articles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageEditor);
