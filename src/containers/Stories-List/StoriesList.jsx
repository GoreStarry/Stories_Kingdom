import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import DraggableList from "react-draggable-list";
import classNames from "classnames/bind";

import styles from "./StoriesList.scss";
const cx = classNames.bind(styles);

import StoryCard from "./components/Story-Card/StoryCard.jsx";
import NewStroyForm from "./components/New-Story-Form/NewStroyForm.jsx";
import DeleteModal from "../../components/Delete-Modal/DeleteModal.jsx";

const draggableListContainer = () => document.body;

class StoriesList extends PureComponent {
  displayName = "StoriesList";

  state = {
    useContainer: false,
    deleteModalOpen: false,
    deleteTarget: false
  };

  componentDidMount() {
    this.props.actions.getStories();
  }

  _onMoveEnd = newList => {
    this.props.actions.changeStoriesOrder(newList);
  };

  _createKeyForStoryCard = story => `story_${story.id}`;

  _openDeleteModal = (deleteTargetId, name) => {
    this.setState({
      deleteModalOpen: true,
      deleteTarget: {
        id: deleteTargetId,
        name
      }
    });
  };

  _closeDeleteModal = () => {
    this.setState({
      deleteModalOpen: false,
      deleteTarget: false
    });
  };

  _deleteStory = () => {
    const { actions } = this.props;
    const { deleteTarget } = this.state;

    actions.deleteStory(deleteTarget.id);

    this.setState({
      deleteModalOpen: false
    });
  };

  render() {
    const { useContainer, deleteModalOpen, deleteTarget } = this.state;
    const { auth, storiesOrder, stories } = this.props;
    console.log("list");
    const commonProps = {
      stories,
      openDeleteModal: this._openDeleteModal
    };

    return auth === "success" ? (
      <div className={styles.StoriesList}>
        <h1>Stories</h1>
        <NewStroyForm />
        <div
          className="StoriesList__list"
          ref={dragContainerDom => (this.dragContainerDom = dragContainerDom)}
        >
          {stories &&
            storiesOrder && (
              <DraggableList
                itemKey={this._createKeyForStoryCard}
                template={StoryCard}
                commonProps={commonProps}
                list={storiesOrder}
                onMoveEnd={this._onMoveEnd}
                padding={15}
                container={draggableListContainer}
              />
            )}
        </div>
        <DeleteModal
          open={deleteModalOpen}
          deleteTargetName={deleteTarget.name}
          deleteFun={this._deleteStory}
          closeModal={this._closeDeleteModal}
        />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.user.auth,
    storiesOrder: state.user.storiesOrder,
    stories: state.stories.stories
  };
}

import { actionGetStories } from "../../redux/actions/stories/actGetStories.js";
import { actChangeStoriesOrder } from "../../redux/actions/user/actChangeStoriesOrder.js";
import { actDeleteStory } from "../../redux/actions/stories/actDeleteStory.js";

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStories: () => dispatch(actionGetStories()),
      changeStoriesOrder: newOrder => dispatch(actChangeStoriesOrder(newOrder)),
      deleteStory: id => dispatch(actDeleteStory(id))
    }
  };
}

StoriesList.propTypes = {
  actions: PropTypes.object,
  auth: PropTypes.any, // False or String of auth token
  storiesOrder: PropTypes.any, // False or Array of stories order
  stories: PropTypes.any // False or Array stories data with id key
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);
