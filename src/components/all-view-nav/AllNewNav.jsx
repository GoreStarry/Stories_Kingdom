import React, { PureComponent, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


import checkAuth from '../../helpers/checkAuth.js';

import style from './AllNewNav.scss';

class AllNewNav extends PureComponent {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== false && this.props.auth == 'success') {

    }
  }



  componentDidMount() {}

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

export default AllNewNav;

