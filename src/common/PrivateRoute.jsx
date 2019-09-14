import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        // add spinner
        return (
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        );
      } else if (!auth.isAuthenticated) {
        return <Redirect to='/login' />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
