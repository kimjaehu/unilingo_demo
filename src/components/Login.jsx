import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, authInit } from '../actions/auth';
// import { handleClientLoad } from '../actions/auth';
class Login extends Component {
  componentDidMount() {
    // handleClientLoad();
    authInit();
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <h2>Sign in required to access the videos</h2>
        </div>
        <div className='row justify-content-center'>
          <button
            onClick={this.props.login}
            type='button'
            className='btn btn-outline-primary mx-auto'
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
