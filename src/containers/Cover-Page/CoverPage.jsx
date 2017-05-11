import React, { PureComponent, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'

import styles from './CoverPage.scss';

class CoverPage extends PureComponent {

  componentDidMount() {
    // for test, not complete the Sign out yet
    // localStorage.removeItem('auth_token')
  }

  _onSubmit = (event) => {
    event.preventDefault()
    const inputName = this.usernameInput.value;

    if (inputName.trim()) {
      this.props.actions.getAuth(inputName)
    }
  }

  render() {
    const {auth} = this.props.user;

    const LoginBlock = (
    <div className={ styles.container }>
      <h1>Stories Kingdom</h1>
      <Form onSubmit={ this._onSubmit }>
        <Form.Field>
          <input
            placeholder='User Name...'
            id="input_login"
            type="text"
            ref={ input => this.usernameInput = input } />
        </Form.Field>
        <Button type='submit'>
          ENTER
        </Button>
      </Form>
      <div className={ styles.box__version }>
        <span>ver 0.7(beta) - 飛馬</span>
      </div>
    </div>
    )

    return (
    auth === 'success' ? (
      <Redirect to={ '/list' } />
      ) : (
      LoginBlock
      )
    );

  }

}

CoverPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoverPage);


function mapStateToProps(state) {
  const {user} = state;
  return {
    user
  };
}

import { actGetToken } from '../../redux/actions/user/actAuth.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAuth: name => dispatch(actGetToken(name)),
    }
  }
}
