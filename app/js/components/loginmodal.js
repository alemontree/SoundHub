'use strict';
import React from 'react';
import { Modal } from 'react-bootstrap';
import routerAction from '../actions/routerActionCreators';
import UserActions from '../actions/userActionCreators';

class Login extends React.Component {

  constructor() {
    super();
    this.toggleAuth = this.toggleAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleAuth() { this.props.handleToggle('Signup');}

  handleLogin() {
    let userData = {};
    userData.username = this.refs.username.getDOMNode().value;
    userData.password = this.refs.password.getDOMNode().value;
    UserActions.loginUser(userData, () => {
      this.context.router.transitionTo('user');
    });
  }

  render() {
    return (
        <div className="AuthForm">
          <h1>This is Login</h1>
          <input type="text" placeholder="Username" ref="username" />
          <input type="password" placeholder="Password" ref="password" />
          <input type="button" value="Login" onClick={this.handleLogin}/>
          <input type="button" value="Signup" onClick={this.toggleAuth}/>
        </div>
      );
  }
}


class Signup extends React.Component {
  constructor() {
    super();
    this.toggleAuth = this.toggleAuth.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
   }

  toggleAuth() {
    this.props.handleToggle('Login');
  }

  handleSignup() {
    let filterStr = /^[A-Za-z0-9 ]+$/;
    let userData = {};
    console.log('refs', this.refs)
    userData.username = this.refs.username.getDOMNode().value;
    userData.password = this.refs.password.getDOMNode().value;
    userData.email = this.refs.email.getDOMNode().value;
    if(!userData.username.match(filterStr)){
      alert('Username must have letters or numbers only');
    }else if(userData.username.length < 4){
      alert('Username must have at least 4 characters');
    }else{
      UserActions.createUser(userData, () => {
        this.context.router.transitionTo('user');
      });
      // this.toggleAuth();
    }
  }

  render() {
    return (
        <div className="AuthForm">
          <h1>This is Signup</h1>
          <input type="email" placeholder="Email" ref="email" />
          <input type="text" placeholder="Username" ref="username" />
          <input type="password" placeholder="Password" ref="password" />
          <input type="button" value="Login" onClick={this.toggleAuth}/>
          <input type="button" value="Signup" onClick={this.handleSignup}/>
        </div>
      );
  }
}


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {authType: props.authType};
    this.close = this.close.bind(this);
  }
   close(){
    routerAction.closeLoginModal()
   }

 toggle(data){
    this.setState({authType:data}, () => {});
  }

  handleLogout() {
    UserActions.logoutUser();
  }

  render() {
    var authform = <Login handleToggle = {this.toggle}/>;
    if(this.state.authType === 'Signup'){
      authform = <Signup handleToggle = {this.toggle}/>
    }else if(this.state.authType === 'Login'){
      authform = <Login handleToggle = {this.toggle}/>
    }
    return (
      <div>
        <Modal show={this.props.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {authform}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

};

export default LoginModal;

