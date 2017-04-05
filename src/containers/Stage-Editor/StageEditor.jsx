import React, { PureComponent, PropTypes } from 'react';
import Rx from 'rxjs/Rx';
import { connect } from 'react-redux';
import _findIndex from 'lodash/fp/findIndex';
import _flow from 'lodash/fp/flow';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import EditorStoriesKingdom from './components/Editor-Stories-Kingdom/EditorStoriesKingdom.jsx';


import classNames from 'classnames/bind';
import styles from './StageEditor.scss';
const cx = classNames.bind(styles);

import ArticleDetial from './components/Article-Detial/ArticleDetial.jsx';
import { getArticleDraftContent } from './helpers/getArticleContentState.js';


const parseContentStateToString = _flow([convertToRaw, JSON.stringify]);

/**
 * EditorState would immute in this component
 * anothers Draft setting like decorator,entity... would be setted in the EditorStoriesKingdom component
 * 
 * @class StageEditor
 * @extends {PureComponent}
 */
class StageEditor extends PureComponent {

  constructor() {
    super();

    this.state = {
      editorState: false,
      updateYet: false,
      content_updated: true
    }

    this.autoUpdate = new Rx.Subject();
  }


  async componentWillMount() {
    const {stories, articles, actions} = this.props;
    const {story_id, article_id} = this.props.match.params;

    // now page decide the Editor render target, so should set it first
    await this._setInitPageByParamsArticle()
    this._initDraftEditorState();

    // RxJS will debounce update the changed contentState to server 
    this.autoUpdate.debounceTime(3000)
      .subscribe(({editorState, article_id}) => {

        const updatedCallback = () => {
          this.setState({
            content_updated: true
          })
        }

        actions.editArticle(article_id, {
          draftContent: parseContentStateToString(editorState.getCurrentContent())
        }, updatedCallback)

      })

      // TODO: 按鍵控管：新增後頁/前頁
      // TODO: 點.DraftEditor-root自動foucs再最後一段的尾巴

  }


  /**
   * if article id be given by route params
   * set init page number by target article id
   * 
   * @memberOf StageEditor
   */
  _setInitPageByParamsArticle = () => new Promise((resolve) => {
    const {stories, actions} = this.props;
    const {story_id, article_id} = this.props.match.params;



    if (article_id) { // initial article exist
      const indexOfInitArticle = _findIndex(stories[story_id].ArticleOrder)(['id', article_id]);
      actions.turnPageByArticleId(article_id, indexOfInitArticle);
    } else {
      const articleIdOfFirstOrder = stories[story_id].ArticleOrder[0].id;
      actions.turnPageByArticleId(articleIdOfFirstOrder, 0);
    }
    resolve()

  })


  _initDraftEditorState = () => {
    const {articles} = this.props;
    const {story_id, article_id} = this.props.match.params;
    const contentState = getArticleDraftContent(story_id, article_id, articles);
    if (contentState) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(contentState))
      });
    } else { // new a empty EditorState
      this.setState({
        editorState: EditorState.createEmpty()
      });
    }

  }


  /**
   * use RxJS to control auto update
   * (Thanks for JerryHong's RxJS tutorial and examples~~ [http://ithelp.ithome.com.tw/articles/10188121])
   * 
   * @memberOf StageEditor
   */
  _editorOnChange = (editorState) => {
    this.setState({
      editorState,
      content_updated: false,
    }, () => {

      const article_id = this.props.stage.page_article_id;
      this.autoUpdate.next({
        editorState,
        article_id
      });
    });
  };


  _insertNewArticleAfter = () => {
    this._insertArticle(1)
  }

  _insertNewArticleBefore = () => {
    this._insertArticle(0)
  }


  /**
   * @param {number} translate
   * translate is for insert before or after now article
   */
  _insertArticle = (translate) => {
    const {actions} = this.props;
    const {story_id} = this.props.match.params;
    let {page_order} = this.props.stage;
    page_order += translate;
    actions.createArticle(story_id, page_order);
  }



  render() {
    const {editorState, content_updated} = this.state;
    const {stories, articles, stage} = this.props;
    const {story_id} = this.props.match.params;

    return (
      <div className="flex--col flex--extend ">
        <h1>Stage Editor</h1>
        <button onClick={ this._insertNewArticleAfter }>
          NEXT
        </button>
        <button onClick={ this._insertNewArticleBefore }>
          PREV
        </button>
        <div className={ "flex--extend " + styles.body__editors }>
          { editorState &&
            <EditorStoriesKingdom
              articleOrder={ stories[story_id].articleOrder }
              article_id={ stage.page_article_id }
              editorState={ editorState }
              onChange={ this._editorOnChange } /> }
        </div>
        <ArticleDetial page_order={ stage.page_order } content_updated={ content_updated } />
      </div>
      );
  }
}

StageEditor.propTypes = {
  stories: PropTypes.any,
  articles: PropTypes.any,
  stage: PropTypes.object,
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    stories: state.stories.stories,
    articles: state.articles,
    stage: state.stage,
  }
}

import { actionEditArticle } from '../../redux/actions/articles/actEditArticle.js';
import { actionCreateArticle } from '../../redux/actions/articles/actCreateArticle.js';
import { actionTurnPageByArticleId } from '../../redux/actions/stage/actTurnPageByArticleId.js';
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      editArticle: (article_id, editedState, cb) => dispatch(actionEditArticle(article_id, editedState, cb)),
      createArticle: (story_id, now_page_num, cb) => dispatch(actionCreateArticle(story_id, now_page_num, cb)),
      turnPageByArticleId: (article_id, article_index) => dispatch(actionTurnPageByArticleId(article_id, article_index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageEditor);
