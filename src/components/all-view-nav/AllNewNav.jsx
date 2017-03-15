import React, { PureComponent, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'


import checkAuth from '../../helpers/checkAuth.js';

import style from './AllNewNav.scss';

class AllNewNav extends PureComponent {
  state = {
    navOpen: false,
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== false && this.props.auth == 'success') {

    }
  }

  componentDidMount() {}

  _toggleNav = () => {
    this.setState({
      nav_open: !this.state.nav_open
    })
  }

  _closeNav = () => {
    this.setState({
      nav_open: false
    });
  }

  render() {

    const {routes} = this.props;
    const {nav_open} = this.state;

    return (
      <div className={ style.AllNewNav }>
        <Sidebar.Pushable as={ Segment }>
          <Sidebar
            as={ Menu }
            animation='overlay'
            width='thin'
            visible={ nav_open }
            icon='labeled'
            vertical
            inverted>
            { routes.map((route, index) => {
                return (
                  <Menu.Item name='home' key={ `navAll${index}` }>
                    <NavLink
                      exact
                      to={ route.path }
                      activeClassName={ style.AllNewNav }
                      onClick={ this._closeNav }>
                      { route.name }
                    </NavLink>
                  </Menu.Item>
                )
              }) }
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div className="box__btn_setting">
                <Button icon onClick={ this._toggleNav }>
                  <Icon name='setting' />
                </Button>
              </div>
              { this.props.children }
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
      );
  }
}

AllNewNav.propTypes = {
  routes: React.PropTypes.array.isRequired
};

export default AllNewNav;

