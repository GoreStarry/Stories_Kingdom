import React, { PureComponent, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class CoverPage extends PureComponent {

  componentDidMount() {
    localStorage.removeItem('auth_token')
  }


  clickLoginBtn = (event) => {
    event.preventDefault()
    const inputName = this.usernameInput.value;

    if (inputName.trim()) {
      this.props.getAuth(inputName)
    }

  }

  render() {
    const {auth} = this.props;

    const LoginBlock = (
    <div>
      <input type="text" ref={ input => this.usernameInput = input } />
      <button onClick={ this.clickLoginBtn }>Login</button>
    </div>
    )

    return (
    auth ? (
      <Redirect push to={ '/draft_test' } />
      ) : (
      LoginBlock
      )
    );

  }

}

CoverPage.propTypes = {


};

export default connect(mapStateToProps, mapDispatchToProps)(CoverPage);


function mapStateToProps(state) {
  const {user} = state;
  return {
    user
  };
}

import { actionGetAuth } from '../../redux/actions/user/actAuth.js';

function mapDispatchToProps(dispatch) {
  return {
    getAuth: name => dispatch(actionGetAuth(name)),
  }
}
