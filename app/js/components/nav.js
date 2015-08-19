'use strict';
import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import UserProfileStore from '../stores/userProfileStore';
import UserActions from '../actions/userActionCreators';




class NavLink extends React.Component {
  render() {
    let other = _.omit(this.props, 'to', 'other');
    let names = [].concat(this.props.to); //typecast to array
    let className = this.props.className || '';
    return (
      <Router.Link to={ names[0] } className={ className } {...other} />
    );
  }
};



class LoginButton extends React.Component {
  render() {
    return (
      <button className="authButton">Login</button>
    );
  }
};

class LogoutButton extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(){
    UserActions.logoutUser();
  }

  render() {
    return (
      <button className="authButton" onClick ={this.logout} >Logout</button>
    );
  }
};


class Nav extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = {
      loggedIn: false
    }
  }

  _onChange() {
    if (UserProfileStore.getCookieID()){
      this.setState({loggedIn: true});
    }else {
      this.setState({loggedIn: false});
    }
  }

  componentDidMount() {
    UserProfileStore.addChangeListener(this._onChange);
    if (UserProfileStore.getCookieID()){
      this.setState({loggedIn: true});
    }else {
      this.setState({loggedIn: false});
    }
  }

  componentWillUnmount() {
    UserProfileStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="topBar">
        <span className = "topBarLeft">
          <NavLink to="home">
             <img src='../assets/logo2.png'></img>
          </NavLink>
        </span>
        <nav>

        { this.state.loggedIn ?
          <Router.Link to="user">
            <button className="profileButton2">Profile</button>
          </Router.Link> : null }

          <Router.Link to="auth" ref="authbutton">
            {this.state.loggedIn? <LogoutButton /> : <LoginButton />}
          </Router.Link>

        </nav>
      </div>
    );
  }
};

export default Nav;
