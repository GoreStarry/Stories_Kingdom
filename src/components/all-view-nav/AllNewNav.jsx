import React, { Component, PureComponent, PropTypes } from 'react';

import axios from 'axios';
// for 400 request 
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 405; // default
};

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react'


import checkAuth from '../../helpers/checkAuth.js';

import style from './AllNewNav.scss';


class PageBody extends PureComponent {

  render() {
    return (
      <Sidebar.Pusher>
        <Segment basic>
          <div className="box__btn_setting">
            <Button icon onClick={ this.props._toggleNav }>
              <Icon name='setting' />
            </Button>
          </div>
          { this.props.pages }
        </Segment>
      </Sidebar.Pusher>
      );
  }
}

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

    const {routes, children} = this.props;
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
          { children && <PageBody
                          visible="nav_open"
                          pages={ children }
                          _toggleNav={ this._toggleNav } /> }
        </Sidebar.Pushable>
      </div>
      );
  }
}


AllNewNav.propTypes = {
  routes: React.PropTypes.array.isRequired
};

export default AllNewNav;

