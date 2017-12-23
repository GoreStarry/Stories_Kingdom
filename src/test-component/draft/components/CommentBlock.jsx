import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import style from "./CommentBlock.scss";
class CommentBlock extends PureComponent {
  render() {
    return <div className={style.CommentBlock}>{this.props.children}</div>;
  }
}

export default CommentBlock;
