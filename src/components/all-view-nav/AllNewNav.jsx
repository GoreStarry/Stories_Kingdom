import React, { PureComponent, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

import checkAuth from '../../helpers/checkAuth.js';

import style from './AllNewNav.scss';

class AllNewNav extends PureComponent {

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

// for cosmos test
AllNewNav.defaultProps = {
  routes: [
    {
      name: 'Stories List',
      path: '/',
    },
  ]
}

export default AllNewNav;
