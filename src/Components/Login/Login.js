import React, { Component } from 'react';

export class Login extends Component {
  render() {
    const { loginUser } = this.props;
    return (
      <div className='container-fluid'>
        <div className='container'>
          <div className='notSignedIn'>
            <p>Please Login to view this page</p>
            <button onClick={loginUser} className='loginBtn'>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
