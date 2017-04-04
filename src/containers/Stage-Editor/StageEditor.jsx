import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import _findIndex from 'lodash/fp/findIndex';
import { EditorState, convertFromRaw } from 'draft-js';
import EditorStoriesKingdom from './components/Editor-Stories-Kingdom/EditorStoriesKingdom.jsx';
import { TransitionMotion, spring } from 'react-motion';


import classNames from 'classnames/bind';
import styles from './StageEditor.scss';
const cx = classNames.bind(styles);

import ArticleDetial from './components/Article-Detial/ArticleDetial.jsx';
import { getStoryEditRecordLocal } from '../../helpers/Local-Edit-Record/getStoryEditRecordLocal.js';


/**
 * EditorState would immute in this component
 * anothers Draft setting like decorator,entity... would be setted in the DraftEditor component
 * 
 * @class StageEditor
 * @extends {PureComponent}
 */
class StageEditor extends PureComponent {

  state = {
    now_page: 1,
    editorState: false,
    updateYet: false,
  }

  async componentWillMount() {
    const {stories, articles} = this.props;
    const {story_id, article_id} = this.props.match.params;

    // now page decide the Editor render target, so should set it first
    await this._setInitPageByParamsArticle()
    this._initDraftEditorState();

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

    if (article_id) { // initial article not setting
      return resolve()
    }

    const {stories} = this.props;
    const indexOfInitArticle = _findIndex(stories[story_id].ArticleOrder)(['id', article_id]);

    this.setState({
      now_page: indexOfInitArticle + 1
    }, resolve);

  })


  _initDraftEditorState = () => {

    const contentState = this._getArticleDraftContent();
    if (contentState) {
      this.setState({
        editorState: createWithContent.createEmpty(convertFromRaw(contentState))
      });
    } else { // new a empty EditorState
      this.setState({
        editorState: EditorState.createEmpty()
      });
    }

  }


  /**
   * try to get contentState from localStorage or redux or just new one
   */
  _getArticleDraftContent = () => {
    const {articles} = this.props;
    const {story_id, article_id} = this.props.match.params;

    return this._getLocalDraftContent(story_id, article_id) || this._getReduxDraftContent(story_id, article_id, articles)
  }


  _getLocalDraftContent = (story_id, article_id) => {
    try { // check localStorage exist cache contentState or not
      return contentState = getStoryEditRecordLocal(story_id).update_cache.find((cache) => {
        return cache.article_id === article_id;
      }).contentState;
    } catch (error) {
      return false
    }
  }

  _getReduxDraftContent = (story_id, article_id, articles) => {
    return articles[story_id][article_id].draftContent;
  }



  _editorOnChange = (editorState) => {

    this.setState({
      editorState
    });

  };


  render() {
    const {now_page, editorState} = this.state;
    const {stories, articles} = this.props;
    const {story_id, article_id} = this.props.match.params;

    return (
      <div className="flex--col flex--extend ">
        <h1>Stage Editor</h1>
        <div className={ "flex--extend " + styles.body__editors }>
          { editorState &&
            <EditorStoriesKingdom editorState={ editorState } onChange={ this._editorOnChange } /> }
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
