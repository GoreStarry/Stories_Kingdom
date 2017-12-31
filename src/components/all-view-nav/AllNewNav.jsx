import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Segment, Button, Menu, Icon } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";


import axios from "axios";
// for 400 request
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 405; // default
};

import styles from "./AllNewNav.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class PageBody extends PureComponent {
  render() {
    const { nav_open } = this.props;
    return (
      <Sidebar.Pusher className="flex--col">
        <Segment basic className="flex--col flex--extend">
          <div className={styles.box__btn_setting}>
            <Icon
              className={cx("btn__navToggle", {
                "btn__navToggle--active": nav_open
              })}
              name="setting"
              size="large"
              onClick={this.props.toggleNav}
            />
          </div>
          {React.cloneElement(this.props.children, this.props.router)}
        </Segment>
      </Sidebar.Pusher>
    );
  }
}

PageBody.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  nav_open: PropTypes.bool.isRequired
};

import { getTokenAndSetToHeader } from "../../redux/actions/user/actAuth.js";

class AllNewNav extends PureComponent {
  state = {
    nav_open: false
  };

  componentWillMount() {
    const local_token = getTokenAndSetToHeader();
    local_token && this.props.actions.getUserInfo(local_token);
  }

  _toggleNav = () => {
    this.setState({
      nav_open: !this.state.nav_open
    });
  };

  _closeNav = () => {
    this.setState({
      nav_open: false
    });
  };

  render() {
    const { routes, children, router } = this.props;
    const { nav_open } = this.state;
    return (
      <div className={styles.AllNewNav}>
        <Sidebar.Pushable as={Segment}> 
          <Sidebar
            as={Menu}
            animation="overlay"
            width="thin"
            visible={nav_open}
            icon="labeled"
            vertical
            inverted
          >
            {routes.map((route, index) => {
              return route.inNav && (
                <Menu.Item name="home" key={`navAll${route.name}`}>
                  <NavLink
                    exact
                    to={route.path}
                    activeClassName={styles.AllNewNav}
                    onClick={this._closeNav}
                  >
                    {route.name}
                  </NavLink>
                </Menu.Item>
              );
            })}
          </Sidebar>
          <PageBody
            visible="nav_open"
            router={router}
            nav_open={nav_open}
            toggleNav={this._toggleNav}
          >
          <Switch>
              {routes.map((route, index) => {
                return <Route key={route.path + index} {...route}/>;
              })}
            </Switch>
          </PageBody>
        </Sidebar.Pushable>
      </div>
    );
  }
}

AllNewNav.propTypes = {
  routes: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  actions: PropTypes.object,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    router: state.router, // for trigger Page update
    auth: state.auth
  };
}

import { getUserInfo } from "../../redux/actions/user/actUserInfo.js";
import { actionGetStories } from "../../redux/actions/stories/actGetStories.js";

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserInfo: token => dispatch(getUserInfo(token))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNewNav);
