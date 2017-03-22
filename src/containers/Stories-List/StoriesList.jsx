import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DraggableList from 'react-draggable-list';
import classNames from 'classnames/bind';



import styles from './StoriesList.scss';
const cx = classNames.bind(styles);


import StoryCard from './components/Story-Card/StoryCard.jsx';
import NewStroyForm from './components/New-Story-Form/NewStroyForm.jsx';
import DeleteModal from '../../components/Delete-Modal/DeleteModal.jsx';

// TODO: 故事列表前端測試

const draggableListContainer = () => document.body;

class StoriesList extends PureComponent {
  state = {
    useContainer: false,
    deleteModalOpen: false,
    deleteTargetId: false
  };


  componentWillMount() {
    this.props.actions.getStories();
  }


  _onMoveEnd = (newList) => {
    console.log(newList);
    this.props.actions.changeStoriesOrder(newList);
  }

  _createKeyForStoryCard = story => `story_${story.id}`;

  _openDeleteModal = (deleteTargetId) => {
    this.setState({
      deleteModalOpen: true,
      deleteTargetId
    })
  }

  _closeDeleteModal = () => {
    this.setState({
      deleteModalOpen: false,
    })
  }

  _deleteStory = () => {
    console.log('delete Story');
  }

  render() {
    const {useContainer, deleteModalOpen} = this.state;
    const {auth, storiesOrder, stories} = this.props;

    const commonProps = {
      stories,
      openDeleteModal: this._openDeleteModal
    }

    return (
    auth === 'success' ?
      <div>
        <h1>Lists</h1>
        <NewStroyForm/>
        <div ref={ dragContainerDom => this.dragContainerDom = dragContainerDom }>
          { Object.keys(stories).length && storiesOrder[0] &&
            <DraggableList
              itemKey={ this._createKeyForStoryCard }
              template={ StoryCard }
              commonProps={ commonProps }
              list={ storiesOrder }
              onMoveEnd={ this._onMoveEnd }
              container={ draggableListContainer } /> }
        </div>
        <DeleteModal
          open={ deleteModalOpen }
          deleteFun={ this._deleteStory }
          closeModal={ this._closeDeleteModal } />
      </div>
      :
      <Redirect to='/' />
    );
  }

}


function mapStateToProps(state) {
  return {
    auth: state.user.auth,
    storiesOrder: state.user.storiesOrder,
    stories: state.stories.stories
  }
}

import { actionGetStories } from '../../redux/actions/stories/actGetStories.js';
import { actChangeStoriesOrder } from '../../redux/actions/user/actChangeStoriesOrder.js';
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStories: () => dispatch(actionGetStories()),
      changeStoriesOrder: (newOrder) => dispatch(actChangeStoriesOrder(newOrder))
    }
  }
}

StoriesList.propTypes = {
  actions: PropTypes.object,
  auth: PropTypes.any, // False or String of auth token
  storiesOrder: PropTypes.any, // False or Array of stories order
  stories: PropTypes.any, // False or Array stories data with id key

}


export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);
