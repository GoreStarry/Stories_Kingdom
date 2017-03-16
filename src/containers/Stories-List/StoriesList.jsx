import React, { PureComponent } from 'react';
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
  componentDidMount() {}


  _onListChange(newList) {
    console.log(newList);
    this.setState({
      list: newList
    });
  }

  render() {
    const {useContainer} = this.state;
    return (
      <div>
        <h1>Lists</h1>
        <NewStroyForm/>
        <DraggableList
          itemKey="name"
          template={ StoryCard }
          list={ this.state.list }
          onMoveEnd={ newList => this._onListChange(newList) }
          container={ () => useContainer ? this.refs.container : document.body } />
      </div>
      );
  }

}

export default StoriesList;
