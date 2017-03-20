import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DraggableList from 'react-draggable-list';
import classNames from 'classnames/bind';

import styles from './StoriesList.scss';
const cx = classNames.bind(styles);


import StoryCard from './components/Story-Card/StoryCard.jsx';
import NewStroyForm from './components/New-Story-Form/NewStroyForm.jsx';

class StoriesList extends PureComponent {
  state = {
    useContainer: false,
  };


  componentWillMount() {
    this.props.actions.getStories();
  }


  _onMoveEnd = (newList) => {
    console.log(newList);
    this.props.actions.changeStoriesOrder(newList);
  }

  _createKeyForStoryCard = story => `story_${story.id}`;

  render() {
    const {useContainer} = this.state;
    const {auth, storiesOrder, stories} = this.props;
    return (
    auth === 'success' ?
      <div>
        <h1>Lists</h1>
        <NewStroyForm/>
        { stories &&
          <DraggableList
            itemKey={ this._createKeyForStoryCard }
            template={ StoryCard }
            commonProps={ stories }
            list={ storiesOrder }
            onMoveEnd={ this._onMoveEnd }
            container={ () => useContainer ? this.refs.container : document.body } /> }
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


export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);
