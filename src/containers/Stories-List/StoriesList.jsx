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
    list: [
      {
        name: 'Mercury'
      },
      {
        name: 'Venus'
      },
      {
        name: 'Earth',
        subtitle: true
      },
      {
        name: 'Mars'
      },
      {
        name: 'Jupiter'
      },
      {
        name: 'Saturn',
        subtitle: true
      },
      {
        name: 'Uranus',
        subtitle: true
      },
      {
        name: 'Neptune'
      }
    ]
  };


  componentWillMount() {
    this.props.actions.getStories();
  }


  _onListChange(newList) {
    this.setState({
      list: newList
    });
  }

  _createKeyForStoryCard = story => `story_${story.id}`;

  render() {
    const {useContainer} = this.state;
    const {auth, storiesOrder, stories} = this.props;
    console.log(stories);
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
            onMoveEnd={ newList => this._onListChange(newList) }
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
    storiesOrder: state.user.user_info.storiesOrder,
    stories: state.stories.stories
  }
}

import { actionGetStories } from '../../redux/actions/stories/actGetStories.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStories: () => dispatch(actionGetStories())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);
