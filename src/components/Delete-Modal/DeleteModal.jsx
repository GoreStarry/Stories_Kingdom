import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import React, { PureComponent, PropTypes } from 'react';

class DeleteModal extends PureComponent {
  render() {
    const {open, deleteFun, closeModal} = this.props;
    return (
      <Modal
        open={ open }
        basic
        size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color='red'
            inverted>
            <Icon name='remove' /> No
          </Button>
          <Button
            color='green'
            inverted
            onClick={ closeModal }>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
      );
  }
}

DeleteModal.propTypes = {
  open: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  deleteFun: React.PropTypes.func.isRequired
};

export default DeleteModal;
