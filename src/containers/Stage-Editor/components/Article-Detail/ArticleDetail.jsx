import React, { PureComponent, PropTypes } from 'react';
import { Input, Icon } from 'semantic-ui-react'
import classNames from 'classnames/bind';
import styles from './ArticleDetail.scss';
const cx = classNames.bind(styles);
// TODO: input onchange 之後 icon變紅色

// TODO: 點up之後變綠色上滑

class ArticleDetail extends PureComponent {

  state = {
    chapter: false,
    outline: false,
  }

  componentDidMount() {
    this._initChapterAndOutlineState(this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.open && nextProps.article_id != this.props.article_id) {
      this._initChapterAndOutlineState(nextProps);
    }
  }





  /**
   * @param props {Object} can feed it this.props or nextProps
   * @memberOf ArticleDetail
   */
  _initChapterAndOutlineState = (props) => {
    this.setState({
      chapterName: props.chapterName,
      outline: props.outline,
    })
  }

  _onChangeChapterName = (event, {value}) => {
    console.log(value);
    this.setState({
      chapterName: value,
    })
  }

  _onChangeOutline = (event, {value}) => {
    this.setState({
      outline: value,
    })
  }

  /**
  * if ArticleDetia already open
  * update changed chapter/detial and clean changed cache, close articleDetial at last
  * 
  * if 
  * 
  * @memberOf ArticleDetail
  */
  _toggleArticleDetail = () => {
    const {open, toggle, chapterName, outline} = this.props;
    if (open) { // update chapter/detial if changed, and close component
      toggle();
      this.setState({
        chapterName: false,
        outline: false,
      })
    } else { // init input value open component
      this.setState({
        chapterName,
        outline,
      }, toggle)
    }
  }

  render() {
    const {chapterName, outline} = this.state;
    const {open} = this.props;
    return (
      <div className={ styles.container }>
        <div className="box__input">
          <Input
            fluid
            value={ chapterName || "" }
            onChange={ this._onChangeChapterName }
            label={ { basic: true, content: 'Chapter Name' } }
            placeholder='Search...' />
          <Input
            fluid
            value={ outline || "" }
            onChange={ this._onChangeOutline }
            label={ { basic: true, content: 'Outline' } }
            placeholder='Search...' />
        </div>
      </div>
      );
  }
}

ArticleDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  chapterName: PropTypes.string,
  outline: PropTypes.string,
  article_id: PropTypes.string.isRequired,
};

export default ArticleDetail;
