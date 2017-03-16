import React, { PureComponent, PropTypes } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';

class NewStoryForm extends PureComponent {
  render() {
    return (
      <div className="box__addStory">
        <Button icon id="btn__addStory">
          <Icon name="plus" />
        </Button>
        <Form>
          <Form.Field>
            <label>
              Story Name
            </label>
            <input
              ref={ input => this.newStoryInput = input }
              placeholder='Name...'
              required />
          </Form.Field>
          <Form.Field>
            <label>
              Story Description
            </label>
            <input placeholder='Description...' />
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

export default NewStoryForm;
