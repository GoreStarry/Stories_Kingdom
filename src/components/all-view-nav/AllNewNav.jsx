import React, { PureComponent, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


import checkAuth from '../../helpers/checkAuth.js';

import style from './AllNewNav.scss';

class AllNewNav extends PureComponent {

  componentDidMount() {
    const {getAuth} = this.props;
    // login page not preparing yet
    getAuth('user_name_dev');
  }

  render() {
    const {routes} = this.props;
    return (
      <div>
        { routes.map((route, index) => {
            return <NavLink key={ `navAll${index}` } exact to={ route.path } activeClassName={ style.AllNewNav }>
                     { route.name }
                   </NavLink>
          }) }
      </div>
      );
  }
}

AllNewNav.propTypes = {
  routes: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNewNav);


function mapStateToProps(state) {
  const {auth} = state;
  return {
    auth
  }
}

import { actionGetAuth } from '../../redux/actions/auth/actAuth.js';

function mapDispatchToProps(dispatch) {
  return {
    getAuth: name => dispatch(actionGetAuth(name)),
  }
}
