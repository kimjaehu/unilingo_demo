import React, { Component } from 'react';

class Login extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', function() {
      console.log(process.env.REACT_APP_CLIENT_ID);
      window.gapi.auth2.init({ client_id: process.env.REACT_APP_CLIENT_ID });
    });
  }

  render() {
    return <div></div>;
  }
}
export default Login;
