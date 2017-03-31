import React, { PureComponent, PropTypes } from 'react';
import { Input, List, Button } from 'semantic-ui-react';

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

  openEditBlock = () => {
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
        <List.Content floated='right'>
          <Button onClick={ this.openEditBlock }>
            edit
          </Button>
        </List.Content>
        { editOpen ? (
          <List.Content>
            <Input value={ chapterName } onChange={ this.editChapterName } />
            <Input value={ outline } onChange={ this.editOutline } />
          </List.Content>
          ) : (
          <List.Content>
            <List.Header onDoubleClick={ this.openEditBlock } as='a'>
              { article.chapterName }
            </List.Header>
            <List.Description onDoubleClick={ this.editOutline } as='a'>
              { article.outline }
            </List.Description>
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
