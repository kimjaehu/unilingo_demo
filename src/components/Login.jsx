import React, { Component } from 'react';

const SCOPE_YOUTUBE = 'https://www.googleapis.com/auth/youtube.readonly';
const SCOPE_YT_ANALYTICS =
  'https://www.googleapis.com/auth/yt-analytics.readonly';
class Login extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', function() {
      console.log(process.env.REACT_APP_CLIENT_ID);
      window.gapi.auth2.init({ client_id: process.env.REACT_APP_CLIENT_ID });
    });
  }

  googleOauth = () => {
    return window.gapi.auth2
      .getAuthInstance()
      .signIn({ scope: SCOPE_YOUTUBE + ' ' + SCOPE_YT_ANALYTICS })
      .then(
        function() {
          console.log('Sign-in successful');
        },
        function(err) {
          console.error('Error signing in', err);
        }
      );
  };

  render() {
    return (
      <div className='container'>
        <button
          onClick={this.googleOauth}
          type='button'
          className='btn btn-primary mx-auto'
        >
          Sign In with Google
        </button>
      </div>
    );
  }
}
export default Login;
