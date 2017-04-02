import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Input, List, Button, Form } from 'semantic-ui-react';

import styles from './ChapterCard.scss';

class ChapterCard extends PureComponent {

  state = {
    editOpen: false,
    chapterName: '',
    outline: '',
  }

  componentDidMount() {
    const {chapterName, outline} = this.props.article;

    this.setState({
      chapterName,
      outline: outline || '',
    })
  }

  toggleEditBlock = () => {
    const {editOpen, chapterName, outline} = this.state;
    const {_id} = this.props.article;

    if (editOpen) { //open->close
      const {editChapter} = this.props;
      editChapter(_id, {
        chapterName,
        outline
      })
    }

    this.setState({
      editOpen: !editOpen,
    })
  }

  editChapterName = (event) => {
    this.setState({
      chapterName: event.target.value
    })
  }

  editOutline = (event) => {
    this.setState({
      outline: event.target.value
    })
  }

  render() {
    const {article} = this.props;
    const {editOpen, chapterName, outline} = this.state;
    return (
      <List.Item>
        <List.Content floated='right' className={ styles.btn__edit }>
          <Button onClick={ this.toggleEditBlock }>
            edit
          </Button>
        </List.Content>
        { editOpen ? (
          <List.Content>
            <Form>
              <Form.Field>
                <label>
                  章節名稱:
                </label>
                <Input value={ chapterName } onChange={ this.editChapterName } />
              </Form.Field>
              <Form.Field>
                <label>
                  大綱:
                </label>
                <Input value={ outline } onChange={ this.editOutline } />
              </Form.Field>
            </Form>
          </List.Content>
          ) : (
          <List.Content>
            <Link to={ `/editor/${article.belongStory}/${article._id}/` }>
            <List.Header onDoubleClick={ this.toggleEditBlock }>
              <h3>{ article.chapterName }</h3>
            </List.Header>
            <List.Description onDoubleClick={ this.editOutline }>
              { article.outline }
            </List.Description>
            </Link>
          </List.Content>
          ) }
      </List.Item>

      );
  }
}

ChapterCard.propTypes = {
  article: PropTypes.object.isRequired,
  editChapter: PropTypes.func.isRequired,
};

export default ChapterCard;
