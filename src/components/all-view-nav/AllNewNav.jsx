import React, { Component, PureComponent, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react'

import axios from 'axios';
// for 400 request 
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 405; // default
};

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

import { getTokenAndSetToHeader } from '../../redux/actions/user/actAuth.js';


class AllNewNav extends PureComponent {
  state = {
    navOpen: false,
  }

  componentWillMount() {
    const local_token = getTokenAndSetToHeader();
    local_token && this.props.actions.getUserInfo(local_token);
  }

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
                  <Menu.Item name='home' key={ `navAll${route.name}` }>
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
          <PageBody
            visible="nav_open"
            pages={ children }
            _toggleNav={ this._toggleNav } />
        </Sidebar.Pushable>
      </div>
      );
  }
}


AllNewNav.propTypes = {
  routes: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

import { getUserInfo } from '../../redux/actions/user/actUserInfo.js';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserInfo: token => {
        dispatch(getUserInfo(token))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNewNav);

