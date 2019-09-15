import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            Unilingo Demo
          </a>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(Navbar);
