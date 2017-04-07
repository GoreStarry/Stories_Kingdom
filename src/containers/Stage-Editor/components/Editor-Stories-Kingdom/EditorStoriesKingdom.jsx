import React, { PureComponent, PropTypes } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Motion, TransitionMotion, spring } from 'react-motion';
import styles from './EditorStoriesKingdom.scss';

const emptyEditorStateForDisplay = EditorState.createEmpty();

const emptyOnChange = () => {
  
}

/**
 * 
 * @class EditorStoriesKingdom
 * @extends {PureComponent}
 */
class EditorStoriesKingdom extends PureComponent {

  state = {
    page_render_array: [],
    innerWidth: window.innerWidth
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.article_id != this.props.article_id) {
      this._makePageArray(nextProps.article_id, nextProps.article_index)
    }
  }


  componentWillMount() {
    this._makePageArray(this.props.article_id, this.props.article_index)
    window.addEventListener('resize', () => {
      this.setState({
        innerWidth: window.innerWidth
      });
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.setState({
        innerWidth: window.innerWidth
      });
    })
  }



  _makePageArray = (article_id, article_index) => {
    const {story, articles} = this.props;
    const prev_article = story.articleOrder[article_index - 1];
    const next_article = story.articleOrder[article_index + 1];


    const page_array = [prev_article, 'now_article', next_article]
      .map((article, index) => {
        if (article == 'now_article') {
          return {
            article_id,
            editorState: false // it shold render directly form this.props.editorState
          }
        } else if (article) {
          const {id} = article;
          return {
            article_id: id,
            position: index === 2 ? 'next' : 'prev',
            editorState: articles[id].draftContent ? EditorState.createWithContent(convertFromRaw(JSON.parse(articles[id].draftContent))) : emptyEditorStateForDisplay,
          }
        } else {
          return article
        }
      })
      .filter((article) => {
        return article
      })

    this.setState({
      page_array: page_array
    })
  }

  render() {
    const {article_id, onChange, story, article_index} = this.props;
    const {page_array, innerWidth} = this.state;

    return (
      <div className={ styles.EditorStoriesKingdom }>
        { page_array.map(({article_id, editorState, position}) => {
            return <Motion key={ article_id } style={ { x: spring(position == 'next' && -innerWidth) } }>
                     { style => <div
                                  id={ !position && 'main_Editor' }
                                  className={ styles.box__editor }
                                  style={ { transform: `translate3d(${style.x}px, 0, 0)` } }>
                                  <Editor editorState={ editorState || this.props.editorState } onChange={ position ? emptyOnChange : onChange } />
                                </div> }
                   </Motion>
          }) }
      </div>
      );
  }
}

EditorStoriesKingdom.propTypes = {
  article_id: PropTypes.string,
  article_index: PropTypes.number,
  editorState: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  story: PropTypes.object,
  articles: PropTypes.object,
};

export default EditorStoriesKingdom;
