import React, { PureComponent, PropTypes } from 'react';
import { Input, Icon } from 'semantic-ui-react'
import classNames from 'classnames/bind';
import styles from './ArticleDetail.scss';
const cx = classNames.bind(styles);
// TODO: input onchange 之後 icon變紅色

// TODO: 點up之後變綠色上滑

class ArticleDetail extends PureComponent {

  state = {
    chapterName: false,
    outline: false,
  }

  componentDidMount() {
    this._initChapterAndOutlineState(this.props);
  // console.log(this.chapterNameRef);
  // this.chapterNameRef.focus();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.open && nextProps.article_id != this.props.article_id) {
      this._initChapterAndOutlineState(nextProps);
    }
  }

  // update changed data
  componentWillUnmount() {
    const {chapterName, outline} = this.state;
    const {article_id, updateDetail, focusBackToEditor} = this.props;
    updateDetail(article_id, {
      chapterName,
      outline
    })
    focusBackToEditor();
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
    this.setState({
      chapterName: value,
    })
  }

  _onChangeOutline = (event, {value}) => {
    this.setState({
      outline: value,
    })
  }

  _setChapterNameRef = (input) => {
    this.chapterNameRef = input;
  }

  render() {
    const {chapterName, outline} = this.state;
    const {open} = this.props;
    return (
      <div className={ styles.container }>
        <div className="box__input">
          <Input
            fluid
            focus
            ref={ this._setChapterNameRef }
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
  chapterName: PropTypes.string,
  outline: PropTypes.string,
  article_id: PropTypes.string.isRequired,
  updateDetail: PropTypes.func.isRequired,
  focusBackToEditor: PropTypes.func.isRequired,
};

export default ArticleDetail;
