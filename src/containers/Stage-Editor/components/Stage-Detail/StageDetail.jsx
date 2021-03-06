import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "semantic-ui-react";
import styles from "./StageDetail.scss";

class StageDetail extends PureComponent {
  render() {
    const {
      page_index,
      content_updated,
      className,
      articleAlign,
      toggleArticleAlign
    } = this.props;
    return (
      <div className={`flex--row ${className} ${styles.container}`}>
        <span
          className={
            content_updated ? styles["update--already"] : styles["update--yet"]
          }
        />
        <Checkbox
          toggle
          className={styles.checkbox__toggle}
          onClick={toggleArticleAlign}
          checked={articleAlign === "center"}
        />
        <span className={styles.detail__page_num}>Page. {page_index + 1}</span>
      </div>
    );
  }
}

StageDetail.propTypes = {
  page_index: PropTypes.number,
  content_updated: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  articleAlign: PropTypes.string.isRequired, // 'right' or 'center'
  toggleArticleAlign: PropTypes.func.isRequired
};

export default StageDetail;
