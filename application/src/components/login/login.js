import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './login-form/loginForm';
import './login.css';

class Login extends Component {
  componentDidUpdate() {
    if (this.props.token) {
      this.props.history.push('/view-orders')
    }
  }
  render() {
    return (
      <div className="main-body">
        <h1 className="text-center">Login Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <LoginForm onLogin={() => {this.props.history.push('/view-orders')}}/>
        </div>
      </div>
    )
  }
  
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, null)(Login);