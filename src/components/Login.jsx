import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Login extends Component {
  componentDidMount() {
    //initialize google auth
    window.gapi.load('client:auth2', function() {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        fetch_basic_profile: false
      });
    });
  }

  //google auth2 sign in
  googleOauth = () => {
    this.props.login();
  };

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
            onClick={this.googleOauth}
            type='button'
            className='btn btn-primary mx-auto'
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
