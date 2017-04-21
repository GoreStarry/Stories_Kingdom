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

import { HotKeys } from 'react-hotkeys';
import { keyMap, SAVE_ARTICLE, TURN_TO_NEXT_PAGE, TURN_TO_PREV_PAGE, CREATE_NEW_PAGE_AFTER, CREATE_NEW_PAGE_BEFORE, FOCUS_ARTICLE, ARTICLE_ALIGN_TOGGLE } from './helpers/reactHotKeyMap.js';


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

  // FIXME: fisrt enter form stage eitor?

  // v1
  // TODO: article detail 細節編輯區


  // future
  // TODO: 點.DraftEditor-root自動foucs再最後一段的尾巴

  constructor() {
    super();

    this.state = {
      editorState: false,
      content_updated: true,
    }

    this.autoUpdate = new Rx.Subject();
    this.autoUpdate.subscribe((editorState) => {
      return editorState;
    })

    // pevent debounce auto update trigger after component unmount
    this.updateSwitch = Rx.Observable.create((observer) => {
      observer.next(true);
      this.updateSwitchObs = observer;
    });

    this.updateSwitch.subscribe((bool) => {
      return bool
    });

    this.updateRx = Rx.Observable.combineLatest(this.autoUpdate, this.updateSwitch, (debounceState, switchBool) => {
      return switchBool ? debounceState : false;
    })

    this.updateRx.debounceTime(3000).subscribe((state) => {
      state && this._updateArticle(state.article_id, state.editorState);
    }, () => {
      console.log('error');
      this.autoUpdate.unsubscribe();
    })

    this._hotKeysHandlers = {
      [TURN_TO_NEXT_PAGE]: this._turnToNextPage,
      [SAVE_ARTICLE]: this._updateNowArticle,
      [TURN_TO_PREV_PAGE]: this._turnToPrevPage,
      [CREATE_NEW_PAGE_AFTER]: this._insertNewArticleAfter,
      [CREATE_NEW_PAGE_BEFORE]: this._insertNewArticleBefore,
      [FOCUS_ARTICLE]: this._focusMainEditor,
      [ARTICLE_ALIGN_TOGGLE]: this._toggleArticleAlign,
    }
  }


  componentWillUpdate(nextProps, nextState) {
    const now_page_id = this.props.stage.page_article_id;
    const next_page_id = nextProps.stage.page_article_id;
    // detect page change by page_article_id , 
    // and switch the editorState for this.state
    if (now_page_id !== next_page_id) {

      // make sure editor state would patch before trun page
      now_page_id && this._updateArticle(now_page_id, this.state.editorState)

      this._initDraftEditorState(next_page_id, nextProps.articles)
    }

  }



  async componentWillMount() {
    const {stories, articles, actions} = this.props;
    const {story_id, article_id} = this.props.match.params;

    // if stories/articles in redux store not been update before ChapterList page,
    // then it should get it self
    if (!stories) {
      await actions.getStories();
      await actions.getArticles(story_id);
    }

    // now page decide the Editor render target, so should set it first
    await this._setInitPageByParamsArticle()

  }

  componentWillUnmount() {
    this.updateSwitchObs.next(false)
    this.autoUpdate.complete();
  }


  _updateNowArticle = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this._updateArticle(this.props.stage.page_article_id, this.state.editorState);
  }

  _updateArticle = (article_id, editorState) => {
    const updatedCallback = () => {
      this.setState({
        content_updated: true
      })
    }

    this.props.actions.editArticle(article_id, {
      draftContent: parseContentStateToString(editorState.getCurrentContent())
    }, updatedCallback)

  }

  _toggleArticleAlign = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const {articles, stage} = this.props;
    const {story_id} = this.props.match.params;
    const oldArticleAlign = articles[story_id][stage.page_article_id].articleAlign;
    this.props.actions.editArticle(this.props.stage.page_article_id, {
      articleAlign: oldArticleAlign === 'right' ? 'center' : 'right'
    })
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
      actions.turnPage(article_id, indexOfInitArticle);
    } else {
      const articleIdOfFirstOrder = stories[story_id].ArticleOrder[0].id;
      actions.turnPage(articleIdOfFirstOrder, 0);
    }
    resolve()

  })


  _initDraftEditorState = (article_id, articles) => {
    const {story_id} = this.props.match.params;
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


  _insertNewArticleAfter = (event) => {
    event.preventDefault();
    this._insertArticle(1);
  }


  /**
   * can't insert new Article before first one page, because of chapter name must exist for first article 
   * @memberOf StageEditor
   */
  _insertNewArticleBefore = (event) => {
    event.preventDefault();
    if (this.props.stage.page_index !== 0) {
      this._insertArticle(0);
    }
  }


  /**
   * @param {number} translate
   * translate is for insert before or after now article
   */
  _insertArticle = (translate) => {
    let {page_index} = this.props.stage;
    const {actions} = this.props;
    const {story_id} = this.props.match.params;
    page_index += translate;
    actions.createArticle(story_id, page_index);
  }

  _turnToNextPage = (event) => {
    event.preventDefault()
    event.stopPropagation();
    const next_page_index = this.props.stage.page_index + 1;
    this._turnPageByIndex(next_page_index)
  }

  _turnToPrevPage = (event) => {
    event.preventDefault()
    event.stopPropagation();
    const prev_page_index = this.props.stage.page_index - 1;
    this._turnPageByIndex(prev_page_index)
  }

  _turnPageByIndex = (index) => {
    const {story_id} = this.props.match.params;

    try { //prevent index = -1 or exceed max page
      const {id} = this.props.stories[story_id].articleOrder[index];
      this.props.actions.turnPage(id, index)
    } catch (error) {
      return false
    }

  }

  _setMainEditorRef = (editor) => {
    if (editor) {
      this.main_editor = editor
      this.main_editor.focus();
    }
  }

  _focusMainEditor = () => {
    this.main_editor.focus();
  }


  render() {
    const {editorState, content_updated} = this.state;
    const {stories, articles, stage} = this.props;
    const {story_id} = this.props.match.params;

    return (
      <div className={ `flex--col flex--extend ${styles.container}` }>
        <HotKeys
          id="hotkey_container"
          className={ `flex--col flex--extend ${styles.HotKeys}` }
          keyMap={ keyMap }
          handlers={ this._hotKeysHandlers }>
          <header className={ `flex--row ${styles.stage__header}` }>
            <span className={ styles.story__title }>{ stories && stories[story_id].name }</span>
          </header>
          { /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <button onClick={ this._insertNewArticleAfter }>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        New an article after
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <button onClick={ this._insertNewArticleBefore }>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        new an article before
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */ }
          <div className={ `flex--extend ${styles.stage__editor}` } onClick={ this._focusMainEditor }>
            { editorState &&
              <EditorStoriesKingdom
                story={ stories[story_id] }
                articles={ articles[story_id] }
                article_index={ stage.page_index }
                article_id={ stage.page_article_id }
                articleAlign={ articles[story_id][stage.page_article_id].articleAlign }
                setMainEditorRef={ this._setMainEditorRef }
                editorState={ editorState }
                onChange={ this._editorOnChange } /> }
          </div>
          { /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button onClick={ this._turnToNextPage }>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    turn next page
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button onClick={ this._turnToPrevPage }>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    turn previous page
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */ }
          { articles && stage.page_article_id &&
            <ArticleDetial
              className={ styles.stage__footer }
              articleAlign={ articles[story_id][stage.page_article_id].articleAlign }
              toggleArticleAlign={ this._toggleArticleAlign }
              page_index={ stage.page_index }
              content_updated={ content_updated } /> }
        </HotKeys>
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

import { actionGetStories } from '../../redux/actions/stories/actGetStories.js';
import { actionGetArticles } from '../../redux/actions/articles/actGetArticles.js';
import { actionEditArticle } from '../../redux/actions/articles/actEditArticle.js';
import { actionCreateArticle } from '../../redux/actions/articles/actCreateArticle.js';
import { actionTurnPage } from '../../redux/actions/stage/actTurnPage.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStories: () => dispatch(actionGetStories()),
      getArticles: story_id => dispatch(actionGetArticles(story_id)),
      editArticle: (article_id, editedState, cb) => dispatch(actionEditArticle(article_id, editedState, cb)),
      createArticle: (story_id, now_page_num) => dispatch(actionCreateArticle(story_id, now_page_num)),
      turnPage: (article_id, article_index) => dispatch(actionTurnPage(article_id, article_index)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageEditor);
