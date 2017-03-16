import React, { PureComponent, PropTypes } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';


class NewStoryForm extends PureComponent {

  _submitNewStory = (event) => {
    event.preventDefault();

    const name = this.inputNewStoryName.value;
    const description = this.inputNewStoryDescrip.value;

    const {actionCreateNewStroy} = this.props.actions;

    actionCreateNewStroy({
      name,
      description
    })

  }

  render() {
    return (
      <div className="box__addStory">
        <Button icon id="btn__addStory">
          <Icon name="plus" />
        </Button>
        <Form onSubmit={ this._submitNewStory }>
          <Form.Field>
            <label>
              Story Name
            </label>
            <input
              id="input__newStory_name"
              placeholder='Name...'
              pattern="^[\S].+"
              title="string with none white space at start"
              ref={ input => this.inputNewStoryName = input }
              required />
          </Form.Field>
          <Form.Field>
            <label>
              Story Description
            </label>
            <input
              id="input__newStory_desc"
              placeholder='Description...'
              title="Six or more characters"
              ref={ input => this.inputNewStoryDescrip = input } />
          </Form.Field>
          <Button type='submit'>
            New!
          </Button>
        </Form>
      </div>
      );
  }
}

NewStoryForm.propTypes = {

};


import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {

  }
}

import * as storyActionCreators from '../../../../redux/actions/stories/actStories.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storyActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewStoryForm);
